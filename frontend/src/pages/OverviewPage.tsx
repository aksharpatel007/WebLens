import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, FileText, Bug, AlertOctagon, Activity } from 'lucide-react';
import './OverviewPage.css';

const OverviewPage: React.FC = () => {
  const { report } = useOutletContext<any>();
  
  // Calculate dynamic stats from backend report
  const pagesCrawled = report ? report.inventory?.length || 0 : 248;
  const issuesFound = report ? report.issues?.length || 0 : 37;
  const criticalIssues = report ? report.issues?.filter((i: any) => i.level === 'error').length || 0 : 4;
  
  // Fake score based on issues count (start at 100, subtract 1 for each issue)
  const auditScore = report ? Math.max(0, 100 - (criticalIssues * 5) - (issuesFound - criticalIssues)) : 91;

  return (
    <div className="overview-page animate-fade-in-up">
      <div className="kpi-grid">
        <div className="kpi-card card">
          <div className="kpi-header">
            <span className="kpi-label">Pages Crawled</span>
            <div className="kpi-icon"><FileText size={16} /></div>
          </div>
          <div className="kpi-value">{pagesCrawled}</div>
          <div className="kpi-trend positive">
            <ArrowUpRight size={14} /> {report ? 'From real audit' : '12% from last audit'}
          </div>
        </div>
        
        <div className="kpi-card card">
          <div className="kpi-header">
            <span className="kpi-label">Issues Found</span>
            <div className="kpi-icon"><Bug size={16} /></div>
          </div>
          <div className="kpi-value">{issuesFound}</div>
          <div className="kpi-trend positive">
            <ArrowDownRight size={14} /> {report ? 'From real audit' : '4 fewer than last audit'}
          </div>
        </div>
        
        <div className="kpi-card card">
          <div className="kpi-header">
            <span className="kpi-label">Critical Issues</span>
            <div className="kpi-icon text-error"><AlertOctagon size={16} /></div>
          </div>
          <div className="kpi-value">{criticalIssues}</div>
          <div className="kpi-trend negative">
            <ArrowUpRight size={14} /> {report ? 'From real audit' : '2 more than last audit'}
          </div>
        </div>
        
        <div className="kpi-card card">
          <div className="kpi-header">
            <span className="kpi-label">Audit Score</span>
            <div className="kpi-icon text-primary"><Activity size={16} /></div>
          </div>
          <div className="kpi-value">{auditScore}<span className="text-sm">%</span></div>
          <div className="kpi-trend neutral">
            Unchanged
          </div>
        </div>
      </div>

      <div className="health-section card mt-10">
        <div className="section-header">
          <h3 className="section-title">Overall Audit Health</h3>
          <div className="health-score">
            <span className="score-value text-primary">{auditScore}</span>
            <span className="score-max">/ 100</span>
          </div>
        </div>
        
        <div className="health-grid">
          <div className="health-item">
            <div className="health-item-header">
              <span className="health-label">Accessibility</span>
              <span className="health-val">94</span>
            </div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: '94%'}}></div></div>
          </div>
          <div className="health-item">
            <div className="health-item-header">
              <span className="health-label">SEO</span>
              <span className="health-val">91</span>
            </div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: '91%'}}></div></div>
          </div>
          <div className="health-item">
            <div className="health-item-header">
              <span className="health-label">Security</span>
              <span className="health-val">97</span>
            </div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: '97%'}}></div></div>
          </div>
          <div className="health-item">
            <div className="health-item-header">
              <span className="health-label">Performance</span>
              <span className="health-val">86</span>
            </div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: '86%'}}></div></div>
          </div>
          <div className="health-item">
            <div className="health-item-header">
              <span className="health-label">Technical</span>
              <span className="health-val">89</span>
            </div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: '89%'}}></div></div>
          </div>
          <div className="health-item">
            <div className="health-item-header">
              <span className="health-label">Media</span>
              <span className="health-val">93</span>
            </div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: '93%'}}></div></div>
          </div>
        </div>
      </div>

      <div className="log-section card mt-10">
        <div className="section-header border-bottom">
          <h3 className="section-title">Audit Activity Log</h3>
        </div>
        <div className="table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Category</th>
                <th>Finding</th>
                <th>Severity</th>
                <th>Status</th>
                <th className="text-right">Response Time</th>
                <th className="text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {report?.issues ? report.issues.slice(0, 10).map((issue: any, idx: number) => (
                <tr key={idx}>
                  <td className="url-cell" style={{maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={issue.url}>{issue.url?.replace(/^https?:\/\/[^\/]+/, '') || '/'}</td>
                  <td>{issue.category}</td>
                  <td>{issue.message}</td>
                  <td>
                    {issue.level === 'error' && <span className="badge badge-error">Error</span>}
                    {issue.level === 'warning' && <span className="badge badge-warning">Warning</span>}
                    {issue.level === 'info' && <span className="badge badge-success">Info</span>}
                  </td>
                  <td>Open</td>
                  <td className="text-right text-muted">-</td>
                  <td className="text-right text-muted">-</td>
                </tr>
              )) : (
                <>
                  <tr>
                    <td className="url-cell">/home</td>
                    <td>SEO</td>
                    <td>Missing meta description</td>
                    <td><span className="badge badge-warning">Warning</span></td>
                    <td>Open</td>
                    <td className="text-right text-muted">184ms</td>
                    <td className="text-right text-muted">10:42 AM</td>
                  </tr>
                  <tr>
                    <td className="url-cell">/products</td>
                    <td>Security</td>
                    <td>Missing security header</td>
                    <td><span className="badge badge-error">Error</span></td>
                    <td>Open</td>
                    <td className="text-right text-muted">231ms</td>
                    <td className="text-right text-muted">10:44 AM</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
