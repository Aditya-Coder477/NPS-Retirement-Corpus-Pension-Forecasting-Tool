import { useMemo } from 'react';
import { CalculatorForm } from '../components/features/calculator/CalculatorForm';
import { GrowthChart } from '../components/features/calculator/GrowthChart';
import { ResultsSummary } from '../components/features/calculator/ResultsSummary';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
    type CalculatorInputs,
    calculateProjection,
    generateGrowthData,
} from '../utils/calculator';

import { useCalculator } from '../context/CalculatorContext';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { inputs, setInputs } = useCalculator();
  const { t } = useLanguage();

  const results = useMemo(() => calculateProjection(inputs), [inputs]);
  const growthData = useMemo(() => generateGrowthData(inputs), [inputs]);

  const handleCalculate = (newInputs: CalculatorInputs) => {
    setInputs(newInputs);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {t.home.title}
          </h1>
          <p className="text-gray-500 mt-2">
            {t.home.subtitle}
          </p>
        </div>

        <ResultsSummary results={results} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CalculatorForm initialValues={inputs} onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <GrowthChart data={growthData} />
            
             <Card>
              <CardHeader>
                <CardTitle>{t.home.investmentSummary}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>Note:</strong> {t.home.disclaimer1} <strong>{inputs.expectedReturn}%</strong> {t.home.disclaimer2}
                  </p>
                  <p>
                    {t.home.disclaimer3}
                    {" "}
                    {t.home.disclaimer4} <strong>{inputs.annuityPercentage}%</strong> of the final corpus invested at <strong>{inputs.annuityRate}%</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
