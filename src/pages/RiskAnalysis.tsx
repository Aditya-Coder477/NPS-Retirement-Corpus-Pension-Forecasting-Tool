import { useMemo, useState } from 'react';
import { FanChart } from '../components/features/risk/FanChart';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useCalculator } from '../context/CalculatorContext';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/calculator';
import { runRiskSimulation } from '../utils/simulation'; // Adjust import path

export function RiskAnalysis() {
  const { inputs } = useCalculator();
  const { t } = useLanguage();
  const [volatility, setVolatility] = useState(12); // 12% standard deviation
  const [_simulations, _setSimulations] = useState(1000);

  const simulationResult = useMemo(() => {
    return runRiskSimulation(inputs, volatility / 100);
  }, [volatility]);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {t.risk.title}
          </h1>
          <p className="text-gray-500 mt-2">
            {t.risk.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.risk.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">{t.risk.volatility}</label>
                            <input 
                                type="range" 
                                min="5" 
                                max="25" 
                                value={volatility} 
                                onChange={(e) => setVolatility(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>{t.risk.low}</span>
                                <span className="font-bold text-primary">{volatility}%</span>
                                <span>{t.risk.high}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                             <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-600">Simulations Run</span>
                                <span className="font-mono font-medium">500</span>
                             </div>
                             <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-600">Investment Period</span>
                                <span className="font-mono font-medium">{inputs.retirementAge - inputs.currentAge} Years</span>
                             </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader>
                         <CardTitle className="text-base text-slate-800">Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-slate-700">
                        <p>
                            Based on <strong>{volatility}%</strong> volatility, there is a 90% chance your corpus will exceed 
                            <span className="font-bold text-slate-900"> {formatCurrency(simulationResult.worstCase)}</span>.
                        </p>
                        <p>
                             In the median scenario (50% probability), you can expect around 
                             <span className="font-bold text-slate-900"> {formatCurrency(simulationResult.medianCase)}</span>.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2">
                <FanChart simulationResult={simulationResult} years={inputs.retirementAge - inputs.currentAge} />
            </div>
        </div>
      </div>
    </Layout>
  );
}
