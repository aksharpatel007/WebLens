import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, Filter, AlertOctagon, AlertTriangle, Info, ChevronRight, X, ExternalLink, Code } from 'lucide-react';
import './IssuesPage.css';

const IssuesPage: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const { report } = useOutletContext<any>();

  let issues = report?.issues || [
    {
      type: 'warning',
      message: 'Missing Meta Description',
      category: 'seo',
      url: 'https://example.com/products',
      code: 'SEO-META-001',
      data: { element: '<head>' },
    },
    {
      type: 'error',
      message: 'Missing Security Header (CSP)',
      category: 'security',
      url: 'https://example.com',
      code: 'SEC-HDR-004',
      data: { header: 'Content-Security-Policy' },
    }
  ];

  // Provide stable ID for UI selection
  issues = issues.map((iss: any, i: number) => ({...iss, id: i}));

  const SeverityIcon = ({ severity }: { severity: string }) => {
    switch (severity?.toLowerCase()) {
      case 'error': return <AlertOctagon size={16} className="text-error" />;
      case 'warning': return <AlertTriangle size={16} className="text-warning" />;
      default: return <Info size={16} className="text-primary" />;
    }
  };

  const SeverityBadge = ({ severity }: { severity: string }) => {
    switch (severity?.toLowerCase()) {
      case 'error': return <span className="badge badge-error">Error</span>;
      case 'warning': return <span className="badge badge-warning">Warning</span>;
      default: return <span className="badge badge-blue">Info</span>;
    }
  };

  return (
    <div className="issues-page animate-fade-in-up">
      <div className="issues-header">
        <h1 className="page-title">Findings</h1>
        
        <div className="issues-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search URLs, findings, or issue codes..." className="search-input" />
          </div>
          <button className="btn btn-secondary">
            <Filter size={16} className="mr-2" /> Filters
          </button>
        </div>
        
        <div className="filter-bar">
          <select className="filter-select">
            <option>Severity: All</option>
            <option>Critical</option>
            <option>Error</option>
            <option>Warning</option>
            <option>Info</option>
          </select>
          <select className="filter-select">
            <option>Category: All</option>
            <option>Accessibility</option>
            <option>SEO</option>
            <option>Security</option>
            <option>Performance</option>
            <option>Media</option>
            <option>Technical</option>
          </select>
          <select className="filter-select">
            <option>Status: Open</option>
            <option>Resolved</option>
            <option>Ignored</option>
          </select>
          <select className="filter-select">
            <option>Sort: Severity</option>
            <option>URL</option>
            <option>Latest</option>
            <option>Category</option>
          </select>
        </div>
      </div>

      <div className="issues-layout">
        <div className="card issues-table-container">
          <table className="audit-table issues-table">
            <thead>
              <tr>
                <th style={{width: 40}}></th>
                <th>Finding</th>
                <th>Category</th>
                <th>URL</th>
                <th>Issue Code</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue: any) => (
                <tr 
                  key={issue.id} 
                  className={`issue-row ${selectedIssue?.id === issue.id ? 'selected' : ''}`}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <td className="text-center"><SeverityIcon severity={issue.type} /></td>
                  <td className="font-medium" style={{maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={issue.message}>{issue.message}</td>
                  <td style={{textTransform: 'capitalize'}}>{issue.category}</td>
                  <td className="url-cell" style={{maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={issue.url}>{issue.url?.replace(/^https?:\/\/[^\/]+/, '') || '/'}</td>
                  <td className="code-cell">{issue.code}</td>
                  <td><span className="status-text text-warning">Open</span></td>
                  <td><ChevronRight size={16} className="text-muted" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedIssue && (
          <div className="issue-detail-panel card">
            <div className="detail-header">
              <h2 className="detail-title">{selectedIssue.message}</h2>
              <button className="btn-icon" onClick={() => setSelectedIssue(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="detail-body">
              <div className="detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Severity</span>
                  <SeverityBadge severity={selectedIssue.type} />
                </div>
                <div className="meta-item">
                  <span className="meta-label">Category</span>
                  <span className="font-medium" style={{textTransform: 'capitalize'}}>{selectedIssue.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Finding Code</span>
                  <span className="code-cell">{selectedIssue.code}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Plugin</span>
                  <span className="code-cell">{selectedIssue.plugin}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="detail-heading">URL</h4>
                <div className="detail-url">
                  <span className="url-mono">{selectedIssue.url}</span>
                  <a href={selectedIssue.url} target="_blank" rel="noreferrer" className="btn-icon-small"><ExternalLink size={14} /></a>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="detail-heading">Finding Data</h4>
                <div className="code-block" style={{maxHeight: 300, overflow: 'auto'}}>
                  <pre style={{margin: 0, fontSize: '0.875rem', fontFamily: 'monospace'}}>
                    {JSON.stringify(selectedIssue.data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            <div className="detail-footer">
              <button className="btn btn-secondary btn-sm">Open Page</button>
              <button className="btn btn-secondary btn-sm"><Code size={14} className="mr-2" /> Copy Fix</button>
              <div className="flex-spacer"></div>
              <button className="btn btn-secondary btn-sm mr-2 text-error">Ignore Issue</button>
              <button className="btn btn-primary btn-sm">Mark Resolved</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
