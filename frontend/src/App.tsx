import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import StartAuditPage from './pages/StartAuditPage';
import LiveAuditPage from './pages/LiveAuditPage';
import IssuesPage from './pages/IssuesPage';

// New Pages
import AccessibilityPage from './pages/AccessibilityPage';
import SeoPage from './pages/SeoPage';
import SecurityPage from './pages/SecurityPage';
import PerformancePage from './pages/PerformancePage';
import MediaPage from './pages/MediaPage';
import ConsolePage from './pages/ConsolePage';
import TechnicalPage from './pages/TechnicalPage';
import ReportsPage from './pages/ReportsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import AuditsPage from './pages/AuditsPage';
import PagesPage from './pages/PagesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <LandingPage />
          </>
        } />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="audits" element={<AuditsPage />} />
          <Route path="pages" element={<PagesPage />} />
          <Route path="start" element={<StartAuditPage />} />
          <Route path="live" element={<LiveAuditPage />} />
          <Route path="issues" element={<IssuesPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="seo" element={<SeoPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="console" element={<ConsolePage />} />
          <Route path="technical" element={<TechnicalPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
