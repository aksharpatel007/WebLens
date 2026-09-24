import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Aperture, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <Aperture size={18} color="#2563eb" />
          </div>
          <span className="navbar-wordmark">WEBLENS</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="#platform">Platform</Link>
          <Link to="#solutions">Solutions</Link>
          <Link to="#security">Security</Link>
          <Link to="#documentation">Documentation</Link>
          <Link to="#pricing">Pricing</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/signin" className="navbar-signin">Sign In</Link>
          <Link to="/dashboard" className="btn btn-primary btn-sm">Start Audit &rarr;</Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            <Link to="#platform" onClick={() => setMobileMenuOpen(false)}>Platform</Link>
            <Link to="#solutions" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
            <Link to="#security" onClick={() => setMobileMenuOpen(false)}>Security</Link>
            <Link to="#documentation" onClick={() => setMobileMenuOpen(false)}>Documentation</Link>
            <Link to="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          </div>
          <div className="mobile-menu-actions">
            <Link to="/signin" className="btn btn-secondary" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            <Link to="/dashboard" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Start Audit &rarr;</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
