import React from 'react';
import { Save, User, Bell } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="animate-fade-in-up" style={{maxWidth: 800}}>
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2rem', marginBottom: 8}}>Settings</h1>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '1.125rem'}}>Manage your account and platform preferences.</p>
      </div>

      <div className="card" style={{padding: 32, marginBottom: 24}}>
        <h3 style={{fontSize: '1.25rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8}}><User size={20} /> Account Profile</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8}}>Name</label>
            <input type="text" defaultValue="Akshar Patel" style={{width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8}} />
          </div>
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8}}>Email Address</label>
            <input type="email" defaultValue="contact@example.com" style={{width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8}} />
          </div>
        </div>
      </div>

      <div className="card" style={{padding: 32, marginBottom: 24}}>
        <h3 style={{fontSize: '1.25rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8}}><Bell size={20} /> Notifications</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <label style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <input type="checkbox" defaultChecked style={{width: 16, height: 16, accentColor: 'var(--color-primary)'}} />
            <span>Email me when an audit completes</span>
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <input type="checkbox" defaultChecked style={{width: 16, height: 16, accentColor: 'var(--color-primary)'}} />
            <span>Send weekly summary reports</span>
          </label>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button className="btn btn-primary"><Save size={18} style={{marginRight: 8}} /> Save Settings</button>
      </div>
    </div>
  );
};

export default SettingsPage;
