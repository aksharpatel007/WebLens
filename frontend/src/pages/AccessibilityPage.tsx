import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Aperture, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

const AccessibilityPage: React.FC = () => {
  const { report } = useOutletContext<any>();
  
  const issues = (report?.issues || []).filter((i: any) => i.category === 'accessibility');
  const critical = issues.filter((i: any) => i.level === 'error' || i.type === 'error').length;
  const warnings = issues.filter((i: any) => i.level === 'warning' || i.type === 'warning').length;
  const info = issues.filter((i: any) => i.level === 'info' || i.type === 'info').length;
  
  const score = Math.max(0, 100 - (critical * 5) - warnings);
  return (
    <div className="animate-fade-in-up">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '2rem', marginBottom: 8}}>Accessibility</h1>
          <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>WCAG compliance and accessibility audit results.</p>
        </div>
        <div style={{display: 'flex', gap: 16}}>
          <div className="card" style={{padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16}}>
            <Aperture size={32} color="var(--color-primary)" />
            <div>
              <div style={{fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600}}>SCORE</div>
              <div style={{fontSize: '2rem', fontWeight: 800}}>{score}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32}}>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><AlertOctagon size={16} color="var(--color-error)" /> Critical</div>
          <div style={{fontSize: '2rem', fontWeight: 700}}>{critical}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><AlertTriangle size={16} color="var(--color-warning)" /> Warnings</div>
          <div style={{fontSize: '2rem', fontWeight: 700}}>{warnings}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><CheckCircle size={16} color="var(--color-success)" /> Info</div>
          <div style={{fontSize: '2rem', fontWeight: 700}}>{info}</div>
        </div>
      </div>

      <div className="card" style={{padding: 32}}>
        <h3 style={{fontSize: '1.25rem', marginBottom: 24, borderBottom: '1px solid var(--color-border)', paddingBottom: 16}}>Categories</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16}}>
          {['Contrast', 'ARIA', 'Forms', 'Images', 'Keyboard', 'Headings', 'Links', 'Landmarks'].map(cat => (
            <div key={cat} style={{display: 'flex', justifyContent: 'space-between', padding: 16, backgroundColor: 'var(--color-bg-muted)', borderRadius: 8}}>
              <span style={{fontWeight: 500}}>{cat}</span>
              <span style={{color: cat === 'Contrast' || cat === 'ARIA' ? 'var(--color-error)' : 'var(--color-success)'}}>
                {cat === 'Contrast' || cat === 'ARIA' ? 'Needs Work' : 'Pass'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
