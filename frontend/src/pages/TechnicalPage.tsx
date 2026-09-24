import React from 'react';
import { useOutletContext } from 'react-router-dom';

const TechnicalPage: React.FC = () => {
  const { report } = useOutletContext<any>();
  const techIssues = (report?.issues || []).filter((i: any) => i.category === 'links' || i.category === 'technical' || i.category === 'server' || i.category === 'network');
  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Technical Analysis</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>HTML structure, HTTP responses, and technical signals.</p>
      </div>

      <div className="card" style={{padding: 32}}>
        <h3 style={{fontSize: '1.25rem', marginBottom: 24, borderBottom: '1px solid var(--color-border)', paddingBottom: 16}}>Technical Issues</h3>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Issue Type</th>
              <th>Description</th>
              <th>Occurrences</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {techIssues.length > 0 ? techIssues.map((issue: any, i: number) => {
              const isError = issue.level === 'error' || issue.type === 'error';
              const isWarning = issue.level === 'warning' || issue.type === 'warning';
              let severityBadge = <span className="badge badge-blue">Info</span>;
              if (isError) severityBadge = <span className="badge badge-error">Error</span>;
              else if (isWarning) severityBadge = <span className="badge badge-warning">Warning</span>;

              return (
                <tr key={i}>
                  <td className="font-medium">{issue.code}</td>
                  <td>{issue.message}</td>
                  <td style={{maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{issue.url}</td>
                  <td>{severityBadge}</td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={4} style={{textAlign: 'center', padding: '32px'}}>No technical issues found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicalPage;
