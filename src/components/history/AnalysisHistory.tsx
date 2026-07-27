import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AnalysisResult, ProductCategory } from '../../types';
import { History, Search, Filter, Trash2, Eye, X, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const AnalysisHistory: React.FC = () => {
  const { analyses, deleteAnalysis } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalAnalysis, setActiveModalAnalysis] = useState<AnalysisResult | null>(null);

  const filteredAnalyses = analyses.filter((item) => {
    const matchesSearch = item.input.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || item.input.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" /> Decision History
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Past Product Evaluations ({analyses.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review all previously evaluated products, scores, and purchasing advice.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {['ALL', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnalyses.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 text-xs">
            No analysis records match your search query.
          </div>
        ) : (
          filteredAnalyses.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.input.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {item.input.productName}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Price: ${item.input.productPrice} • Budget: ${item.input.budget}
                    </p>
                  </div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                    item.buyScore >= 75
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60'
                      : item.buyScore >= 50
                      ? 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200/60'
                      : 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200/60'
                  }`}>
                    {item.buyScore}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">{item.verdict}</p>
                  <p className="text-slate-500 text-[11px] line-clamp-2">{item.verdictSummary}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalAnalysis(item)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> View Analysis Details
                </button>

                <button
                  onClick={() => deleteAnalysis(item.id)}
                  title="Delete record"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Detail View */}
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
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white ${
                activeModalAnalysis.buyScore >= 75 ? 'bg-emerald-500' : activeModalAnalysis.buyScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
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
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/50">
                <h5 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Pros</h5>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {activeModalAnalysis.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200/50">
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

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModalAnalysis(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
