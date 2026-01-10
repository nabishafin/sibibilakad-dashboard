import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


const data = [
  { date: '2025-10-30', rtp: 92.5 },
  { date: '2025-11-01', rtp: 92.2 },
  { date: '2025-11-02', rtp: 92.8 },
  { date: '2025-11-03', rtp: 85.5 }, 
  { date: '2025-11-05', rtp: 94.5 }, 
  { date: '2025-11-07', rtp: 90.2 },
  { date: '2025-11-08', rtp: 93.0 },
  { date: '2025-11-10', rtp: 89.5 },
  { date: '2025-11-12', rtp: 92.0 },
];

const RTPTrendChart = () => {
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
        RTP % Trend
      </h3>
      
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>

            <linearGradient id="colorRtp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
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
            domain={[80, 100]} 
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
    </div>
  );
};

export default RTPTrendChart;