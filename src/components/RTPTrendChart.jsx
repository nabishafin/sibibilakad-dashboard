import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useGetChartDataQuery } from '../redux/features/stats/statsApi';

const RTPTrendChart = () => {
  const [params, setParams] = useState({ days: 365, period: 'monthly' });
  const { data: chartData, isLoading } = useGetChartDataQuery(params);

  // Safely access nested data: res.data.rtp
  const data = chartData?.data?.rtp || [];

  return (
    <div style={{
      backgroundColor: '#0a111a',
      padding: '20px',
      borderRadius: '16px',
      width: '100%',
      height: '100%',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: '500' }}>
        RTP % Trend ({params.period})
      </h3>

      <div style={{ width: '100%', height: '90%' }}>
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-gray-500">Loading chart data...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRtp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                horizontal={true}
                stroke="#334155"
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                dy={10}
              />

              <YAxis
                // domain={[80, 100]} // Let it scale automatically or set appropriate range
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#2dd4bf' }}
              />

              <Area
                type="monotone"
                dataKey="rtp"
                stroke="#2dd4bf"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRtp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RTPTrendChart;
