export type ProductCategory = 
  | 'Electronics'
  | 'Fashion'
  | 'Beauty'
  | 'Home'
  | 'Sports'
  | 'Books'
  | 'Other';

export type ImportanceFactor = 
  | 'Price'
  | 'Quality'
  | 'Performance'
  | 'Style'
  | 'Durability';

export type PurchasePurpose = 
  | 'Essential Replacement'
  | 'Hobby & Passion'
  | 'Productivity & Work'
  | 'Upgrade / Luxury'
  | 'Impulse / Trend'
  | 'Gift'
  | 'Other';

export type UsageFrequency = 
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Rarely / Occasional'
  | 'One-time Event';

export type RecommendationVerdict = 
  | 'Highly Recommended'
  | 'Worth It with Conditions'
  | 'Consider Waiting / Saving'
  | 'High Regret Risk / Skip';

export interface AnalysisInput {
  category: ProductCategory;
  productName: string;
  productPrice: number;
  budget: number;
  purchasePurpose: PurchasePurpose;
  usageFrequency: UsageFrequency;
  ownsSimilar: boolean;
  similarItemDetails?: string;
  primaryFactor: ImportanceFactor;
  notes?: string;
}

export interface AnalysisResult {
  id: string;
  userId?: string;
  createdAt: string; // ISO String
  input: AnalysisInput;
  buyScore: number; // 0 to 100
confidence: number;

verdict: RecommendationVerdict;
verdictSummary: string;

pros: string[];
cons: string[];

bestFor: string;
avoidIf: string;

valueForMoney: string;
priceFairness: string;
priceAdvice: string;

lifespanEstimate: string;
resaleValue: string;

betterAlternatives: string[];
  budgetImpact: {
    priceToBudgetRatio: number; // percentage e.g. 25%
    costPerUseEstimate: string; // e.g., "$1.45 / day"
    savingsAlternative: string;
  };
  regretRisk: {
    level: 'Low' | 'Medium' | 'High';
    explanation: string;
  };
  smartTips: string[];
}

export interface ProductComparison {
  id: string;
  userId?: string;
  createdAt: string;
  productA: {
    name: string;
    price: number;
    category: ProductCategory;
    score: number;
    strengths: string[];
    weaknesses: string[];
  };
  productB: {
    name: string;
    price: number;
    category: ProductCategory;
    score: number;
    strengths: string[];
    weaknesses: string[];
  };
  summary: string;
  recommendedWinner: 'Product A' | 'Product B' | 'Neither' | 'Both Valid';
  recommendationReason: string;
}

export interface WishlistItem {
  id: string;
  userId?: string;
  productName: string;
  category: ProductCategory;
  estimatedPrice: number;
  targetPrice?: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending Analysis' | 'Analyzed - Worth It' | 'Analyzed - Passed' | 'Purchased';
  addedAt: string;
  notes?: string;
  analysisId?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  monthlyBudget?: number;
  currency?: string;
  savingsGoal?: number;
  createdAt: string;
}

export type ActiveTab = 'landing' | 'dashboard' | 'analyze' | 'compare' | 'wishlist' | 'history';
