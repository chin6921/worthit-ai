import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, WishlistItem } from '../../types';
import { Bookmark, Plus, Trash2, Calculator, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES: ProductCategory[] = ['Electronics', 'Fashion', 'Beauty', 'Home', 'Sports', 'Books', 'Other'];

export const WishlistManager: React.FC = () => {
  const { wishlist, addWishlistItem, removeWishlistItem, updateWishlistStatus, setActiveTab } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Electronics');
  const [estimatedPrice, setEstimatedPrice] = useState<number | ''>('');
  const [targetPrice, setTargetPrice] = useState<number | ''>('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [notes, setNotes] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !estimatedPrice) return;

    addWishlistItem({
      productName,
      category,
      estimatedPrice: Number(estimatedPrice),
      targetPrice: targetPrice ? Number(targetPrice) : undefined,
      priority,
      status: 'Pending Analysis',
      notes
    });

    setProductName('');
    setEstimatedPrice('');
    setTargetPrice('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" /> Cooling-Off Wishlist
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Smart Watchlist ({wishlist.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Store desired items to cool off impulse triggers before committing to a purchase.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Item to Watchlist
        </button>
      </div>

      {/* Add Item Modal/Form */}
      {showAddForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAddSubmit}
          className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Add New Watchlist Item
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Ergonomic Desk Chair"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Price ($) *
              </label>
              <input
                type="number"
                required
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="350"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notes / Reason for Consideration
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Wait for Black Friday sale"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-sm"
            >
              Save to Wishlist
            </button>
          </div>
        </motion.form>
      )}

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 text-xs">
            Your wishlist is empty. Add items above to track them!
          </div>
        ) : (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.priority === 'High' ? 'bg-rose-100 text-rose-800' : item.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {item.productName}
                </h4>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    ${item.estimatedPrice}
                  </span>
                  {item.targetPrice && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      Target: ${item.targetPrice}
                    </span>
                  )}
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                    "{item.notes}"
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <select
                  value={item.status}
                  onChange={(e) => updateWishlistStatus(item.id, e.target.value as any)}
                  className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg border-0"
                >
                  <option value="Pending Analysis">Pending Analysis</option>
                  <option value="Analyzed - Worth It">Worth It</option>
                  <option value="Analyzed - Passed">Passed / Skipped</option>
                  <option value="Purchased">Purchased</option>
                </select>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('analyze')}
                    title="Analyze Now"
                    className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg transition-colors"
                  >
                    <Calculator className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeWishlistItem(item.id)}
                    title="Remove item"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
