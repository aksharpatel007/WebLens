import React from 'react';
import { useOutletContext } from 'react-router-dom';

const MediaPage: React.FC = () => {
  const { report } = useOutletContext<any>();
  const mediaIssues = (report?.issues || []).filter((i: any) => i.category === 'media' || i.category === 'image' || i.code?.includes('IMG'));
  
  const oversized = mediaIssues.filter((i: any) => i.code?.includes('SIZE') || i.code === 'PERF-IMG-001' || i.message.includes('large')).length;
  const missingAlt = mediaIssues.filter((i: any) => i.code?.includes('ALT') || i.message.toLowerCase().includes('alt')).length;
  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Media Audit</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Image and media asset analysis.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32}}>
        <div className="card" style={{padding: 24}}>
          <div style={{color: 'var(--color-text-secondary)', fontWeight: 500}}>Total Media Issues</div>
          <div style={{fontSize: '2rem', fontWeight: 700}}>{mediaIssues.length}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{color: 'var(--color-error)', fontWeight: 500}}>Oversized Images</div>
          <div style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-error)'}}>{oversized}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{color: 'var(--color-warning)', fontWeight: 500}}>Missing Alt Text</div>
          <div style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning)'}}>{missingAlt}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{color: 'var(--color-text-secondary)', fontWeight: 500}}>Other Issues</div>
          <div style={{fontSize: '2rem', fontWeight: 700}}>{mediaIssues.length - oversized - missingAlt}</div>
        </div>
      </div>
      
      <div className="card" style={{overflowX: 'auto'}}>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Image URL</th>
              <th>Format</th>
              <th>Width</th>
              <th>Height</th>
              <th>File Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mediaIssues.length > 0 ? mediaIssues.map((issue: any, i: number) => {
              let severityBadge = <span className="badge badge-blue">Info</span>;
              if (issue.level === 'error' || issue.type === 'error') severityBadge = <span className="badge badge-error">Error</span>;
              else if (issue.level === 'warning' || issue.type === 'warning') severityBadge = <span className="badge badge-warning">Warning</span>;

              return (
                <tr key={i}>
                  <td className="url-cell" style={{maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{issue.url}</td>
                  <td>{issue.code}</td>
                  <td colSpan={3}>{issue.message}</td>
                  <td>{severityBadge}</td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={6} style={{textAlign: 'center', padding: '32px'}}>No media issues found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MediaPage;
