export interface CalculatorInputs {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  expectedReturn: number; // in percentage
  inflation: number; // in percentage (optional, for real value adjustment)
  annuityPercentage: number; // default 40
  annuityRate: number; // default 6
}

export interface ProjectionResult {
  totalCorpus: number;
  investedAmount: number;
  gains: number;
  monthlyPension: number;
  lumpSumAmount: number;
  annuityAmount: number;
}

export interface YearlyData {
  year: number;
  age: number;
  invested: number;
  gains: number;
  corpus: number;
}

/**
 * Calculates the future value of a series of monthly contributions (SIP).
 * Formula: FV = P * (((1 + r)^n - 1) / r) * (1 + r)
 */
export function calculateProjection(inputs: CalculatorInputs): ProjectionResult {
  const {
    currentAge,
    retirementAge,
    monthlyContribution,
    expectedReturn,
    annuityPercentage,
    annuityRate,
  } = inputs;

  const yearsToInvest = retirementAge - currentAge;
  const months = yearsToInvest * 12;
  const monthlyRate = expectedReturn / 100 / 12;

  let totalCorpus = 0;
  let investedAmount = 0;

  if (expectedReturn === 0) {
    investedAmount = monthlyContribution * months;
    totalCorpus = investedAmount;
  } else {
    // FV of an annuity due (investing at start of month)
    totalCorpus =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    investedAmount = monthlyContribution * months;
  }

  const gains = totalCorpus - investedAmount;
  const annuityAmount = totalCorpus * (annuityPercentage / 100);
  const lumpSumAmount = totalCorpus - annuityAmount;
  const monthlyPension = (annuityAmount * (annuityRate / 100)) / 12;

  return {
    totalCorpus: Math.round(totalCorpus),
    investedAmount: Math.round(investedAmount),
    gains: Math.round(gains),
    monthlyPension: Math.round(monthlyPension),
    lumpSumAmount: Math.round(lumpSumAmount),
    annuityAmount: Math.round(annuityAmount),
  };
}

export function generateGrowthData(inputs: CalculatorInputs): YearlyData[] {
  const { currentAge, retirementAge, monthlyContribution, expectedReturn } =
    inputs;
  const data: YearlyData[] = [];
  const monthlyRate = expectedReturn / 100 / 12;
  let currentCorpus = 0;
  let totalInvested = 0;

  for (let age = currentAge; age <= retirementAge; age++) {
    // For each year, calculate 12 months of growth + contribution
    // Note: We only add points per year for the chart
    if (age === currentAge) {
      data.push({
        year: new Date().getFullYear(),
        age,
        invested: 0,
        gains: 0,
        corpus: 0,
      });
      continue;
    }

    // Simplification for yearly steps:
    // We could run a monthly loop 12 times
    for (let m = 0; m < 12; m++) {
      currentCorpus = (currentCorpus + monthlyContribution) * (1 + monthlyRate);
      totalInvested += monthlyContribution;
    }

    data.push({
      year: new Date().getFullYear() + (age - currentAge),
      age,
      invested: Math.round(totalInvested),
      gains: Math.round(currentCorpus - totalInvested),
      corpus: Math.round(currentCorpus),
    });
  }

  return data;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
