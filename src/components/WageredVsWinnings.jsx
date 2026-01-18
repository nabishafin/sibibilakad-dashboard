import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetChartDataQuery } from '../redux/features/stats/statsApi';

const WageredChart = () => {
  const [params] = useState({ days: 365, period: 'monthly' });
  const { data: chartData, isLoading } = useGetChartDataQuery(params);

  // Safely access nested data: res.data.wageredAndPaidOut
  const data = chartData?.data?.wageredAndPaidOut || [];

  return (
    <div style={{
      backgroundColor: '#0a111a',
      padding: '32px',
      borderRadius: '24px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#f8fafc',
      width: '100%',
      maxWidth: '900px',
      border: '1px solid #1e293b'
    }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '500', margin: 0 }}>Wagered vs Winnings</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* 
            Placeholder for period selector if needed. 
            For now just showing the label as per original mockup, 
            but could be interactive to setParams 
          */}
          <div style={{ fontSize: '14px', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            Last 365 Days ({params.period})
          </div>

          {/* Custom Legend */}
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
              <span>Wagered</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#14b8a6' }}></div>
              <span>Paid Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: 400 }}>
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-gray-500">Loading chart data...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                horizontal={true}
                stroke="#1e293b"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#475569', fontSize: 14 }}
                dy={15}
              // interval={0} // Let recharts determine interval automatically for better responsiveness
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#475569', fontSize: 14 }}
                // Allow auto domain
                // ticks={[0, 4000, 8000, 12000, 16000]}
                // domain={[0, 16000]}
                dx={-10}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />

              {/* Winnings Line */}
              <Area
                type="monotone"
                dataKey="paidOut"
                stroke="#14b8a6"
                strokeWidth={2.5}
                fill="transparent"
                dot={false}
                activeDot={{ r: 6 }}
              />

              <Area
                type="monotone"
                dataKey="wagered"
                stroke="#eab308"
                strokeWidth={2.5}
                fill="transparent"
                dot={false}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default WageredChart;
