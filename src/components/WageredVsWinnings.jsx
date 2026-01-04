import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data following the trend in your image
const data = [
  { date: '2025-10-31', wagered: 5400, paidOut: 4500 },
  { date: '2025-11-01', wagered: 5800, paidOut: 4800 },
  { date: '2025-11-02', wagered: 5200, paidOut: 4200 },
  { date: '2025-11-03', wagered: 7800, paidOut: 6800 },
  { date: '2025-11-04', wagered: 7000, paidOut: 6000 },
  { date: '2025-11-05', wagered: 6500, paidOut: 5500 },
  { date: '2025-11-06', wagered: 6200, paidOut: 5200 },
  { date: '2025-11-07', wagered: 5800, paidOut: 4800 },
  { date: '2025-11-08', wagered: 7700, paidOut: 6700 },
  { date: '2025-11-09', wagered: 6600, paidOut: 5600 },
  { date: '2025-11-10', wagered: 6300, paidOut: 5300 },
  { date: '2025-11-11', wagered: 5800, paidOut: 4800 },
  { date: '2025-11-12', wagered: 7400, paidOut: 6400 },
  { date: '2025-11-13', wagered: 6200, paidOut: 5200 },
  { date: '2025-11-14', wagered: 5200, paidOut: 4200 },
  { date: '2025-11-15', wagered: 5800, paidOut: 4800 },
  { date: '2025-11-16', wagered: 5400, paidOut: 4400 },
  { date: '2025-11-17', wagered: 6600, paidOut: 5600 },
  { date: '2025-11-18', wagered: 6200, paidOut: 5200 },
  { date: '2025-11-19', wagered: 5500, paidOut: 4500 },
  { date: '2025-11-20', wagered: 4900, paidOut: 4000 },
  { date: '2025-11-21', wagered: 6600, paidOut: 5600 },
  { date: '2025-11-22', wagered: 6200, paidOut: 5200 },
  { date: '2025-11-23', wagered: 7600, paidOut: 6600 },
  { date: '2025-11-24', wagered: 7000, paidOut: 6000 },
];

const WageredChart = () => {
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
          {/* Dropdown Placeholder */}
          <div style={{ fontSize: '14px', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            May 2022 - Oct 2022 <span style={{ marginLeft: '8px', fontSize: '10px' }}>▼</span>
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
              // Adjusting interval to show specific dates like in the image
              interval={5} 
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 14 }}
              ticks={[0, 4000, 8000, 12000, 16000]}
              domain={[0, 16000]}
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

            {/* Wagered Line */}
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
      </div>
    </div>
  );
};

export default WageredChart;