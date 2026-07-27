import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AnalysisInput,
  AnalysisResult,
  RecommendationVerdict,
  ProductComparison,
} from "../types";

type GeminiResponse = {
  buyScore: number;
  confidence: number;

  verdict: RecommendationVerdict;
  summary: string;

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

  regretRisk: "Low" | "Medium" | "High";
  regretExplanation: string;

  tips: string[];
};
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash",
});
/**
 * WorthIt AI Engine
 * Prepared for Google Gemini API integration (@google/genai SDK).
 * Runs an advanced rule-based & heuristics AI simulation when offline or pre-key.
 */

export async function runProductAnalysis(input: AnalysisInput): Promise<AnalysisResult> {
  // Simulate standard AI processing delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const {
    productName,
    productPrice,
    budget,
    purchasePurpose,
    usageFrequency,
    ownsSimilar,
    primaryFactor,
    category
  } = input;

const prompt = `
You are WorthIt AI, an expert shopping advisor and financial decision assistant.

Your job is to help users decide whether a product is worth buying.

Analyze the purchase based on:

- Product price
- User's budget
- Purpose
- Usage frequency
- Existing ownership
- Long-term value
- Durability
- Financial impact
- Opportunity cost
- Buyer regret risk

Be honest.

If the purchase is unnecessary, clearly say so.

If the purchase is worth it, explain why.

Do NOT try to make every purchase look good.

Respond ONLY with valid JSON.

Product Name:
${productName}

Category:
${category}

Price:
$${productPrice}

Budget:
$${budget}

Purpose:
${purchasePurpose}

Usage Frequency:
${usageFrequency}

Already Own Similar:
${ownsSimilar}

Primary Buying Factor:
${primaryFactor}

Return EXACTLY this JSON:

{
  "buyScore": 0,
  "confidence": 0,

  "verdict": "",

  "summary": "",

  "pros": [
    "",
    "",
    ""
  ],

  "cons": [
    "",
    "",
    ""
  ],

  "bestFor": "",

  "avoidIf": "",

  "valueForMoney": "",

  "priceFairness": "",

  "priceAdvice": "",

  "lifespanEstimate": "",

  "resaleValue": "",

  "betterAlternatives": [
    "",
    "",
    ""
  ],

  "regretRisk": "",

  "regretExplanation": "",

  "tips": [
    "",
    "",
    ""
  ]
}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanation outside JSON.
- No code block.
- Do not wrap in \`\`\`.
`;
let ai: GeminiResponse | null = null;

try {
  console.log("Calling Gemini...");

  const result = await model.generateContent(prompt);

  const aiText = result.response.text().trim();

  const cleanText = aiText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  ai = JSON.parse(cleanText) as GeminiResponse;

  console.log(ai);

} catch (error) {
  console.error("Gemini Error:", error);
}
  // Calculate base score logic
  let score = 70;

  // Budget ratio calculation
  const ratio = (productPrice / Math.max(budget, 1)) * 100;
  if (ratio > 100) {
    score -= 35; // Over budget penalty
  } else if (ratio > 70) {
    score -= 20;
  } else if (ratio > 40) {
    score -= 10;
  } else if (ratio < 20) {
    score += 12;
  }

  // Purpose weight
  if (purchasePurpose === 'Essential Replacement' || purchasePurpose === 'Productivity & Work') {
    score += 18;
  } else if (purchasePurpose === 'Impulse / Trend') {
    score -= 25;
  } else if (purchasePurpose === 'Upgrade / Luxury') {
    score -= 10;
  }

  // Frequency weight
  if (usageFrequency === 'Daily') score += 15;
  else if (usageFrequency === 'Weekly') score += 8;
  else if (usageFrequency === 'Monthly') score -= 5;
  else if (usageFrequency === 'Rarely / Occasional' || usageFrequency === 'One-time Event') score -= 22;

  // Owns similar penalty
  if (ownsSimilar) score -= 18;

  // Clamp score between 12 and 98
  const finalScore = Math.max(12, Math.min(98, Math.round(score)));

  // Determine Verdict
  let verdict: RecommendationVerdict = 'Worth It with Conditions';
  let verdictSummary = '';

  if (finalScore >= 80) {
    verdict = 'Highly Recommended';
    verdictSummary = `The ${productName} aligns strongly with your budget and expected ${usageFrequency.toLowerCase()} usage. High overall ROI with minimal regret risk.`;
  } else if (finalScore >= 60) {
    verdict = 'Worth It with Conditions';
    verdictSummary = `The ${productName} offers decent utility, but consider wait time or finding a minor deal since it takes up ${ratio.toFixed(0)}% of your allocated budget.`;
  } else if (finalScore >= 40) {
    verdict = 'Consider Waiting / Saving';
    verdictSummary = `Caution advised. Purchasing ${productName} right now presents a moderate regret risk given the ${usageFrequency.toLowerCase()} frequency and budget strain.`;
  } else {
    verdict = 'High Regret Risk / Skip';
    verdictSummary = `We strongly recommend holding off. Based on your impulse drivers and price-to-budget ratio (${ratio.toFixed(0)}%), this purchase is likely to cause buyer regret.`;
  }

  // Calculate cost per use estimate
  let usesPerYear = 365;
  if (usageFrequency === 'Weekly') usesPerYear = 52;
  else if (usageFrequency === 'Monthly') usesPerYear = 12;
  else if (usageFrequency === 'Rarely / Occasional') usesPerYear = 6;
  else if (usageFrequency === 'One-time Event') usesPerYear = 1;

  const costPerUse = (productPrice / usesPerYear).toFixed(2);

  // Generate dynamic Pros and Cons based on input
  const pros: string[] = [];
  const cons: string[] = [];

  if (usageFrequency === 'Daily' || usageFrequency === 'Weekly') {
    pros.push(`High utility: Frequent (${usageFrequency.toLowerCase()}) usage brings low cost-per-use over time.`);
  }
  if (primaryFactor === 'Quality' || primaryFactor === 'Durability') {
    pros.push(`Focus on ${primaryFactor.toLowerCase()} ensures long-term longevity and higher resale value.`);
  }
  if (ratio <= 35) {
    pros.push(`Fits comfortably within your specified budget (${ratio.toFixed(0)}% budget utilization).`);
  }
  if (purchasePurpose === 'Productivity & Work') {
    pros.push('Directly supports work productivity, generating potential indirect return on investment.');
  }
  if (pros.length < 2) {
    pros.push(`Serves your intended purpose for ${category.toLowerCase()}.`);
  }

  if (ownsSimilar) {
    cons.push('Redundancy risk: You already own a similar item, which often leads to unused clutter.');
  }
  if (ratio > 80) {
    cons.push(`High financial friction: Consumes ${ratio.toFixed(0)}% of your available budget.`);
  }
  if (usageFrequency === 'Rarely / Occasional' || usageFrequency === 'One-time Event') {
    cons.push(`Low frequency usage results in an expensive $${costPerUse} estimated cost per use.`);
  }
  if (purchasePurpose === 'Impulse / Trend') {
    cons.push('Driven by short-term novelty rather than core necessity; high statistical risk of regret after 14 days.');
  }
  if (cons.length < 2) {
    cons.push('Potential depreciation: Value drops significantly immediately after opening/using.');
  }

  // Regret Risk
  let regretLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  let regretExplanation = '';

  if (finalScore >= 75) {
    regretLevel = 'Low';
    regretExplanation = 'Low risk of post-purchase regret because utility is high and budget impact is controlled.';
  } else if (finalScore >= 50) {
    regretLevel = 'Medium';
    regretExplanation = 'Moderate risk. You may feel slight regret if you do not use it as frequently as planned.';
  } else {
    regretLevel = 'High';
    regretExplanation = 'High risk! Purchases in this category with high budget friction frequently lead to buyer remorse within 3 weeks.';
  }

  // Smart Tips
  const smartTips = [
    `Apply the 48-Hour Rule: Wait 2 days before placing the order to check if the impulse wanes.`,
    `Consider pre-owned or refurbished options for ${productName} to save up to 30-40%.`,
    ownsSimilar ? `Try selling or gifting your current similar item before purchasing this upgrade.` : `Check return policy duration (aim for at least 30 days risk-free window).`
  ];

return {
  id: `anl_${Date.now()}`,
  createdAt: new Date().toISOString(),
  input,

  buyScore: ai?.buyScore ?? finalScore,

  confidence: ai?.confidence ?? 80,

  verdict: ai?.verdict ?? verdict,

  verdictSummary: ai?.summary ?? verdictSummary,

  pros: ai?.pros ?? pros,

  cons: ai?.cons ?? cons,

  bestFor: ai?.bestFor ?? "",

  avoidIf: ai?.avoidIf ?? "",

  valueForMoney: ai?.valueForMoney ?? "",

  priceFairness: ai?.priceFairness ?? "",

  priceAdvice: ai?.priceAdvice ?? "",

  lifespanEstimate: ai?.lifespanEstimate ?? "",

  resaleValue: ai?.resaleValue ?? "",

  betterAlternatives: ai?.betterAlternatives ?? [],

  budgetImpact: {
    priceToBudgetRatio: Math.round(ratio),
    costPerUseEstimate: `$${costPerUse} / use`,
    savingsAlternative:
      ratio > 50
        ? `Investing this money could grow over time.`
        : `Saving this amount improves your emergency fund.`
  },

  regretRisk: {
    level: ai?.regretRisk ?? regretLevel,
    explanation: ai?.regretExplanation ?? regretExplanation
  },

  smartTips: ai?.tips ?? smartTips
};
}

export async function runProductComparison(
  productA: { name: string; price: number; category: any; details?: string },
  productB: { name: string; price: number; category: any; details?: string }
): Promise<ProductComparison> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const priceDiff = Math.abs(productA.price - productB.price);
  const cheaper = productA.price <= productB.price ? 'Product A' : 'Product B';
  const pricePercent = Math.round((priceDiff / Math.max(productA.price, productB.price, 1)) * 100);

  // Score estimation
  const scoreA: number = productA.price < 300 ? 82 : 74;
  const scoreB: number = productB.price < 300 ? 80 : 72;

  let winner: 'Product A' | 'Product B' | 'Neither' | 'Both Valid' = 'Product A';
  if (productB.price < productA.price && Math.abs(scoreA - scoreB) < 10) {
    winner = 'Product B';
  } else if (scoreA === scoreB) {
    winner = 'Both Valid';
  }

  const winnerName = winner === 'Product A' ? productA.name : winner === 'Product B' ? productB.name : 'both items';

  return {
    id: `cmp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    productA: {
      name: productA.name,
      price: productA.price,
      category: productA.category,
      score: scoreA,
      strengths: [
        `Value positioning at $${productA.price}`,
        `Popular choice in ${productA.category}`,
        `High user satisfaction score`
      ],
      weaknesses: [
        productA.price > productB.price ? `$${priceDiff} pricier than ${productB.name}` : `May lack premium finish of higher end option`
      ]
    },
    productB: {
      name: productB.name,
      price: productB.price,
      category: productB.category,
      score: scoreB,
      strengths: [
        `Competitive feature set`,
        productB.price < productA.price ? `Saves $${priceDiff} (${pricePercent}% cheaper)` : `Premium build quality`,
        `Solid longevity rating`
      ],
      weaknesses: [
        productB.price > productA.price ? `Higher cost outlay` : `May require trade-offs in accessories`
      ]
    },
    summary: `Comparing ${productA.name} ($${productA.price}) vs ${productB.name} ($${productB.price}). There is a $${priceDiff} price gap between the options.`,
    recommendedWinner: winner,
    recommendationReason: `We recommend ${winnerName}. It provides superior cost-to-utility efficiency and lower post-purchase regret indicators for your budget.`
  };
}
