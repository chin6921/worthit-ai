import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, ProductComparison } from '../../types';
import { runProductComparison } from '../../lib/ai';
import { GitCompare, Sparkles, Check, X, Trophy, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES: ProductCategory[] = ['Electronics', 'Fashion', 'Beauty', 'Home', 'Sports', 'Books', 'Other'];

export const ProductCompare: React.FC = () => {
  const { comparisons, addComparison, showToast } = useApp();

  const [nameA, setNameA] = useState<string>('MacBook Air M3 (16GB RAM)');
  const [priceA, setPriceA] = useState<number | ''>(1299);
  const [catA, setCatA] = useState<ProductCategory>('Electronics');

  const [nameB, setNameB] = useState<string>('Dell XPS 13 OLED (16GB RAM)');
  const [priceB, setPriceB] = useState<number | ''>(1399);
  const [catB, setCatB] = useState<ProductCategory>('Electronics');

  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [activeComparison, setActiveComparison] = useState<ProductComparison | null>(comparisons[0] || null);

  const handleRunCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameA || !priceA || !nameB || !priceB) {
      showToast('Missing Info', 'Please fill in details for both products.', 'warning');
      return;
    }

    setIsComparing(true);
    try {
      const res = await runProductComparison(
        { name: nameA, price: Number(priceA), category: catA },
        { name: nameB, price: Number(priceB), category: catB }
      );
      setActiveComparison(res);
      addComparison(res);
    } catch (err) {
      showToast('Error', 'Failed to generate comparison.', 'error');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-2">
          <GitCompare className="w-3.5 h-3.5" /> Dual Product Comparison Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Compare 2 Products Side-by-Side
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate relative value, price gaps, strengths, and weaknesses before choosing.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleRunCompare} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Product A Column */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md">
                Product A
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                placeholder="e.g. Sony XM5 Headphones"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  required
                  value={priceA}
                  onChange={(e) => setPriceA(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="380"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={catA}
                  onChange={(e) => setCatA(e.target.value as ProductCategory)}
                  className="w-full px-2 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Product B Column */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-md">
                Product B
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                placeholder="e.g. Bose QuietComfort Ultra"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  required
                  value={priceB}
                  onChange={(e) => setPriceB(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="420"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={catB}
                  onChange={(e) => setCatB(e.target.value as ProductCategory)}
                  className="w-full px-2 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

        </div>

        <button
          type="submit"
          disabled={isComparing}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isComparing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Compare Now
        </button>
      </form>

      {/* Comparison Results Card */}
      {activeComparison && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Winner Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Recommended Choice Winner
                </span>
                <h3 className="text-xl font-bold">
                  {activeComparison.recommendedWinner === 'Product A' 
                    ? activeComparison.productA.name 
                    : activeComparison.recommendedWinner === 'Product B' 
                    ? activeComparison.productB.name 
                    : 'Both Options are Equally Valid'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {activeComparison.recommendationReason}
                </p>
              </div>
            </div>
          </div>

          {/* Side by side breakdown cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product A Details */}
            <div className={`p-6 bg-white dark:bg-slate-900 border rounded-3xl space-y-4 ${
              activeComparison.recommendedWinner === 'Product A' 
                ? 'border-indigo-500 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/10' 
                : 'border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Product A</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ${activeComparison.productA.price}
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeComparison.productA.name}
              </h4>

              <div>
                <h5 className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2">
                  Strengths
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeComparison.productA.strengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400 mb-2">
                  Weaknesses
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeComparison.productA.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product B Details */}
            <div className={`p-6 bg-white dark:bg-slate-900 border rounded-3xl space-y-4 ${
              activeComparison.recommendedWinner === 'Product B' 
                ? 'border-sky-500 dark:border-sky-500 shadow-md ring-2 ring-sky-500/10' 
                : 'border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Product B</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ${activeComparison.productB.price}
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeComparison.productB.name}
              </h4>

              <div>
                <h5 className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2">
                  Strengths
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeComparison.productB.strengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400 mb-2">
                  Weaknesses
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeComparison.productB.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
};
