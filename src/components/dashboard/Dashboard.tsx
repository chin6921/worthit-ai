import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PlusCircle, 
  GitCompare, 
  Bookmark, 
  History, 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  AlertTriangle, 
  ArrowRight,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  X
} from 'lucide-react';
import { AnalysisResult } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { 
    user, 
    analyses, 
    wishlist, 
    setActiveTab, 
    setSelectedAnalysis, 
    deleteAnalysis,
    updateUserBudget
  } = useApp();

  const [activeModalAnalysis, setActiveModalAnalysis] = useState<AnalysisResult | null>(null);
  const [editingBudget, setEditingBudget] = useState(false);
  const [newBudgetValue, setNewBudgetValue] = useState<number>(user?.monthlyBudget || 800);

  const totalAnalyses = analyses.length;
  const avgBuyScore = totalAnalyses > 0 
    ? Math.round(analyses.reduce((acc, curr) => acc + curr.buyScore, 0) / totalAnalyses) 
    : 0;

  // Saved money estimate (skipped impulse items)
  const savedRegretMoney = analyses
    .filter(a => a.buyScore < 50)
    .reduce((acc, curr) => acc + curr.input.productPrice, 0);

  const recentAnalyses = analyses.slice(0, 4);

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserBudget(newBudgetValue);
    setEditingBudget(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Welcome Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              Personal Dashboard
            </span>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, {user?.displayName || 'Smart Shopper'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ready to evaluate your next purchase decision?
          </p>
        </div>

        {/* Monthly Budget Setting */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60 min-w-[240px]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Monthly Discretionary Budget</span>
            <button
              onClick={() => setEditingBudget(!editingBudget)}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              {editingBudget ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editingBudget ? (
            <form onSubmit={handleSaveBudget} className="flex gap-2 mt-1">
              <input
                type="number"
                min="0"
                value={newBudgetValue}
                onChange={(e) => setNewBudgetValue(Number(e.target.value))}
                className="w-full px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-3 py-1 text-xs bg-indigo-600 text-white font-semibold rounded-lg shrink-0"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                ${user?.monthlyBudget || 800}
              </span>
              <span className="text-[11px] text-slate-400">/ month limit</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('analyze')}
            className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl shadow-md transition-all text-left group"
          >
            <PlusCircle className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm">Analyze Product</h4>
            <p className="text-[11px] text-indigo-100/80 mt-0.5">3-step guided AI score</p>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all text-left group"
          >
            <GitCompare className="w-6 h-6 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Compare Products</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Dual option breakdown</p>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all text-left group"
          >
            <Bookmark className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Wishlist ({wishlist.length})</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Track saved items</p>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all text-left group"
          >
            <History className="w-6 h-6 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Analysis History</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">View {totalAnalyses} records</p>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Products Evaluated</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalAnalyses}</h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Active decision log</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Average Buy Score</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{avgBuyScore}<span className="text-sm font-normal text-slate-400"> /100</span></h3>
            <span className="text-[10px] text-slate-400">Balanced selection standard</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Impulse Money Saved</p>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${savedRegretMoney}</h3>
            <span className="text-[10px] text-slate-400">Avoided high regret items</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Analyses & Wishlist Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Recent Analyses */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Product Analyses
            </h3>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View All ({totalAnalyses}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentAnalyses.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-xs">
                No product analyses performed yet. Click "Analyze Product" above to run your first evaluation!
              </div>
            ) : (
              recentAnalyses.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalAnalysis(item)}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      item.buyScore >= 75
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800'
                        : item.buyScore >= 50
                        ? 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800'
                        : 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800'
                    }`}>
                      {item.buyScore}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {item.input.category}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.input.productName}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        ${item.input.productPrice} • {item.verdict}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className={`hidden sm:inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                      item.buyScore >= 75
                        ? 'bg-emerald-100/80 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : item.buyScore >= 50
                        ? 'bg-amber-100/80 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100/80 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    }`}>
                      {item.verdict}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 4 Cols: Wishlist Quick Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Wishlist Summary
            </h3>
            <button
              onClick={() => setActiveTab('wishlist')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View All ({wishlist.length})
            </button>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            {wishlist.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">Wishlist is empty.</p>
            ) : (
              wishlist.slice(0, 3).map((w) => (
                <div
                  key={w.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                      {w.productName}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Est. ${w.estimatedPrice} • <span className="font-semibold text-indigo-600 dark:text-indigo-400">{w.priority} Priority</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
                    {w.status}
                  </span>
                </div>
              ))
            )}

            <button
              onClick={() => setActiveTab('wishlist')}
              className="w-full py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add New Item to Watchlist
            </button>
          </div>
        </div>

      </div>

      {/* Analysis Quick View Modal */}
      {activeModalAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4"
          >
            <button
              onClick={() => setActiveModalAnalysis(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${
                activeModalAnalysis.buyScore >= 75 ? 'bg-emerald-500 text-white' : activeModalAnalysis.buyScore >= 50 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {activeModalAnalysis.buyScore}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {activeModalAnalysis.input.category} Analysis
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeModalAnalysis.input.productName}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  {activeModalAnalysis.verdict}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
              {activeModalAnalysis.verdictSummary}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                <h5 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Pros</h5>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {activeModalAnalysis.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200/50 dark:border-rose-800/50">
                <h5 className="font-bold text-rose-800 dark:text-rose-300 mb-1">Cons</h5>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {activeModalAnalysis.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs space-y-1">
              <p><strong>Cost Per Use:</strong> {activeModalAnalysis.budgetImpact.costPerUseEstimate}</p>
              <p><strong>Regret Risk:</strong> {activeModalAnalysis.regretRisk.level} - {activeModalAnalysis.regretRisk.explanation}</p>
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-xl text-xs space-y-2">
  <p><strong>AI Confidence:</strong> {activeModalAnalysis.confidence}%</p>

  <p><strong>Best For:</strong> {activeModalAnalysis.bestFor}</p>

  <p><strong>Avoid If:</strong> {activeModalAnalysis.avoidIf}</p>

  <p><strong>Value for Money:</strong> {activeModalAnalysis.valueForMoney}</p>

  <p><strong>Price Fairness:</strong> {activeModalAnalysis.priceFairness}</p>

  <p><strong>Price Advice:</strong> {activeModalAnalysis.priceAdvice}</p>

  <p><strong>Lifespan:</strong> {activeModalAnalysis.lifespanEstimate}</p>

  <p><strong>Resale Value:</strong> {activeModalAnalysis.resaleValue}</p>

  <div>
    <strong>Better Alternatives:</strong>
    <ul className="list-disc list-inside mt-1">
      {activeModalAnalysis.betterAlternatives.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
</div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  deleteAnalysis(activeModalAnalysis.id);
                  setActiveModalAnalysis(null);
                }}
                className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Record
              </button>
              <button
                onClick={() => setActiveModalAnalysis(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
