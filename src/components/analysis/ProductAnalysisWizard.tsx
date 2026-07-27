import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ProductCategory, 
  ImportanceFactor, 
  PurchasePurpose, 
  UsageFrequency, 
  AnalysisInput, 
  AnalysisResult 
} from '../../types';
import { runProductAnalysis } from '../../lib/ai';
import { WorthItLogo } from '../common/WorthItLogo';
import { 
  Laptop, 
  Shirt, 
  Sparkles, 
  Home as HomeIcon, 
  Dumbbell, 
  BookOpen, 
  Package, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  TrendingDown, 
  AlertTriangle, 
  BookmarkPlus, 
  RotateCcw,
  GitCompare,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: { id: ProductCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'Electronics', label: 'Electronics', icon: Laptop },
  { id: 'Fashion', label: 'Fashion', icon: Shirt },
  { id: 'Beauty', label: 'Beauty', icon: Sparkles },
  { id: 'Home', label: 'Home & Living', icon: HomeIcon },
  { id: 'Sports', label: 'Sports & Outdoors', icon: Dumbbell },
  { id: 'Books', label: 'Books & Learning', icon: BookOpen },
  { id: 'Other', label: 'Other', icon: Package },
];

const FACTORS: ImportanceFactor[] = ['Price', 'Quality', 'Performance', 'Style', 'Durability'];

const PURPOSES: PurchasePurpose[] = [
  'Essential Replacement',
  'Productivity & Work',
  'Hobby & Passion',
  'Upgrade / Luxury',
  'Impulse / Trend',
  'Gift',
  'Other'
];

const FREQUENCIES: UsageFrequency[] = [
  'Daily',
  'Weekly',
  'Monthly',
  'Rarely / Occasional',
  'One-time Event'
];

export const ProductAnalysisWizard: React.FC = () => {
  const { user, addAnalysis, addWishlistItem, setActiveTab, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Form State
  const [category, setCategory] = useState<ProductCategory>('Electronics');
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [budget, setBudget] = useState<number | ''>(user?.monthlyBudget || 500);
  const [purchasePurpose, setPurchasePurpose] = useState<PurchasePurpose>('Productivity & Work');
  const [usageFrequency, setUsageFrequency] = useState<UsageFrequency>('Daily');
  const [ownsSimilar, setOwnsSimilar] = useState<boolean>(false);
  const [primaryFactor, setPrimaryFactor] = useState<ImportanceFactor>('Quality');

  // Result state
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleNextStep1 = () => {
    setStep(2);
  };

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productPrice || !budget) {
      showToast('Missing Fields', 'Please enter product name, price, and budget.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    setStep(3);

    const inputData: AnalysisInput = {
      category,
      productName,
      productPrice: Number(productPrice),
      budget: Number(budget),
      purchasePurpose,
      usageFrequency,
      ownsSimilar,
      primaryFactor
    };

    try {
      const res = await runProductAnalysis(inputData);
      setResult(res);
      setIsSaved(false);
    } catch (err) {
      showToast('Error', 'Failed to calculate analysis. Please try again.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = () => {
    if (result && !isSaved) {
      addAnalysis(result);
      setIsSaved(true);
    }
  };

  const handleAddToWishlist = () => {
    if (!productName || !productPrice) return;
    addWishlistItem({
      productName,
      category,
      estimatedPrice: Number(productPrice),
      priority: 'Medium',
      status: result ? (result.buyScore >= 60 ? 'Analyzed - Worth It' : 'Analyzed - Passed') : 'Pending Analysis',
      notes: `Evaluated on ${new Date().toLocaleDateString()}`
    });
  };

  const handleReset = () => {
    setStep(1);
    setProductName('');
    setProductPrice('');
    setResult(null);
    setIsSaved(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Wizard Step Indicator */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Product Value Analyzer
          </h2>
          <p className="text-xs text-slate-500">
            Guided purchasing evaluation powered by WorthIt decision engine
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            1
          </span>
          <span className="hidden sm:inline text-slate-400">—</span>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            2
          </span>
          <span className="hidden sm:inline text-slate-400">—</span>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            3
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: CATEGORY SELECT */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 1: Select Product Category
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose the category that best matches the item you are thinking of buying.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const selected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col items-start justify-between h-32 ${
                      selected
                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 shadow-md ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${selected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {cat.label}
                      </h4>
                      {selected && (
                        <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mt-0.5">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep1}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                Continue to Product Form
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: DETAILS FORM */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Categories
                </button>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Category: {category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                Step 2: Tell Us About the Product & Your Budget
              </h3>
            </div>

            <form onSubmit={handleRunAnalysis} className="space-y-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              
              {/* Product Name & Price Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony WH-1000XM5 Headphones"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      required
                      min="1"
                      step="any"
                      placeholder="380"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Purpose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Available Discretionary Budget ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="500"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Purchase Purpose
                  </label>
                  <select
                    value={purchasePurpose}
                    onChange={(e) => setPurchasePurpose(e.target.value as PurchasePurpose)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white"
                  >
                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Frequency & Owns Similar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expected Usage Frequency
                  </label>
                  <select
                    value={usageFrequency}
                    onChange={(e) => setUsageFrequency(e.target.value as UsageFrequency)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white"
                  >
                    {FREQUENCIES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Do you already own something similar?
                  </label>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setOwnsSimilar(false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        !ownsSimilar
                          ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600'
                      }`}
                    >
                      No, First Item
                    </button>
                    <button
                      type="button"
                      onClick={() => setOwnsSimilar(true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        ownsSimilar
                          ? 'bg-amber-50 dark:bg-amber-950 border-amber-600 text-amber-600 dark:text-amber-400'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600'
                      }`}
                    >
                      Yes, Replacing / Adding
                    </button>
                  </div>
                </div>
              </div>

              {/* What Matters Most */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  What matters most to you for this item?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {FACTORS.map((fac) => (
                    <button
                      type="button"
                      key={fac}
                      onClick={() => setPrimaryFactor(fac)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                        primaryFactor === fac
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {fac}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze Worthiness
                </button>
              </div>

            </form>
          </motion.div>
        )}

        {/* STEP 3: RESULTS SCREEN */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {isAnalyzing ? (
              <div className="p-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 animate-spin" />
                  <WorthItLogo size={32} iconOnly={true} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Evaluating Purchase Worthiness...
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Calculating budget friction, cost-per-use metrics, ownership overlap, and buyer regret probability.
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                
                {/* Result Header Gauge */}
                <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {result.input.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          Analysis #{result.id.slice(-5)}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {result.input.productName}
                      </h2>

                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                          ${result.input.productPrice}
                        </span>
                        <span className="text-xs text-slate-400">
                          Budget: ${result.input.budget} ({result.budgetImpact.priceToBudgetRatio}% utilization)
                        </span>
                      </div>
                    </div>

                    {/* Buy Score Badge */}
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                      <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-2xl shadow-sm ${
                        result.buyScore >= 75
                          ? 'bg-emerald-500 text-white'
                          : result.buyScore >= 50
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}>
                        {result.buyScore}
                        <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Score</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overall Verdict</span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {result.verdict}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-[180px]">
                          {result.buyScore >= 75 ? 'Low regret risk' : 'Exercise caution'}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-950/50 p-4 rounded-xl">
                    <strong>AI Verdict Summary:</strong> {result.verdictSummary}
                  </div>
                </div>

                {/* Pros and Cons Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Pros */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-950 rounded-2xl shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Key Purchase Pros</h4>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {result.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-950 rounded-2xl shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Potential Drawbacks & Risks</h4>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {result.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Financial & Regret Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Budget Impact */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                      <DollarSign className="w-4 h-4" /> Budget Impact & Cost-Per-Use
                    </div>
                    <div className="space-y-2 text-xs pt-1">
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Cost Per Use:</strong> {result.budgetImpact.costPerUseEstimate}
                      </p>
                      <p className="text-slate-500">
                        <strong>Alternative Savings Value:</strong> {result.budgetImpact.savingsAlternative}
                      </p>
                    </div>
                  </div>

                  {/* Regret Risk */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" /> Regret Risk Level
                    </div>
                    <div className="space-y-2 text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded font-bold text-xs ${
                          result.regretRisk.level === 'Low' ? 'bg-emerald-100 text-emerald-800' : result.regretRisk.level === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {result.regretRisk.level} Risk
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {result.regretRisk.explanation}
                      </p>
                    </div>
                  </div>

                </div>

                {/* AI Decision Insights */}
<div className="p-6 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 rounded-2xl space-y-4">

  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
    <Sparkles className="w-4 h-4" /> AI Decision Insights
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>AI Confidence:</strong>
      <p>{result.confidence}%</p>
    </div>

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>Value for Money:</strong>
      <p>{result.valueForMoney}</p>
    </div>

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>Best For:</strong>
      <p>{result.bestFor}</p>
    </div>

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>Avoid If:</strong>
      <p>{result.avoidIf}</p>
    </div>

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>Price Fairness:</strong>
      <p>{result.priceFairness}</p>
    </div>

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>Price Advice:</strong>
      <p>{result.priceAdvice}</p>
    </div>

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>Lifespan:</strong>
      <p>{result.lifespanEstimate}</p>
    </div>

    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
      <strong>Resale Value:</strong>
      <p>{result.resaleValue}</p>
    </div>

  </div>


  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-xs">

    <strong>Better Alternatives:</strong>

    <ul className="list-disc list-inside mt-2 space-y-1">
      {result.betterAlternatives.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

  </div>

</div>

                {/* Smart Buying Tips */}
                <div className="p-6 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> Smart Buying Tips
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {result.smartTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Bar */}
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Analyze Another Item
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleAddToWishlist}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" /> Add to Watchlist
                    </button>

                    <button
                      onClick={() => setActiveTab('compare')}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <GitCompare className="w-3.5 h-3.5" /> Compare with Second Item
                    </button>

                    <button
                      onClick={handleSaveAnalysis}
                      disabled={isSaved}
                      className={`px-5 py-2 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 ${
                        isSaved
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      }`}
                    >
                      {isSaved ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      {isSaved ? 'Analysis Saved to History' : 'Save Analysis'}
                    </button>
                  </div>
                </div>

              </div>
            ) : null}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
