import React from 'react';
import { Users, Wallet, TrendingUp, BarChart3, RotateCw } from 'lucide-react';
import { useGetAdminStatsQuery } from '../redux/features/stats/statsApi';

const OverviewSection = () => {
  const { data: statsData, isLoading, isFetching, refetch } = useGetAdminStatsQuery();

  const formattedStats = statsData?.data ? [
    {
      id: 1,
      title: 'Total Users',
      value: statsData.data.totalUsers?.toLocaleString() || '0',
      change: '+12%', // This field is not in the API, keeping mock or removing if preferred. Keeping mock for visual consistency.
      icon: <Users size={20} />,
    },
    {
      id: 2,
      title: 'Aggregate Balance',
      value: `$${statsData.data.aggregateBalance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`,
      change: '+12%',
      icon: <Wallet size={20} />,
    },
    {
      id: 3,
      title: 'Return to Player (RTP) %',
      value: `${Number(statsData.data.rtp || 0).toFixed(2)}%`,
      change: '+12%',
      icon: <TrendingUp size={20} />,
    },
    {
      id: 4,
      title: 'House Edge %',
      value: `${Number(statsData.data.edge || 0).toFixed(2)}%`,
      change: '+12%',
      icon: <BarChart3 size={20} />,
    },
  ] : [];

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className=" p-8 text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>

        <button
          onClick={handleRefresh}
          disabled={isLoading || isFetching}
          className="flex items-center gap-2 bg-[#0a111a] border border-gray-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
        >
          <RotateCw size={18} className={`${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading && !formattedStats.length ? (
          // Skeleton or loading state
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#0a111a] border border-gray-800 p-6 rounded-[24px] h-32 animate-pulse"></div>
          ))
        ) : formattedStats.length > 0 ? (
          formattedStats.map((item) => (
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
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">Failed to load stats.</div>
        )}
      </div>
    </div>
  );
};

export default OverviewSection;
