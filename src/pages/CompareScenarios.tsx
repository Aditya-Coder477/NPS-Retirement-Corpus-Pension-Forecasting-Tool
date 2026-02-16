import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ComparisonChart } from '../components/features/comparison/ComparisonChart';
import { ComparisonTable, type Scenario } from '../components/features/comparison/ComparisonTable';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useLanguage } from '../context/LanguageContext';

export function CompareScenarios() {
  const { t } = useLanguage();
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: '1',
      name: 'Conservative',
      currentAge: 30,
      retirementAge: 60,
      monthlyContribution: 5000,
      expectedReturn: 8,
      inflation: 6,
      annuityPercentage: 40,
      annuityRate: 6,
    },
    {
      id: '2',
      name: 'Moderate (Baseline)',
      currentAge: 30,
      retirementAge: 60,
      monthlyContribution: 5000,
      expectedReturn: 10,
      inflation: 6,
      annuityPercentage: 40,
      annuityRate: 6,
    },
    {
      id: '3',
      name: 'Aggressive',
      currentAge: 30,
      retirementAge: 60,
      monthlyContribution: 5000,
      expectedReturn: 12,
      inflation: 6,
      annuityPercentage: 40,
      annuityRate: 6,
    },
  ]);

  // const [newScenarioName, setNewScenarioName] = useState('');
  // const [showAddForm, setShowAddForm] = useState(false);

  const handleRemove = (id: string) => {
    setScenarios(scenarios.filter((s) => s.id !== id));
  };

  const handleAdd = () => {
    // Add a copy of the Baseline (or first) scenario with new name
    const base = scenarios.find(s => s.name.includes('Moderate')) || scenarios[0];
    const newScenario: Scenario = {
      ...base,
      id: Math.random().toString(36).substr(2, 9),
      name: `Custom (${scenarios.length + 1})`,
      expectedReturn: base.expectedReturn + 1, // varied slightly
    };
    setScenarios([...scenarios, newScenario]);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {t.compare.title}
                </h1>
                <p className="text-gray-500 mt-2">
                    {t.compare.subtitle}
                </p>
            </div>
            <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> {t.compare.addScenario}
            </Button>
        </div>

        <ComparisonChart scenarios={scenarios} />
        
        <ComparisonTable scenarios={scenarios} onRemove={handleRemove} />

        <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4 text-sm text-blue-800">
                {t.compare.insight}
            </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
