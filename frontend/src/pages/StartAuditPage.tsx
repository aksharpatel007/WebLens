import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Save, Globe } from 'lucide-react';
import './StartAuditPage.css';

const StartAuditPage: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('https://example.com');
  const [loading, setLoading] = useState(false);

  const handleStartAudit = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch('/api/start-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.websiteId) {
        navigate('/dashboard/live', { state: { targetUrl: url, websiteId: data.websiteId } });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="start-audit-page animate-fade-in-up">
      <div className="start-audit-header">
        <h1 className="page-title">Start New Audit</h1>
        <p className="page-subtitle">Configure parameters and scope for your website crawl.</p>
      </div>

      <div className="config-form">
        <div className="card form-section url-section">
          <label className="form-label">Website URL</label>
          <div className="url-input-wrapper">
            <Globe className="url-icon" size={20} />
            <input 
              type="url" 
              className="url-input" 
              placeholder="https://example.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)} 
            />
          </div>
        </div>

        <div className="config-grid">
          {/* Crawl Settings */}
          <div className="card form-section">
            <h3 className="section-title-sm">Crawl Settings</h3>
            <div className="form-group">
              <label>Maximum Pages</label>
              <input type="number" defaultValue={1000} className="form-input" />
            </div>
            <div className="form-group">
              <label>Maximum Depth</label>
              <input type="number" defaultValue={10} className="form-input" />
            </div>
            <div className="form-group">
              <label>Concurrency</label>
              <input type="number" defaultValue={5} className="form-input" />
            </div>
            <div className="form-group">
              <label>Rate Limit (ms)</label>
              <input type="number" defaultValue={0} className="form-input" />
            </div>
            <div className="form-group">
              <label>Navigation Timeout (ms)</label>
              <input type="number" defaultValue={30000} className="form-input" />
            </div>
          </div>


          {/* Analysis */}
          <div className="card form-section">
            <h3 className="section-title-sm">Analysis</h3>
            <div className="checkbox-grid">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Accessibility</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>SEO</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Security</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Performance</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Media</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Console</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Technical</span>
              </label>
            </div>
          </div>

          {/* Advanced */}
          <div className="card form-section">
            <h3 className="section-title-sm">Advanced</h3>
            <div className="checkbox-group mb-4">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Ignore HTTPS errors</span>
              </label>
            </div>
            <div className="form-group">
              <label>User Agent</label>
              <input type="text" className="form-input" placeholder="Default Playwright UA" />
            </div>
            <div className="form-group">
              <label>Custom HTTP Headers</label>
              <textarea className="form-textarea" placeholder='{"Authorization": "Bearer token"}'></textarea>
            </div>
            <div className="form-group">
              <label>Disabled Plugins (comma separated)</label>
              <input type="text" className="form-input" placeholder="e.g., w3c-validator" />
            </div>
          </div>
        </div>

        <div className="form-actions card">
          <button className="btn btn-secondary" onClick={() => {}}>
            <Save size={18} className="mr-2" /> Save Configuration
          </button>
          <button className="btn btn-primary" onClick={handleStartAudit} disabled={loading}>
            {loading ? 'Starting...' : 'Start Audit'} <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartAuditPage;
