import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FileDown, FileJson, FileSpreadsheet, Code } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const { websiteId } = useOutletContext<any>();
  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Reports</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Export audit findings in various formats.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24}}>
        {[
          {title: 'JSON Report', desc: 'Raw data export for developers.', icon: <FileJson size={24}/>, color: '#3b82f6', format: 'json'},
          {title: 'Excel Report', desc: 'Detailed spreadsheet of all findings.', icon: <FileSpreadsheet size={24}/>, color: '#10b981', format: 'xlsx'},
          {title: 'HTML Report', desc: 'Sharable standalone web report.', icon: <Code size={24}/>, color: '#f59e0b', format: 'html'},
          {title: 'Sitemap XML', desc: 'Generated sitemap of discovered pages.', icon: <FileDown size={24}/>, color: '#6366f1', format: 'xml'}
        ].map(report => (
          <div key={report.title} className="card" style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{width: 48, height: 48, borderRadius: 8, backgroundColor: `${report.color}15`, color: report.color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {report.icon}
            </div>
            <div>
              <h3 style={{fontSize: '1.125rem', fontWeight: 600}}>{report.title}</h3>
              <p style={{color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: 4}}>{report.desc}</p>
            </div>
            <div style={{display: 'flex', gap: 8, marginTop: 'auto'}}>
              <a 
                href={`/api/download/${websiteId}/${report.format}`} 
                className="btn btn-primary" 
                style={{flex: 1, padding: '8px', fontSize: '0.875rem', textAlign: 'center'}}
              >
                Download
              </a>
              <a 
                href={`/api/download/${websiteId}/${report.format}?view=true`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary" 
                style={{padding: '8px 12px', textAlign: 'center'}}
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
