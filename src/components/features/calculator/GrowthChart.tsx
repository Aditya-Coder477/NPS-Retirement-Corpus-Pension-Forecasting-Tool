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
import type { YearlyData } from '../../../utils/calculator';
import { formatCurrency } from '../../../utils/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';

interface GrowthChartProps {
  data: YearlyData[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  const { t } = useLanguage();

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>{t.results.totalCorpus} Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
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
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: any) => formatCurrency(value)}
                labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="corpus"
                name={t.results.totalCorpus}
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#colorCorpus)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="invested"
                name={t.results.invested}
                stroke="#64748b"
                fillOpacity={1}
                fill="url(#colorInvested)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
