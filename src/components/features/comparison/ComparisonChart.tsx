import { useMemo } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { formatCurrency, generateGrowthData } from '../../../utils/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import type { Scenario } from './ComparisonTable';

interface ComparisonChartProps {
  scenarios: Scenario[];
}

export function ComparisonChart({ scenarios }: ComparisonChartProps) {
  const chartData = useMemo(() => {
    // Generate data for all scenarios
    const allData = scenarios.map(s => ({
      id: s.id,
      name: s.name,
      data: generateGrowthData(s)
    }));

    // Find the max duration to align X-axis if needed, 
    // but for now assumig they start at same currentAge (roughly)
    
    // We need to merge them into a single array of objects like:
    // { year: 2024, 'Scenario A': 1000, 'Scenario B': 1200 }
    
    // Base it on the first scenario's years (or find the longest one)
    // For simplicity, let's assume they have similar timelines or just take the union of years.
    
    const yearMap = new Map<number, any>();
    
    allData.forEach(scenario => {
      scenario.data.forEach(point => {
        if (!yearMap.has(point.year)) {
          yearMap.set(point.year, { year: point.year });
        }
        const entry = yearMap.get(point.year);
        entry[scenario.name] = point.corpus;
      });
    });

    return Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
  }, [scenarios]);

  const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Corpus Growth Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tickFormatter={(value) => `₹${value / 100000}L`}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
                formatter={(value: any) => formatCurrency(value)}
              />
              <Legend />
              {scenarios.map((s, index) => (
                <Line
                  key={s.id}
                  type="monotone"
                  dataKey={s.name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
