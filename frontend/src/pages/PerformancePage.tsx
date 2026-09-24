import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Zap, Clock, HardDrive, Image as ImageIcon } from 'lucide-react';

const PerformancePage: React.FC = () => {
  const { report } = useOutletContext<any>();
  
  const perfIssues = (report?.issues || []).filter((i: any) => i.category === 'performance');
  const metrics = perfIssues.filter((i: any) => i.code === 'PERFORMANCE_MEASURED').map((i: any) => i.data);
  
  const avgResponseTime = metrics.length > 0 
    ? Math.round(metrics.reduce((acc: number, m: any) => acc + (m.domContentLoadedMs || 0), 0) / metrics.length) 
    : 0;
    
  const slowPages = perfIssues.filter((i: any) => i.code === 'SLOW_PAGE_LOAD').length;
  const largeResources = perfIssues.filter((i: any) => i.code === 'LARGE_RESOURCE').length;
  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Performance Dashboard</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Speed and resource optimization metrics.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32}}>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><Clock size={16} /> Avg DOM Content Load</div>
          <div style={{fontSize: '2.5rem', fontWeight: 800}}>{avgResponseTime || '-'}<span style={{fontSize: '1rem', color: 'var(--color-text-secondary)'}}>ms</span></div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><HardDrive size={16} /> Total Perf Issues</div>
          <div style={{fontSize: '2.5rem', fontWeight: 800}}>{perfIssues.length}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><Zap size={16} color="var(--color-warning)" /> Slow Pages</div>
          <div style={{fontSize: '2.5rem', fontWeight: 800}}>{slowPages}</div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><ImageIcon size={16} color="var(--color-error)" /> Large Resources</div>
          <div style={{fontSize: '2.5rem', fontWeight: 800}}>{largeResources}</div>
        </div>
      </div>

      <div className="card" style={{padding: 32, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc'}}>
        <div style={{textAlign: 'center', color: 'var(--color-text-secondary)'}}>
          <Zap size={48} style={{margin: '0 auto 16px', opacity: 0.2}} />
          <p>Performance charts will render here</p>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
