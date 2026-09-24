import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Shield, Lock, Server, AlertOctagon, AlertTriangle } from 'lucide-react';

const SecurityPage: React.FC = () => {
  const { report } = useOutletContext<any>();
  const securityIssues = (report?.issues || []).filter((i: any) => i.category === 'security' || i.category === 'ssl');

  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Security Controls</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Header analysis, SSL/TLS, and security policies.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: 24}}>
        <div className="card" style={{padding: 32}}>
          <h3 style={{fontSize: '1.25rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8}}><Shield size={20} color="var(--color-primary)"/> Security Findings</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {securityIssues.length > 0 ? securityIssues.map((issue: any, index: number) => (
              <div key={index} style={{display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, backgroundColor: 'var(--color-bg-muted)', borderRadius: 8}}>
                <div style={{marginTop: 2}}>
                  {issue.level === 'error' ? <AlertOctagon size={18} color="var(--color-error)" /> : <AlertTriangle size={18} color="var(--color-warning)" />}
                </div>
                <div>
                  <div style={{fontWeight: 600, color: issue.level === 'error' ? 'var(--color-error)' : 'var(--color-warning)'}}>{issue.message}</div>
                  <div style={{fontSize: '0.875rem', marginTop: 4}}>{issue.url}</div>
                  {issue.code && <div style={{fontSize: '0.75rem', marginTop: 8, padding: '2px 6px', backgroundColor: 'var(--color-border)', borderRadius: 4, display: 'inline-block'}}>{issue.code}</div>}
                </div>
              </div>
            )) : (
              <div style={{padding: 32, textAlign: 'center', color: 'var(--color-text-secondary)'}}>
                No security issues found!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
