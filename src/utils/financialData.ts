
export const financialFacts = [
  "64% of Americans can't afford a $1,000 emergency expense",
  "The average American spends $18,000 more than they earn each year",
  "Simple budgeting can help save 10-20% of your income",
  "Credit card debt costs the average American $1,230 per year in interest",
  "Only 39% of Americans have enough savings to cover a $1,000 emergency",
  "The 50/30/20 rule is one of the most popular budgeting methods",
  "Americans throw away $1,500 worth of food per year on average",
  "Automating savings can increase your savings rate by 73%",
  "People who write down their financial goals are 42% more likely to achieve them",
  "The average American household has $6,194 in credit card debt",
  "Compound interest can double your money in 7-10 years with proper investing",
  "78% of workers live paycheck to paycheck",
  "Having a budget can reduce financial stress by up to 68%",
  "The average millionaire has 7 different income streams",
  "Starting to save at 25 vs 35 can result in $100,000+ more at retirement"
];

export const getBudgetRule = (income: number) => {
  if (income <= 2000) {
    return {
      name: "Survival Budget (60/30/10)",
      housing: 0.60,
      food: 0.20,
      transportation: 0.10,
      entertainment: 0.05,
      savings: 0.05,
      description: "Focus on essentials and building emergency fund"
    };
  } else if (income <= 4000) {
    return {
      name: "Tight Budget (55/25/20)",
      housing: 0.55,
      food: 0.18,
      transportation: 0.12,
      entertainment: 0.05,
      savings: 0.10,
      description: "Balance necessities with small emergency savings"
    };
  } else if (income <= 7000) {
    return {
      name: "Standard Budget (50/30/20)",
      housing: 0.50,
      food: 0.15,
      transportation: 0.15,
      entertainment: 0.10,
      savings: 0.10,
      description: "Classic balanced approach to budgeting"
    };
  } else {
    return {
      name: "Growth Budget (45/25/30)",
      housing: 0.45,
      food: 0.12,
      transportation: 0.13,
      entertainment: 0.10,
      savings: 0.20,
      description: "Prioritize savings and investments for wealth building"
    };
  }
};

export const getRandomFact = () => {
  return financialFacts[Math.floor(Math.random() * financialFacts.length)];
};
