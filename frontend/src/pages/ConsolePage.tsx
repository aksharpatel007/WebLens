import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AlertTriangle, AlertOctagon, Info } from 'lucide-react';

const ConsolePage: React.FC = () => {
  const { report } = useOutletContext<any>();
  const consoleIssues = (report?.issues || []).filter((i: any) => i.category === 'console' || i.category === 'javascript');
  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Console Errors</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Browser console logs, warnings, and errors detected during crawl.</p>
      </div>

      <div className="card" style={{padding: 32}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {consoleIssues.length > 0 ? consoleIssues.map((issue: any, i: number) => {
            const isError = issue.level === 'error' || issue.type === 'error';
            const isWarning = issue.level === 'warning' || issue.type === 'warning';
            
            let bgColor = 'var(--color-bg-muted)';
            let borderColor = 'var(--color-border)';
            let textColor = 'var(--color-text)';
            let Icon = Info;
            
            if (isError) {
              bgColor = 'var(--color-error-light)';
              borderColor = 'var(--color-error)';
              textColor = 'var(--color-error)';
              Icon = AlertOctagon;
            } else if (isWarning) {
              bgColor = 'var(--color-warning-light)';
              borderColor = 'var(--color-warning)';
              textColor = 'var(--color-warning)';
              Icon = AlertTriangle;
            }

            return (
              <div key={i} style={{padding: 16, backgroundColor: bgColor, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start', borderLeft: `4px solid ${borderColor}`}}>
                <Icon size={20} color={borderColor} style={{marginTop: 2}} />
                <div>
                  <div style={{fontFamily: 'monospace', fontWeight: 600, color: textColor, marginBottom: 8}}>{issue.message}</div>
                  {issue.code && <div style={{fontSize: '0.875rem'}}>Code: {issue.code}</div>}
                  <div style={{fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Found on: {issue.url}</div>
                  {issue.data && (
                    <div style={{marginTop: 8, fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '800px', opacity: 0.8}}>
                      {JSON.stringify(issue.data)}
                    </div>
                  )}
                </div>
              </div>
            );
          }) : (
            <div style={{textAlign: 'center', padding: '32px', color: 'var(--color-text-secondary)'}}>
              No console errors or warnings were detected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsolePage;
