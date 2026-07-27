import { AnalysisResult, ProductComparison, WishlistItem, UserProfile } from '../types';

export const initialUser: UserProfile = {
  uid: 'user_101',
  email: 'alex.dev@worthit.ai',
  displayName: 'Alex Morgan',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  monthlyBudget: 850,
  currency: 'USD',
  savingsGoal: 2000,
  createdAt: '2026-01-15T08:00:00.000Z'
};

export const initialAnalyses: AnalysisResult[] = [
  {
    id: 'anl_demo_1',
    createdAt: '2026-07-24T14:30:00.000Z',
    input: {
      category: 'Electronics',
      productName: 'Sony WH-1000XM5 Noise Canceling Headphones',
      productPrice: 380,
      budget: 500,
      purchasePurpose: 'Productivity & Work',
      usageFrequency: 'Daily',
      ownsSimilar: false,
      primaryFactor: 'Performance'
    },
  buyScore: 88,
confidence: 96,

verdict: 'Highly Recommended',
    verdictSummary: 'Solid purchase. Daily usage for work productivity drastically lowers cost-per-use to under $1.04/day over a year. Budget allocation is safe.',
    pros: [
      'High daily utility for work focus and noise isolation',
      'Fits well within $500 monthly tech budget',
      'Industry-leading active noise canceling retains strong resale value'
    ],
    cons: [
      'Non-foldable hinge design compared to older XM4 model',
      'Requires care when traveling without hard case'
    ],
bestFor: 'Remote workers, students, and frequent travelers',

avoidIf: 'You only need headphones occasionally',

valueForMoney: 'Excellent',

priceFairness: 'Fair price for premium features',

priceAdvice: 'Buy now if you need them for daily work',

lifespanEstimate: '4-5 years',

resaleValue: 'High',

betterAlternatives: [
  'Sony WH-1000XM4',
  'Bose QuietComfort Ultra',
  'Sennheiser Momentum 4'
],

    budgetImpact: {
      priceToBudgetRatio: 76,
      costPerUseEstimate: '$1.04 / day (1-year horizon)',
      savingsAlternative: 'Putting $380 into high-yield savings generates ~$19/yr interest.'
    },
    regretRisk: {
      level: 'Low',
      explanation: 'Extremely low regret probability due to high daily work frequency.'
    },
    smartTips: [
      'Check certified refurbished units directly from Sony eBay store for $299.',
      'Apply 48-hour cool-off period to verify color choice (Black vs Silver).'
    ]
  },
  {
    id: 'anl_demo_2',
    createdAt: '2026-07-20T10:15:00.000Z',
    input: {
      category: 'Fashion',
      productName: 'Designer Italian Leather Jacket',
      productPrice: 650,
      budget: 400,
      purchasePurpose: 'Impulse / Trend',
      usageFrequency: 'Rarely / Occasional',
      ownsSimilar: true,
      primaryFactor: 'Style'
    },
    buyScore: 32,
    verdict: 'High Regret Risk / Skip',
    verdictSummary: 'High regret risk. Price exceeds allocated budget by 62%, and occasional seasonal wear means a massive $108 per wear cost ratio.',
    pros: [
      'High quality full-grain Italian leather craftsmanship',
      'Timeless aesthetic cut'
    ],
    cons: [
      'Exceeds discretionary budget threshold by $250',
      'You already own a similar brown leather jacket',
      'Occasional seasonal wear yields extreme cost-per-wear ratio ($108/wear)'
    ],
confidence: 94,

bestFor: 'Fashion enthusiasts with flexible budgets',

avoidIf: 'You already own a similar jacket or have a limited budget',

valueForMoney: 'Poor',

priceFairness: 'Overpriced for your situation',

priceAdvice: 'Wait for a sale or skip',

lifespanEstimate: '10+ years',

resaleValue: 'Medium',

betterAlternatives: [
  'Levi’s Leather Jacket',
  'Zara Faux Leather Jacket',
  'AllSaints Leather Jacket'
],

    budgetImpact: {
      priceToBudgetRatio: 162,
      costPerUseEstimate: '$108.33 / wear (6 wears/yr assumption)',
      savingsAlternative: 'Saving $650 contributes 32% toward your $2,000 annual goal.'
    },
    regretRisk: {
      level: 'High',
      explanation: 'High regret likelihood: 78% of impulse leather jacket purchases over budget end up unworn in closets after 3 months.'
    },
    smartTips: [
      'Rent for specific events via fashion rental services.',
      'Sell your existing brown leather jacket first before upgrading.'
    ]
  },
  {
    id: 'anl_demo_3',
    createdAt: '2026-07-12T16:45:00.000Z',
    input: {
      category: 'Home',
      productName: 'Espresso Machine with Built-in Grinder',
      productPrice: 599,
      budget: 700,
      purchasePurpose: 'Essential Replacement',
      usageFrequency: 'Daily',
      ownsSimilar: false,
      primaryFactor: 'Quality'
    },
   buyScore: 88,

verdict: 'Highly Recommended',
    verdictSummary: 'Great financial investment if replacing daily $6 coffee shop purchases. Pays for itself in under 3.5 months of home brewing.',
    pros: [
      'Saves ~$150/month in cafe coffee expenses',
      'Daily morning routine integration yields massive ROI',
      'Durable stainless steel construction'
    ],
    cons: [
      'Requires regular cleaning and descaling maintenance',
      'Takes up 12 inches of kitchen counter space'
    ],
confidence: 95,
bestFor: 'Daily coffee drinkers',

avoidIf: 'You rarely drink coffee',

valueForMoney: 'Excellent',

priceFairness: 'Good long-term investment',

priceAdvice: 'Worth buying',

lifespanEstimate: '6-8 years',

resaleValue: 'Medium',

betterAlternatives: [
  'Breville Barista Express',
  'DeLonghi Magnifica',
  'Philips LatteGo'
],

    budgetImpact: {
      priceToBudgetRatio: 85,
      costPerUseEstimate: '$1.64 / day (Year 1, drops to $0.20 Year 2)',
      savingsAlternative: 'Net savings vs Starbucks: +$1,200 saved in 12 months.'
    },
    regretRisk: {
      level: 'Low',
      explanation: 'Very low regret risk because it replaces existing recurring cash outflow.'
    },
    smartTips: [
      'Look out for holiday sales bundle with free coffee beans.',
      'Set aside $20/month for water filters and espresso cleaner tablets.'
    ]
  }
];

export const initialWishlist: WishlistItem[] = [
  {
    id: 'wsh_1',
    productName: 'Ergonomic Mesh Office Chair',
    category: 'Home',
    estimatedPrice: 450,
    targetPrice: 380,
    priority: 'High',
    status: 'Pending Analysis',
    addedAt: '2026-07-22T09:00:00.000Z',
    notes: 'To relieve back strain during long coding sessions'
  },
  {
    id: 'wsh_2',
    productName: 'Mechanical Wireless Keyboard (Custom Switches)',
    category: 'Electronics',
    estimatedPrice: 180,
    targetPrice: 150,
    priority: 'Medium',
    status: 'Analyzed - Worth It',
    addedAt: '2026-07-18T11:20:00.000Z',
    notes: 'Hot-swappable PCB for typing comfort',
    analysisId: 'anl_demo_1'
  },
  {
    id: 'wsh_3',
    productName: 'Trail Running Shoes (Carbon Plate)',
    category: 'Sports',
    estimatedPrice: 220,
    targetPrice: 180,
    priority: 'Low',
    status: 'Pending Analysis',
    addedAt: '2026-07-10T15:30:00.000Z',
    notes: 'For upcoming autumn marathon preparation'
  }
];

export const initialComparisons: ProductComparison[] = [
  {
    id: 'cmp_demo_1',
    createdAt: '2026-07-23T11:00:00.000Z',
    productA: {
      name: 'MacBook Air M3 (16GB RAM)',
      price: 1299,
      category: 'Electronics',
      score: 89,
      strengths: ['Silent fanless design', '18hr battery life', 'High resale value'],
      weaknesses: ['Single external display limit']
    },
    productB: {
      name: 'Dell XPS 13 OLED (16GB RAM)',
      price: 1399,
      category: 'Electronics',
      score: 79,
      strengths: ['Stunning 3.5K OLED touch screen', 'Dual Thunderbolt 4 ports'],
      weaknesses: ['Battery life under 8 hours', 'Higher thermal fan noise']
    },
    summary: 'MacBook Air M3 delivers superior battery efficiency and performance per watt for $100 less.',
    recommendedWinner: 'Product A',
    recommendationReason: 'MacBook Air M3 is the winner due to longer battery longevity, quieter fanless cooling, and lower price tag.'
  }
];
