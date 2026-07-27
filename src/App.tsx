import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProductAnalysisWizard } from './components/analysis/ProductAnalysisWizard';
import { ProductCompare } from './components/compare/ProductCompare';
import { WishlistManager } from './components/wishlist/WishlistManager';
import { AnalysisHistory } from './components/history/AnalysisHistory';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="min-h-[calc(100vh-16rem)]">
      {activeTab === 'landing' && <LandingPage />}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'analyze' && <ProductAnalysisWizard />}
      {activeTab === 'compare' && <ProductCompare />}
      {activeTab === 'wishlist' && <WishlistManager />}
      {activeTab === 'history' && <AnalysisHistory />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
        <div>
          <Navbar />
          <MainContent />
        </div>
        <Footer />
        <AuthModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
