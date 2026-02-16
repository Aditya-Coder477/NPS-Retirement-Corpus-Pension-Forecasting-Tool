import { createContext, type ReactNode, useContext, useState } from 'react';
import type { CalculatorInputs } from '../utils/calculator';

interface CalculatorContextType {
  inputs: CalculatorInputs;
  setInputs: (inputs: CalculatorInputs) => void;
}

const defaultInputs: CalculatorInputs = {
  currentAge: 30,
  retirementAge: 60,
  monthlyContribution: 5000,
  expectedReturn: 10,
  inflation: 6,
  annuityPercentage: 40,
  annuityRate: 6,
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  return (
    <CalculatorContext.Provider value={{ inputs, setInputs }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
