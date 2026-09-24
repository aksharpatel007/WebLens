import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ExternalLink, Search } from 'lucide-react';

const PagesPage: React.FC = () => {
  const { report } = useOutletContext<any>();
  
  const pages = report?.inventory || [
    {url: '/', title: 'Home | Example', status: 200, size: '45 KB', time: '124ms', issues: 2},
    {url: '/products', title: 'Products | Example', status: 200, size: '82 KB', time: '210ms', issues: 5},
    {url: '/about', title: 'About Us | Example', status: 200, size: '34 KB', time: '115ms', issues: 0},
    {url: '/contact', title: 'Contact | Example', status: 200, size: '38 KB', time: '142ms', issues: 1},
    {url: '/old-page', title: 'Not Found', status: 404, size: '12 KB', time: '85ms', issues: 1},
  ];
  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Crawled Pages</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Inventory of all URLs discovered and analyzed.</p>
      </div>

      <div className="card" style={{padding: 24, marginBottom: 24}}>
        <div style={{position: 'relative', maxWidth: 500}}>
          <Search size={18} style={{position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
          <input 
            type="text" 
            placeholder="Search URLs or page titles..." 
            style={{width: '100%', padding: '10px 12px 10px 40px', borderRadius: 8, border: '1px solid var(--color-border)'}} 
          />
        </div>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table className="audit-table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Title</th>
              <th>Status</th>
              <th>Size</th>
              <th>Load Time</th>
              <th>Issues</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page: any, i: number) => {
              const urlPath = page.url ? page.url.replace(/^https?:\/\/[^\/]+/, '') || '/' : '/';
              const issuesCount = report?.issues ? report.issues.filter((iss: any) => iss.url === page.url).length : (page.issues || 0);
              return (
                <tr key={i}>
                  <td className="url-cell" style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={page.url}>{urlPath}</span>
                    <a href={page.url} target="_blank" rel="noreferrer" className="text-muted"><ExternalLink size={14} style={{cursor: 'pointer'}} /></a>
                  </td>
                  <td className="font-medium" style={{maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{page.title || (page.mime ? page.mime : 'Unknown')}</td>
                  <td>
                    <span className={`badge ${page.status === 200 ? 'badge-success' : (page.status >= 400 ? 'badge-error' : 'badge-warning')}`}>
                      {page.status || 200}
                    </span>
                  </td>
                  <td>{page.size || '-'}</td>
                  <td>{page.time || '-'}</td>
                  <td>
                    {issuesCount > 0 ? (
                      <span style={{color: 'var(--color-error)', fontWeight: 600}}>{issuesCount}</span>
                    ) : (
                      <span style={{color: 'var(--color-success)'}}>0</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagesPage;
