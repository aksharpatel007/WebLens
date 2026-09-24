import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { Aperture, LayoutDashboard, Search, List, Bug, Settings, History, Shield, Zap, Image, Terminal, FileCode2, FileText, ArrowLeft, MoreHorizontal, Menu, X, Download } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [currentReport, setCurrentReport] = useState<any>(null);
  const [currentTargetUrl, setCurrentTargetUrl] = useState('example.com');
  const [currentWebsiteId, setCurrentWebsiteId] = useState('');

  useEffect(() => {
    if (location.state?.report) {
      setCurrentReport(location.state.report);
    }
    if (location.state?.targetUrl) {
      setCurrentTargetUrl(location.state.targetUrl);
    }
    if (location.state?.websiteId) {
      setCurrentWebsiteId(location.state.websiteId);
    } else {
      try {
        const id = new URL(currentTargetUrl.includes('http') ? currentTargetUrl : `https://${currentTargetUrl}`).hostname.replace(/[^a-zA-Z0-9]/g, '_');
        setCurrentWebsiteId(id);
      } catch (e) {}
    }
  }, [location.state, currentTargetUrl]);

  const displayHostname = (() => {
    try {
      return new URL(currentTargetUrl.includes('http') ? currentTargetUrl : `https://${currentTargetUrl}`).hostname;
    } catch {
      return 'example.com';
    }
  })();

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Desktop */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <div className="sidebar-logo">
              <Aperture size={16} color="#2563eb" />
            </div>
            <span className="sidebar-wordmark">WEBLENS</span>
          </Link>
          <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-scrollable">
          <div className="sidebar-section">
            <NavLink to="/dashboard/overview" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <LayoutDashboard size={16} /> Overview
            </NavLink>
            <NavLink to="/dashboard/audits" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <List size={16} /> Audits
            </NavLink>
            <NavLink to="/dashboard/pages" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <FileText size={16} /> Pages
            </NavLink>
            <NavLink to="/dashboard/issues" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Bug size={16} /> Issues
            </NavLink>
          </div>

          <div className="sidebar-divider"></div>
          
          <div className="sidebar-section-title">ANALYSIS</div>
          <div className="sidebar-section">
            <NavLink to="/dashboard/accessibility" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Aperture size={16} /> Accessibility
            </NavLink>
            <NavLink to="/dashboard/seo" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Search size={16} /> SEO
            </NavLink>
            <NavLink to="/dashboard/security" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Shield size={16} /> Security
            </NavLink>
            <NavLink to="/dashboard/performance" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Zap size={16} /> Performance
            </NavLink>
            <NavLink to="/dashboard/media" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Image size={16} /> Media
            </NavLink>
            <NavLink to="/dashboard/console" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Terminal size={16} /> Console
            </NavLink>
            <NavLink to="/dashboard/technical" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <FileCode2 size={16} /> Technical
            </NavLink>
          </div>

          <div className="sidebar-divider"></div>

          <div className="sidebar-section">
            <NavLink to="/dashboard/reports" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <FileText size={16} /> Reports
            </NavLink>
            <NavLink to="/dashboard/history" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <History size={16} /> History
            </NavLink>
            <NavLink to="/dashboard/settings" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} onClick={() => setMobileMenuOpen(false)}>
              <Settings size={16} /> Settings
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Navbar */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <button className="btn-icon mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={18} />
            </button>
            <Link to="/" className="btn-icon desktop-back-btn">
              <ArrowLeft size={18} />
            </Link>
            <div className="header-context">
              <h2 className="header-title">Website Audit</h2>
              <div className="header-subtitle">
                {displayHostname} <span className="status-dot-inline green"></span> Completed
              </div>
            </div>
          </div>
          <div className="dashboard-header-right">
            <a 
              href={`/api/download/${currentWebsiteId}`} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary btn-sm desktop-only"
              title="Download Report JSON"
            >
              <Download size={16} className="mr-2" /> Export Report
            </a>
            <Link to="/dashboard/start" className="btn btn-primary btn-sm desktop-only">New Audit</Link>
            <button className="btn-icon ml-2">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="dashboard-content">
          <Outlet context={{ report: currentReport, targetUrl: currentTargetUrl, websiteId: currentWebsiteId }} />
        </div>
      </main>

      {/* Mobile Bottom Navigation (App Style) */}
      <div className="mobile-bottom-nav">
        <NavLink to="/dashboard/overview" className="bottom-nav-item">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </NavLink>
        <NavLink to="/dashboard/issues" className="bottom-nav-item">
          <Bug size={20} />
          <span>Issues</span>
        </NavLink>
        <NavLink to="/dashboard/start" className="bottom-nav-item central-action">
          <div className="central-action-btn">
            <Aperture size={24} color="white" />
          </div>
          <span>Scan</span>
        </NavLink>
        <NavLink to="/dashboard/audits" className="bottom-nav-item">
          <List size={20} />
          <span>Audits</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className="bottom-nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {mobileMenuOpen && <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>}
    </div>
  );
};

export default DashboardLayout;
