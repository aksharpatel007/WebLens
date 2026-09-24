import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs/promises'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'audit-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/start-audit' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                const { url } = JSON.parse(body);
                const websiteId = new URL(url).hostname.replace(/[^a-zA-Z0-9]/g, '_');
                const rootDir = path.resolve(__dirname, '..');
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'started', websiteId }));

                // Run the audit in the background
                console.log(`Starting audit for ${url}...`);
                const child = spawn('npm', ['run', 'start'], {
                  cwd: rootDir,
                  shell: true,
                  env: {
                    ...process.env,
                    START_URL: url,
                    WEBSITE_ID: websiteId,
                    WEB_UI_ENABLED: 'false',
                    MAX_PAGES: '5', // Keep it small for quick feedback
                    MAX_DEPTH: '1'
                  }
                });

                child.stdout.on('data', data => console.log(`[Audit] ${data}`));
                child.stderr.on('data', data => console.error(`[Audit Error] ${data}`));
                child.on('close', code => {
                  console.log(`Audit process exited with code ${code}`);
                });

              } catch (e) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }

          if (req.url?.startsWith('/api/report/') && req.method === 'GET') {
            try {
              const websiteId = req.url.split('/').pop();
              const reportPath = path.resolve(__dirname, '..', 'reports', websiteId, 'report.json');
              const data = await fs.readFile(reportPath, 'utf-8');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(data);
            } catch (e) {
              res.writeHead(404);
              res.end(JSON.stringify({ error: 'Report not found yet' }));
            }
            return;
          }

          if (req.url?.startsWith('/api/download/') && req.method === 'GET') {
            try {
              const parts = req.url.split('/');
              const websiteId = parts[3];
              const format = parts[4] || 'json'; // default to json
              
              let filename = '';
              let contentType = '';
              let downloadName = '';
              
              if (format === 'json') {
                filename = 'report.json';
                contentType = 'application/json';
                downloadName = `webauditor_report_${websiteId}.json`;
              } else if (format === 'xlsx') {
                filename = 'report.xlsx';
                contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                downloadName = `webauditor_report_${websiteId}.xlsx`;
              } else if (format === 'html') {
                filename = 'simplified-audit.en.html';
                contentType = 'text/html';
                downloadName = `webauditor_report_${websiteId}.html`;
              } else if (format === 'xml') {
                filename = 'sitemap.xml';
                contentType = 'application/xml';
                downloadName = `sitemap_${websiteId}.xml`;
              } else {
                throw new Error('Invalid format');
              }

              const reportPath = path.resolve(__dirname, '..', 'reports', websiteId, filename);
              const data = await fs.readFile(reportPath);
              
              // For 'view' we might not want attachment, but user wants to download
              const isView = req.url.includes('?view=true');
              
              const headers: Record<string, string> = {
                'Content-Type': contentType
              };
              
              if (!isView) {
                headers['Content-Disposition'] = `attachment; filename="${downloadName}"`;
              }

              res.writeHead(200, headers);
              res.end(data);
            } catch (e) {
              res.writeHead(404);
              res.end(JSON.stringify({ error: 'Report not found' }));
            }
            return;
          }

          if (req.url === '/api/history' && req.method === 'GET') {
            try {
              const reportsDir = path.resolve(__dirname, '..', 'reports');
              const items = await fs.readdir(reportsDir, { withFileTypes: true });
              const history = [];
              
              for (const item of items) {
                if (item.isDirectory()) {
                  try {
                    const reportPath = path.join(reportsDir, item.name, 'report.json');
                    const stat = await fs.stat(reportPath);
                    const dataRaw = await fs.readFile(reportPath, 'utf-8');
                    const data = JSON.parse(dataRaw);
                    
                    // The first report in reports array is the engine summary
                    const engineReport = data.reports?.find(r => r.plugin === 'engine');
                    const startedAtStr = engineReport?.items?.find(i => i.key === 'startedAt')?.value;
                    const durationStr = engineReport?.items?.find(i => i.key === 'duration')?.value;
                    
                    const criticalIssues = data.issues?.filter(i => i.level === 'error').length || 0;
                    const score = Math.max(0, 100 - (criticalIssues * 5) - ((data.issues?.length || 0) - criticalIssues));

                    history.push({
                      id: item.name,
                      url: engineReport?.items?.find(i => i.key === 'origin')?.value || `https://${item.name.replace(/_/g, '.')}`,
                      date: startedAtStr ? new Date(startedAtStr).toISOString() : stat.mtime.toISOString(),
                      duration: durationStr || '-',
                      score,
                      pages: data.inventory?.length || 0
                    });
                  } catch (e) {
                    // ignore if report.json doesn't exist or is invalid
                  }
                }
              }
              
              // Sort by newest first
              history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(history));
            } catch (e) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify([]));
            }
            return;
          }

          next();
        });
      }
    }
  ],
})
