import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Copy } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(console.error);
  }, []);

  return (
    <div className="animate-fade-in-up">
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Audit History</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Review and compare previous website audits.</p>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Website</th>
              <th>Started</th>
              <th>Completed</th>
              <th>Pages</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? history.map((row) => (
              <tr key={row.id}>
                <td className="code-cell">{row.id}</td>
                <td className="font-medium">{row.url}</td>
                <td>{new Date(row.date).toLocaleString()}</td>
                <td>{row.duration}</td>
                <td>{row.pages}</td>
                <td><span className={`badge ${row.score >= 90 ? 'badge-success' : (row.score >= 70 ? 'badge-warning' : 'badge-error')}`}>{row.score}%</span></td>
                <td>
                  <div style={{display: 'flex', gap: 8}}>
                    <button className="btn-icon" title="View" onClick={() => navigate('/dashboard/overview')}><Eye size={16} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{textAlign: 'center', padding: '32px'}}>No audit history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
