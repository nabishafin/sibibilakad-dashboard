import React, { useState } from 'react';
import { Users, Wallet, TrendingUp, BarChart3, RotateCw } from 'lucide-react';

const OverviewSection = () => {

  const [stats, setStats] = useState([
    {
      id: 1,
      title: 'Total Users',
      value: '1,247',
      change: '+12%',
      icon: <Users size={20} />,
    },
    {
      id: 2,
      title: 'Aggregate Balance',
      value: '$2,450,000',
      change: '+12%',
      icon: <Wallet size={20} />,
    },
    {
      id: 3,
      title: 'Return to Player (RTP) %',
      value: '67.74%',
      change: '+12%',
      icon: <TrendingUp size={20} />,
    },
    {
      id: 4,
      title: 'House Edge %',
      value: '67.74%',
      change: '+12%',
      icon: <BarChart3 size={20} />,
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);


  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      const updatedStats = stats.map(stat => ({
        ...stat,

        value: stat.title.includes('%') 
          ? (Math.random() * 100).toFixed(2) + '%' 
          : stat.title.includes('$') 
            ? '$' + (Math.floor(Math.random() * 5000000)).toLocaleString()
            : (Math.floor(Math.random() * 5000)).toLocaleString()
      }));
      
      setStats(updatedStats);
      setIsRefreshing(false);
    }, 800); 
  };

  return (
    <div className=" p-8 text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-[#0a111a] border border-gray-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
        >
          <RotateCw size={18} className={`${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#0a111a] border border-gray-800 p-6 rounded-[24px] hover:border-gray-700 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-medium">{item.title}</span>
              <div className="text-gray-500 group-hover:text-yellow-500 transition-colors">
                {item.icon}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-3xl font-bold tracking-tight">
                {item.value}
              </h3>
              <p className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                <span className="text-[14px]">↑</span> {item.change} 
                <span className="text-gray-500 ml-1 italic font-normal text-[10px]">from last month</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;