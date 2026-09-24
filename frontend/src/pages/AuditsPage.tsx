import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Copy, ArrowRight } from 'lucide-react';

const AuditsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in-up">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '2rem', marginBottom: 8}}>Active Audits</h1>
          <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Manage and monitor your website crawls.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard/start')}>
          New Audit <ArrowRight size={18} className="ml-2" />
        </button>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Website</th>
              <th>Status</th>
              <th>Pages</th>
              <th>Issues</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="code-cell">aud_8fx92</td>
              <td className="font-medium">example.com</td>
              <td><span className="badge badge-success">Completed</span></td>
              <td>248</td>
              <td>37</td>
              <td>
                <div style={{display: 'flex', gap: 8}}>
                  <button className="btn-icon" title="View" onClick={() => navigate('/dashboard/overview')}><Eye size={16} /></button>
                  <button className="btn-icon" title="Duplicate" onClick={() => navigate('/dashboard/start')}><Copy size={16} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="code-cell">aud_5zx11</td>
              <td className="font-medium">staging.example.com</td>
              <td><span className="badge badge-warning">In Progress (68%)</span></td>
              <td>168</td>
              <td>23</td>
              <td>
                <div style={{display: 'flex', gap: 8}}>
                  <button className="btn-icon" title="View Progress" onClick={() => navigate('/dashboard/live')}><Eye size={16} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditsPage;
