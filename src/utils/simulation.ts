import type { CalculatorInputs } from './calculator';

export interface SimulationResult {
  percentile10: number[];
  percentile50: number[];
  percentile90: number[];
  worstCase: number;
  bestCase: number;
  medianCase: number;
}

export function runRiskSimulation(inputs: CalculatorInputs, volatility: number = 0.12): SimulationResult {
  const { currentAge, retirementAge, monthlyContribution, expectedReturn } = inputs;
  const years = retirementAge - currentAge;
  const numSimulations = 500;
  const trajectories: number[][] = [];

  for (let i = 0; i < numSimulations; i++) {
    let corpus = 0;
    const trajectory: number[] = [];
    
    for (let year = 1; year <= years; year++) {
       // Simple annual simulation
       // Return varies by volatility (standard deviation)
       // randomNormal approximation
       const u = 1 - Math.random();
       const v = Math.random();
       const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
       
       const annualReturn = (expectedReturn / 100) + (z * volatility);
       
       // Add annual contribution (simplified as lump sum at start for speed, or monthly)
       // Let's do monthly approximation
       const monthlyReturn = annualReturn / 12;
       
       // Add 12 months data
       for(let m=0; m<12; m++) {
          corpus = (corpus + monthlyContribution) * (1 + monthlyReturn);
       }
       trajectory.push(Math.round(corpus));
    }
    trajectories.push(trajectory);
  }

  // Calculate percentiles for each year
  const p10: number[] = [];
  const p50: number[] = [];
  const p90: number[] = [];

  for (let yearIdx = 0; yearIdx < years; yearIdx++) {
    const valuesAtYear = trajectories.map(t => t[yearIdx]).sort((a, b) => a - b);
    p10.push(valuesAtYear[Math.floor(numSimulations * 0.1)]);
    p50.push(valuesAtYear[Math.floor(numSimulations * 0.5)]);
    p90.push(valuesAtYear[Math.floor(numSimulations * 0.9)]);
  }

  return {
    percentile10: p10,
    percentile50: p50,
    percentile90: p90,
    worstCase: p10[p10.length - 1],
    medianCase: p50[p50.length - 1],
    bestCase: p90[p90.length - 1],
  };
}
