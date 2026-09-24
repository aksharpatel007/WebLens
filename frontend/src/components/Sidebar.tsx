import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, FileText, Activity, Search, Shield, Image, Terminal, Settings } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const sections = [
    {
      title: 'WORKSPACE',
      items: [
        { name: 'Overview', path: '/overview', icon: <LayoutDashboard size={18} /> },
        { name: 'Issues', path: '/issues', icon: <AlertTriangle size={18} /> },
        { name: 'Pages', path: '/pages', icon: <FileText size={18} /> },
        { name: 'Accessibility', path: '/accessibility', icon: <Activity size={18} /> },
        { name: 'SEO', path: '/seo', icon: <Search size={18} /> },
        { name: 'Security', path: '/security', icon: <Shield size={18} /> },
        { name: 'Performance', path: '/performance', icon: <Activity size={18} /> },
        { name: 'Media', path: '/media', icon: <Image size={18} /> },
        { name: 'Console', path: '/console', icon: <Terminal size={18} /> },
        { name: 'Technical', path: '/technical', icon: <Settings size={18} /> },
      ]
    },
    {
      title: 'REPORTING',
      items: [
        { name: 'Reports', path: '/reports', icon: <FileText size={18} /> },
        { name: 'History', path: '/history', icon: <Activity size={18} /> },
        { name: 'Compare', path: '/compare', icon: <LayoutDashboard size={18} /> },
      ]
    }
  ];

  return (
    <div style={{ width: '250px', borderRight: '1px solid var(--border-subtle)', height: 'calc(100vh - 80px)', position: 'fixed', left: 0, top: '80px', overflowY: 'auto', padding: '2rem 1rem', background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(10px)' }}>
      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: '2.5rem' }}>
          <div className="font-technical" style={{ color: 'var(--text-muted-secondary)', marginBottom: '1rem', paddingLeft: '1rem' }}>
            {section.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {section.items.map(item => {
              const active = path === item.path;
              return (
                <Link key={item.name} to={item.path} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px',
                  background: active ? 'rgba(16,185,129,0.1)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent'
                }}>
                  {item.icon}
                  <span style={{ fontWeight: active ? 600 : 400, fontSize: '0.95rem' }}>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      
      <div style={{ position: 'absolute', bottom: '2rem', left: '1rem', right: '1rem' }}>
        <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--text-muted)', borderRadius: '8px' }}>
          <Settings size={18} />
          <span style={{ fontSize: '0.95rem' }}>Settings</span>
        </Link>
      </div>
    </div>
  );
}
