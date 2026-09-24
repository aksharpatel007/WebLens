import { Card } from '../components/Card';
import { Sidebar } from '../components/Sidebar';

export default function DashboardPage() {
  const metrics = [
    { label: 'PAGES', value: '1,204', trend: '+12', status: 'normal' },
    { label: 'ISSUES', value: '342', trend: '-45', status: 'warning' },
    { label: 'ERRORS', value: '18', trend: '-2', status: 'critical' },
    { label: 'WARNINGS', value: '156', trend: '-10', status: 'warning' },
  ];

  const scores = [
    { label: 'ACCESSIBILITY', score: '84', grade: 'B' },
    { label: 'SEO', score: '92', grade: 'A' },
    { label: 'SECURITY', score: '65', grade: 'C' },
    { label: 'PERFORMANCE', score: '78', grade: 'B' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '3rem', width: '100%' }}>
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="font-technical" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>AUDIT COMPLETE • ID: WA-8924</div>
            <h1 className="font-display" style={{ fontSize: '2.5rem' }}>https://example.com</h1>
          </div>
          <div style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <div>Started: 14:32:01</div>
            <div>Completed: 14:38:45</div>
            <div>Duration: 6m 44s</div>
          </div>
        </div>

        {/* Top Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {metrics.map((m, i) => (
            <Card key={i} spotlight style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="font-technical" style={{ color: 'var(--text-muted)' }}>{m.label}</div>
                <div className="font-technical" style={{ color: m.trend.startsWith('+') ? 'var(--accent)' : 'var(--text-muted)' }}>{m.trend}</div>
              </div>
              <div className="font-display" style={{ fontSize: '3rem', marginTop: '1rem', color: m.status === 'critical' ? '#EF4444' : m.status === 'warning' ? '#F59E0B' : '#FFF' }}>
                {m.value}
              </div>
            </Card>
          ))}
        </div>

        {/* Scores */}
        <h2 className="font-display" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Category Scores</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {scores.map((s, i) => (
            <Card key={i} spotlight style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.05)' }}>
                {/* Mock progress ring */}
                <svg style={{ position: 'absolute', inset: -4, width: '128px', height: '128px', transform: 'rotate(-90deg)' }}>
                  <circle cx="64" cy="64" r="60" fill="none" stroke={parseInt(s.score) > 80 ? 'var(--accent)' : parseInt(s.score) > 60 ? '#F59E0B' : '#EF4444'} strokeWidth="4" strokeDasharray="377" strokeDashoffset={377 - (377 * parseInt(s.score)) / 100} style={{ transition: 'stroke-dashoffset 1s ease' }} />
                </svg>
                <div className="font-display" style={{ fontSize: '2.5rem' }}>{s.grade}</div>
              </div>
              <div className="font-technical" style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>{s.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.25rem' }}>{s.score}/100</div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
