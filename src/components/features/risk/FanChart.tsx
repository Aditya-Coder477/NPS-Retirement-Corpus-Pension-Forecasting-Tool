import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useLanguage } from '../../../context/LanguageContext';
import { formatCurrency } from '../../../utils/calculator';
import type { SimulationResult } from '../../../utils/simulation';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';

interface FanChartProps {
  simulationResult: SimulationResult;
  years: number;
}

export function FanChart({ simulationResult, years: _years }: FanChartProps) {
  const { t } = useLanguage();

  const data = simulationResult.percentile50.map((_val, idx) => ({
    year: new Date().getFullYear() + idx + 1,
    p10: simulationResult.percentile10[idx],
    p50: simulationResult.percentile50[idx],
    p90: simulationResult.percentile90[idx],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.risk.chartTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorP10" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                formatter={(value:any) => formatCurrency(value)}
              />
              <Legend />
              
              <Area
                type="monotone"
                dataKey="p90"
                name={t.risk.p90}
                stroke="#93c5fd"
                fill="url(#colorP90)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="p50"
                name={t.risk.p50}
                stroke="#3b82f6"
                fill="none" // Line only for median
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="p10"
                name={t.risk.p10}
                stroke="#1e3a8a"
                fill="url(#colorP10)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
