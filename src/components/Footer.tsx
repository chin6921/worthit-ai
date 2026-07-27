import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WorthItLogo } from './common/WorthItLogo';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <WorthItLogo size="md" showText={true} showTagline={false} />
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Think Before You Spend. Smart purchasing decision platform that evaluates product value, budget friction, usage frequency, and post-purchase regret risk.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-900/60 w-fit px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Prepared for Firebase & Gemini AI Infrastructure
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('landing')} className="hover:text-white transition-colors">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">
                  Overview Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-white transition-colors">
                  Analyze Product
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-white transition-colors">
                  Compare Products
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wishlist')} className="hover:text-white transition-colors">
                  Wishlist Manager
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-white transition-colors">
                  Analysis History
                </button>
              </li>
            </ul>
          </div>

          {/* Target Audience */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Built For Everyone
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>🎓 Students on tight budgets</li>
              <li>💼 Working Professionals</li>
              <li>🏡 Families & Households</li>
              <li>🛍️ Smart Shoppers & Savers</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 WorthIt AI. Designed &amp; Developed by <span className="text-indigo-400 font-semibold">Bibi Hafsa</span>.</p>
          <p className="flex items-center gap-1 text-slate-500">
            Crafted for smarter financial decisions <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
