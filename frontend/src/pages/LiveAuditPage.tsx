import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pause, Square, Activity, AlertCircle, AlertTriangle, FileText, Clock } from 'lucide-react';
import './LiveAuditPage.css';

const LiveAuditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  const targetUrl = location.state?.targetUrl || 'https://example.com';
  const websiteId = location.state?.websiteId || 'example_com';
  const hostname = new URL(targetUrl.includes('http') ? targetUrl : `https://${targetUrl}`).hostname || 'example.com';

  useEffect(() => {
    // Fake progress incrementing while we wait for backend
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 98) return 98; // Cap at 98% until report is found
        return p + (Math.random() * 2);
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Poll the backend to see if the report.json is available
    const pollTimer = setInterval(async () => {
      try {
        const res = await fetch(`/api/report/${websiteId}`);
        if (res.ok) {
          const reportData = await res.json();
          setProgress(100);
          clearInterval(pollTimer);
          
          setTimeout(() => {
            navigate('/dashboard/overview', { state: { report: reportData, targetUrl } });
          }, 1000);
        }
      } catch (err) {
        // Still running
      }
    }, 2500);
    
    return () => clearInterval(pollTimer);
  }, [websiteId, navigate, targetUrl]);

  return (
    <div className="live-audit-page animate-fade-in-up">
      <div className="live-header">
        <div className="live-title-area">
          <div className="pulsing-indicator">
            <span className="status-dot pulsing green"></span>
          </div>
          <div>
            <h1 className="page-title">Running Website Audit</h1>
            <p className="page-subtitle">{hostname}</p>
          </div>
        </div>
        <div className="live-controls">
          <button className="btn btn-secondary btn-sm">
            <Pause size={16} className="mr-2" /> Pause Audit
          </button>
          <button className="btn btn-secondary btn-sm text-error" onClick={() => navigate('/dashboard/overview')}>
            <Square size={16} className="mr-2" /> Stop Audit
          </button>
        </div>
      </div>

      <div className="card progress-card">
        <div className="progress-header">
          <div className="progress-info">
            <span className="progress-label">Current Progress</span>
            <span className="progress-value">{Math.floor(progress)}%</span>
          </div>
          <div className="current-url">
            <span className="text-muted">Crawling:</span> 
            <span className="url-mono"> {targetUrl}</span>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill animated" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="live-stats-grid">
        <div className="card live-stat-card">
          <div className="stat-icon"><FileText size={20} /></div>
          <div className="stat-content">
            <div className="stat-label">Pages Crawled</div>
            <div className="stat-value">168 <span className="stat-sub">/ 248</span></div>
          </div>
        </div>
        <div className="card live-stat-card">
          <div className="stat-icon text-error"><AlertCircle size={20} /></div>
          <div className="stat-content">
            <div className="stat-label">Errors Found</div>
            <div className="stat-value text-error">8</div>
          </div>
        </div>
        <div className="card live-stat-card">
          <div className="stat-icon text-warning"><AlertTriangle size={20} /></div>
          <div className="stat-content">
            <div className="stat-label">Warnings</div>
            <div className="stat-value text-warning">15</div>
          </div>
        </div>
        <div className="card live-stat-card">
          <div className="stat-icon"><Clock size={20} /></div>
          <div className="stat-content">
            <div className="stat-label">Elapsed Time</div>
            <div className="stat-value">02:41</div>
          </div>
        </div>
      </div>

      <div className="card activity-log-card">
        <div className="activity-header">
          <h3 className="section-title-sm mb-0">Live Activity Log</h3>
          <div className="live-badge">
            <Activity size={14} className="mr-1" /> Live
          </div>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-time">10:41:11</div>
            <div className="activity-dot success"></div>
            <div className="activity-desc">Page completed: <span className="url-mono">/products/laptops</span></div>
          </div>
          <div className="activity-item">
            <div className="activity-time">10:41:09</div>
            <div className="activity-dot info"></div>
            <div className="activity-desc">Security headers analyzed</div>
          </div>
          <div className="activity-item">
            <div className="activity-time">10:41:07</div>
            <div className="activity-dot info"></div>
            <div className="activity-desc">Running SEO analysis</div>
          </div>
          <div className="activity-item">
            <div className="activity-time">10:41:05</div>
            <div className="activity-dot info"></div>
            <div className="activity-desc">Running accessibility checks</div>
          </div>
          <div className="activity-item">
            <div className="activity-time">10:41:02</div>
            <div className="activity-dot primary"></div>
            <div className="activity-desc">Crawling <span className="url-mono">/products</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuditPage;
