import { Trash2 } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { CalculatorInputs } from '../../../utils/calculator';
import { calculateProjection, formatCurrency } from '../../../utils/calculator';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';

export interface Scenario extends CalculatorInputs {
  id: string;
  name: string;
}

interface ComparisonTableProps {
  scenarios: Scenario[];
  onRemove: (id: string) => void;
}

export function ComparisonTable({ scenarios, onRemove }: ComparisonTableProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.compare.title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">{t.compare.table.name}</th>
              <th className="px-6 py-3">{t.compare.table.contribution}</th>
              <th className="px-6 py-3">{t.compare.table.return}</th>
              <th className="px-6 py-3">{t.compare.table.retAge}</th>
              <th className="px-6 py-3">{t.compare.table.totalCorpus}</th>
              <th className="px-6 py-3">{t.compare.table.monthlyPension}</th>
              <th className="px-6 py-3">{t.compare.table.action}</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => {
              const result = calculateProjection(scenario);
              return (
                <tr key={scenario.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {scenario.name}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(scenario.monthlyContribution)}
                  </td>
                  <td className="px-6 py-4">
                    {scenario.expectedReturn}%
                  </td>
                  <td className="px-6 py-4">
                    {scenario.retirementAge}
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">
                    {formatCurrency(result.totalCorpus)}
                  </td>
                  <td className="px-6 py-4 text-green-700">
                    {formatCurrency(result.monthlyPension)}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(scenario.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      disabled={scenarios.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
