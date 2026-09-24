import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link as LinkIcon, FileText, AlertTriangle } from 'lucide-react';

const SeoPage: React.FC = () => {
  const { report } = useOutletContext<any>();

  const seoIssues = (report?.issues || []).filter((i: any) => i.category === 'seo');
  const pagesIndexed = report?.inventory?.length || 0;
  const missingTitles = seoIssues.filter((i: any) => i.code?.includes('TITLE')).length;
  const missingDescriptions = seoIssues.filter((i: any) => i.code?.includes('DESCRIPTION') || i.code?.includes('META')).length;
  const brokenLinks = (report?.issues || []).filter((i: any) => i.category === 'links' || i.code?.includes('BROKEN_LINK')).length;
  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>SEO Dashboard</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Search engine optimization analysis and metrics.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32}}>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><FileText size={16} /> Pages Indexed</div>
          <div style={{fontSize: '2rem', fontWeight: 700}}>{pagesIndexed}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><AlertTriangle size={16} color="var(--color-error)" /> Title Issues</div>
          <div style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-error)'}}>{missingTitles}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><AlertTriangle size={16} color="var(--color-warning)" /> Description Issues</div>
          <div style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning)'}}>{missingDescriptions}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><AlertTriangle size={16} color="var(--color-warning)" /> Total SEO Issues</div>
          <div style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning)'}}>{seoIssues.length}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><LinkIcon size={16} color="var(--color-error)" /> Broken Links</div>
          <div style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-error)'}}>{brokenLinks}</div>
        </div>
      </div>

      <div className="card" style={{padding: 32}}>
        <h3 style={{fontSize: '1.25rem', marginBottom: 24, borderBottom: '1px solid var(--color-border)', paddingBottom: 16}}>Analysis Checks</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {['Title analysis', 'Meta descriptions', 'Heading structure', 'Canonical URLs', 'Robots', 'Sitemap', 'Hreflang', 'Structured URLs'].map(check => (
            <div key={check} style={{display: 'flex', justifyContent: 'space-between', padding: 16, backgroundColor: 'var(--color-bg-muted)', borderRadius: 8}}>
              <span style={{fontWeight: 500}}>{check}</span>
              <span className="badge badge-success">Analyzed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeoPage;
