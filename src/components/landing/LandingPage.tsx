import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  TrendingDown, 
  BrainCircuit, 
  Check, 
  AlertTriangle, 
  Smile, 
  DollarSign, 
  Layers, 
  BarChart3,
  BookmarkPlus
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setAuthModalOpen } = useApp();

  // Demo interactive score calculator card on hero
  const [demoPrice, setDemoPrice] = useState<number>(350);
  const [demoBudget, setDemoBudget] = useState<number>(500);

  const demoRatio = Math.round((demoPrice / demoBudget) * 100);
  const demoScore = Math.max(15, Math.min(95, Math.round(90 - demoRatio * 0.4)));

  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                Next-Gen Purchasing Decision Intelligence
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Think Before You <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-400 bg-clip-text text-transparent">
                  Spend.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                WorthIt AI helps you make smarter purchasing decisions before buying products online or offline. Evaluate true utility, cost-per-use, budget friction, and eliminate impulse buyer’s remorse.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('analyze')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  Analyze a Product Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('compare')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  Compare 2 Products
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> No credit card required
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> Instant AI evaluation
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Score Card Mockup */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Live Score Simulator
                    </span>
                  </div>
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
                    Electronics
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      <span>Product Price: <strong>${demoPrice}</strong></span>
                      <span>Budget: <strong>${demoBudget}</strong></span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1200"
                      step="25"
                      value={demoPrice}
                      onChange={(e) => setDemoPrice(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Calculated Score Meter */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Calculated Buy Score</p>
                      <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                        {demoScore}<span className="text-sm font-normal text-slate-400">/ 100</span>
                      </h4>
                      <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {demoScore >= 75 ? 'Strong Buy Recommendation' : demoScore >= 50 ? 'Proceed with Caution' : 'High Buyer Regret Risk'}
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-full border-4 border-indigo-500 flex items-center justify-center font-bold text-sm text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 shadow-inner">
                      {demoRatio}%
                      <span className="text-[9px] block text-slate-400 font-normal">budget</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <TrendingDown className="w-4 h-4 text-emerald-500 shrink-0" />
                      Cost per use: <strong>${(demoPrice / 180).toFixed(2)} / wear or use</strong>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      Regret Risk Index: <strong className={demoScore > 70 ? 'text-emerald-500' : 'text-amber-500'}>{demoScore > 70 ? 'Low (12%)' : 'Moderate (48%)'}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('analyze')}
                    className="w-full py-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Run Full AI Multi-Step Analysis <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Target Users Banner */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Designed to Protect Financial Goals For
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
              <span className="text-2xl block mb-1">🎓</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Students</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Protect limited income</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
              <span className="text-2xl block mb-1">💼</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Professionals</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Optimize tech & lifestyle spend</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
              <span className="text-2xl block mb-1">🏡</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Families</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Plan household appliances</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
              <span className="text-2xl block mb-1">🛍️</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Impulse Shoppers</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Eliminate post-purchase remorse</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything You Need to Avoid Buyer’s Regret
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Instead of encouraging consumption, WorthIt AI gives you objective, data-backed clarity on every item.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Smart Buy Score
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Synthesizes price, budget ratio, purpose, and usage frequency into a clear 0-100 numerical buy score with instant verdict.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Regret Risk Calculation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Detects impulse indicators and item redundancies ("Do you already own something similar?") to predict regret probabilities before ordering.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Dual Product Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Compare 2 rival products side-by-side. Highlights strengths, weaknesses, price differential, and picks a budget-smart winner.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Budget Friction & Cost-Per-Use
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Calculates real cost per wear or use over 12 months, putting steep price tags into clear financial perspective.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookmarkPlus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Wishlist & Cooling-Off Tracking
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Save desired items to a structured watchlist with priority levels and cooling-off timers before pulling the trigger.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Complete Saved History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Review all past purchase evaluations, filtering by verdict, category, and score for long-term spend reflection.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Simple 3-Step Decision Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">How WorthIt AI Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="space-y-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mx-auto md:mx-0">
                1
              </div>
              <h4 className="font-bold text-base">Select & Enter Details</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pick a product category, enter price, available budget, purpose, and usage frequency.
              </p>
            </div>

            <div className="space-y-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mx-auto md:mx-0">
                2
              </div>
              <h4 className="font-bold text-base">AI Evaluates Value</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our algorithm measures budget friction, ownership redundancy, cost-per-use, and regret likelihood.
              </p>
            </div>

            <div className="space-y-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mx-auto md:mx-0">
                3
              </div>
              <h4 className="font-bold text-base">Get Verdict & Smart Advice</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive your Buy Score, detailed Pros/Cons breakdown, and actionable buying tips before paying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Trusted by Smart Savers Worldwide
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real feedback from users who avoided buyer regret.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs space-y-4">
            <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "I was about to drop $450 on a second smartwatch on impulse. WorthIt AI flagged that I already owned a similar fitness tracker and calculated the regret risk as 85%. Saved me from a silly purchase!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs">
                JD
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white">James D.</h5>
                <p className="text-[10px] text-slate-400">Software Engineer</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs space-y-4">
            <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "As a student on a strict stipend, every dollar counts. Comparing two laptop choices side-by-side showed me that the cheaper model had a higher Buy Score for my specific coding needs."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs">
                MR
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white">Maya R.</h5>
                <p className="text-[10px] text-slate-400">Computer Science Student</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs space-y-4">
            <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "The cost-per-use feature is eye-opening! Seeing that a $600 coffee machine pays for itself in 3 months made me feel 100% confident in buying it."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-xs">
                KL
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white">Kevin L.</h5>
                <p className="text-[10px] text-slate-400">Homeowner & Parent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Stop Buyer’s Regret Before It Happens
          </h2>
          <p className="text-sm text-indigo-100 max-w-xl mx-auto">
            Try WorthIt AI now. Analyze any product in under 60 seconds.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-8 py-3.5 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-sm shadow-md transition-all"
            >
              Analyze Your Next Purchase
            </button>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-indigo-800/60 hover:bg-indigo-800 text-white border border-indigo-400/40 font-semibold text-sm transition-all"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
