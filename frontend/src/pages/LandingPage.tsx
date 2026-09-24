import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Aperture, ArrowRight, Shield, Zap, Search, LayoutTemplate, Bug, Globe, Terminal, FileCode2, LineChart, Lock, Briefcase } from 'lucide-react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <div className="hero-background-grid"></div>
      
      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">
            <span className="status-dot pulsing"></span>
            PLAYWRIGHT-POWERED WEBSITE INTELLIGENCE
          </div>
          
          <h1 className="hero-heading extra-bold">
            Know What's Happening<br />Across Every Page.
          </h1>
          
          <p className="hero-supporting-text">
            WebLens crawls your website and turns accessibility, SEO, performance, security, media, and technical signals into actionable findings.
          </p>
          
          <div className="hero-ctas">
            <Link to="/dashboard/start" className="btn btn-primary btn-lg">
              Start New Audit <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/dashboard/overview" className="btn btn-secondary btn-lg">
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="preview-section container animate-fade-in-up animate-delay-2">
        <div className="browser-mockup card interactive">
          <div className="browser-header">
            <div className="browser-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="browser-url">
              <Lock size={12} color="#16a34a" className="mr-2" />
              https://example.com
            </div>
            <div style={{width: 48}}></div>
          </div>
          <div className="browser-content">
            <div className="mockup-sidebar">
              <div className="mockup-nav-item active">Overview</div>
              <div className="mockup-nav-item">Issues</div>
              <div className="mockup-nav-item">Pages</div>
              <div className="mockup-nav-section">Audits</div>
              <div className="mockup-nav-item">Accessibility</div>
              <div className="mockup-nav-item">SEO</div>
              <div className="mockup-nav-item">Security</div>
              <div className="mockup-nav-item">Performance</div>
            </div>
            <div className="mockup-main">
              <div className="mockup-header">
                <div>
                  <h2 className="mockup-title">Website Audit</h2>
                  <div className="mockup-subtitle">example.com <span className="status-dot-inline green"></span> Completed</div>
                </div>
                <div className="mockup-actions">
                  <button className="btn btn-secondary btn-sm">Export Report</button>
                  <button className="btn btn-primary btn-sm">New Audit</button>
                </div>
              </div>
              <div className="mockup-kpis">
                <div className="mockup-kpi-card">
                  <div className="kpi-label">Pages Crawled</div>
                  <div className="kpi-value">248</div>
                </div>
                <div className="mockup-kpi-card">
                  <div className="kpi-label">Issues Found</div>
                  <div className="kpi-value">37</div>
                </div>
                <div className="mockup-kpi-card">
                  <div className="kpi-label">Critical Issues</div>
                  <div className="kpi-value text-error">4</div>
                </div>
                <div className="mockup-kpi-card">
                  <div className="kpi-label">Audit Score</div>
                  <div className="kpi-value text-primary">91%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section container">
        <div className="features-grid">
          <div className="feature-card card interactive">
            <div className="feature-icon"><LayoutTemplate size={24} /></div>
            <h3>Accessibility</h3>
            <p>Detect WCAG accessibility issues and identify affected elements.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><Search size={24} /></div>
            <h3>SEO</h3>
            <p>Analyze metadata, canonical URLs, headings, links, robots, and crawlability.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><Shield size={24} /></div>
            <h3>Security</h3>
            <p>Inspect security headers, CSP, TLS certificates, and security configuration.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><Zap size={24} /></div>
            <h3>Performance</h3>
            <p>Identify slow pages, large resources, navigation timing, and bottlenecks.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><FileCode2 size={24} /></div>
            <h3>Media</h3>
            <p>Analyze images, metadata, dimensions, compression, and oversized assets.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><Globe size={24} /></div>
            <h3>Technical</h3>
            <p>Inspect HTML structure, HTTP responses, redirects, and technical signals.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><Terminal size={24} /></div>
            <h3>Console</h3>
            <p>Detect browser console errors and runtime warnings during crawls.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><Bug size={24} /></div>
            <h3>Resources</h3>
            <p>Analyze downloadable files, PDFs, DOCX files, MIME types, and resources.</p>
          </div>
          <div className="feature-card card interactive">
            <div className="feature-icon"><LineChart size={24} /></div>
            <h3>Crawl Intelligence</h3>
            <p>Understand page relationships, depth, scope, and crawl behavior.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="trust-section container">
        <p className="trust-heading">Built for teams that care about what happens after deployment.</p>
        <div className="trust-categories">
          <span>Accessibility</span>
          <span>SEO</span>
          <span>Security</span>
          <span>Performance</span>
          <span>Compliance</span>
          <span>Technical Quality</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-bg-decor"></div>
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">{statsVisible ? '12,482' : '0'}</div>
            <div className="stat-label">PAGES AUDITED</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{statsVisible ? '3,921' : '0'}</div>
            <div className="stat-label">ISSUES DETECTED</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{statsVisible ? '98.4%' : '0%'}</div>
            <div className="stat-label">AUDIT COMPLETION RATE</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{statsVisible ? '2.4M' : '0'}</div>
            <div className="stat-label">RESOURCES ANALYZED</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>What does WebLens analyze?</h3>
            <p>WebLens analyzes accessibility, SEO, security, performance, media, and technical issues across your entire website.</p>
          </div>
          <div className="faq-item">
            <h3>How does website crawling work?</h3>
            <p>It uses Playwright to render pages exactly as a modern browser would, executing JavaScript and capturing real metrics.</p>
          </div>
          <div className="faq-item">
            <h3>Can I export audit reports?</h3>
            <p>Yes, you can export reports in JSON, Excel (XLSX), HTML formats, and generate XML sitemaps.</p>
          </div>
          <div className="faq-item">
            <h3>Can I resume an interrupted audit?</h3>
            <p>Yes, audits use a SQLite backing store allowing you to resume interrupted crawls without losing data.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Turn Every Crawl Into Actionable Intelligence.</h2>
          <p>Find technical issues before your users do.</p>
          <button onClick={() => navigate('/dashboard/start')} className="btn btn-primary btn-lg mt-8">
            Start Your First Audit <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <Aperture size={18} color="#2563eb" />
              </div>
              <span>WEBLENS</span>
            </div>
            <p>Technical intelligence for every page of your website.</p>
            <div className="footer-social-links mt-4" style={{display: 'flex', gap: '16px', marginTop: '16px'}}>
              <a href="https://github.com/aksharpatel007" target="_blank" rel="noreferrer" style={{color: '#64748b'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/akshar-patel-a83611344" target="_blank" rel="noreferrer" style={{color: '#64748b'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://aksharpatel007.github.io/Portfolio/" target="_blank" rel="noreferrer" style={{color: '#64748b'}}>
                <Briefcase size={20} />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link to="#">Overview</Link></li>
              <li><Link to="#">Audits</Link></li>
              <li><Link to="#">Reports</Link></li>
              <li><Link to="#">History</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="#">Documentation</Link></li>
              <li><Link to="#">Guides</Link></li>
              <li><Link to="#">API</Link></li>
              <li><Link to="#">Changelog</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Contact</Link></li>
              <li><Link to="#">Careers</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="#">Privacy</Link></li>
              <li><Link to="#">Terms</Link></li>
              <li><Link to="#">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <div>&copy; 2026 WebLens by Akshar Patel</div>
          <div className="system-status">
            <span className="status-dot pulsing green"></span>
            System Status &bull; Operational
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
