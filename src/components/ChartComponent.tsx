
import { useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface ChartProps {
  title: string;
  description?: string;
  data: ChartData[];
  type: 'line' | 'bar';
  dataKeys: { key: string; color: string; name?: string }[];
  yAxisLabel?: string;
  xAxisLabel?: string;
  height?: number;
  className?: string;
  isAnimationActive?: boolean;
}

const ChartComponent = ({
  title,
  description,
  data,
  type,
  dataKeys,
  yAxisLabel,
  xAxisLabel,
  height = 300,
  className = '',
  isAnimationActive = true,
}: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} style={{ height: `${height}px`, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  label={{ 
                    value: xAxisLabel, 
                    position: 'insideBottom', 
                    offset: -10 
                  }}
                />
                <YAxis 
                  label={{ 
                    value: yAxisLabel, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {dataKeys.map((dataKey) => (
                  <Line
                    key={dataKey.key}
                    type="monotone"
                    dataKey={dataKey.key}
                    name={dataKey.name || dataKey.key}
                    stroke={dataKey.color}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    isAnimationActive={isAnimationActive}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  label={{ 
                    value: xAxisLabel, 
                    position: 'insideBottom', 
                    offset: -10 
                  }}
                />
                <YAxis 
                  label={{ 
                    value: yAxisLabel, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {dataKeys.map((dataKey, index) => (
                  <Bar
                    key={dataKey.key}
                    dataKey={dataKey.key}
                    name={dataKey.name || dataKey.key}
                    fill={dataKey.color}
                    isAnimationActive={isAnimationActive}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
