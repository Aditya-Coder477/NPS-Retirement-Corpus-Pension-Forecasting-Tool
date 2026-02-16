import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import type { CalculatorInputs } from '../../../utils/calculator';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Input } from '../../ui/Input';

interface CalculatorFormProps {
  initialValues: CalculatorInputs;
  onCalculate: (values: CalculatorInputs) => void;
}

export function CalculatorForm({ initialValues, onCalculate }: CalculatorFormProps) {
  const { t } = useLanguage();
  const [values, setValues] = useState<CalculatorInputs>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(values);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t.nav.calculator}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t.calculator.currentAge}
              name="currentAge"
              type="number"
              value={values.currentAge}
              onChange={handleChange}
              min={18}
              max={70}
            />
            <Input
              label={t.calculator.retirementAge}
              name="retirementAge"
              type="number"
              value={values.retirementAge}
              onChange={handleChange}
              min={values.currentAge + 1}
              max={75}
            />
          </div>
          
          <Input
            label={`${t.calculator.monthlyContribution} (₹)`}
            name="monthlyContribution"
            type="number"
            value={values.monthlyContribution}
            onChange={handleChange}
            step={500}
            min={500}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t.calculator.expectedReturn}
              name="expectedReturn"
              type="number"
              value={values.expectedReturn}
              onChange={handleChange}
              step={0.1}
              min={1}
              max={15}
              helperText="Typical NPS returns: 8-12%"
            />
             <Input
              label={t.calculator.annuityRate}
              name="annuityRate"
              type="number"
              value={values.annuityRate}
              onChange={handleChange}
              step={0.1}
              min={1}
              max={10}
              helperText="Approx. return on annuity corpus"
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            {t.calculator.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
