import { Calculator, TrendingUp, Wallet } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { ProjectionResult } from '../../../utils/calculator';
import { formatCurrency } from '../../../utils/calculator';
import { Card, CardContent } from '../../ui/Card';

interface ResultsSummaryProps {
  results: ProjectionResult;
}

export function ResultsSummary({ results }: ResultsSummaryProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-primary text-white border-primary-light">
        <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-primary-foreground/80 text-sm font-medium">{t.results.totalCorpus}</span>
                <Wallet className="h-5 w-5 text-accent" />
            </div>
            <div>
                <span className="text-3xl font-bold tracking-tight">
                {formatCurrency(results.totalCorpus)}
                </span>
                <p className="text-xs text-primary-foreground/60 mt-1">
                At retirement age
                </p>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm font-medium">{t.results.monthlyPension}</span>
                <Calculator className="h-5 w-5 text-primary" />
            </div>
            <div>
                <span className="text-3xl font-bold text-gray-900 tracking-tight">
                {formatCurrency(results.monthlyPension)}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                Estimated monthly income
                </p>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col justify-between h-full">
             <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm font-medium">{t.results.gains}</span>
                <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
                 <span className="text-3xl font-bold text-green-700 tracking-tight">
                {formatCurrency(results.gains)}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                Interest earned on {formatCurrency(results.investedAmount)} investment
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
