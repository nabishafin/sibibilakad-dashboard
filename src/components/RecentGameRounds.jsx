import React from 'react';

const RecentGameRounds = () => {

  const gameData = [
    { id: 1, user: "User", game: "Spin Wheel", stake: "$50", outcome: "Win" },
    { id: 2, user: "User", game: "Scratch Card", stake: "$50", outcome: "Loss" },
    { id: 3, user: "User", game: "Spin Wheel", stake: "$50", outcome: "Win" },
    { id: 4, user: "User", game: "Scratch Card", stake: "$50", outcome: "Loss" },
  ];

  return (
    <div className="bg-[#0a111a] p-7 rounded-2xl text-white font-sans max-w-[800px] mx-auto my-5 shadow-xl">
      <h3 className="text-lg mb-6 font-medium">Recent Game Rounds</h3>
      
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr] bg-[#1e293b] p-3 rounded-xl mb-2 text-center">
          <span className="text-sm text-[#94a3b8] font-medium">User</span>
          <span className="text-sm text-[#94a3b8] font-medium">Game</span>
          <span className="text-sm text-[#94a3b8] font-medium">Stake</span>
          <span className="text-sm text-[#94a3b8] font-medium">Outcome</span>
        </div>

        {/* Table Body */}
        {gameData.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_1.5fr_1fr_1fr] p-4 text-center items-center border-b border-[#1e293b] last:border-none">
            <div className="text-sm text-[#e2e8f0]">{row.user}</div>
            
            <div className="flex justify-center">
              <span className="bg-[#1e293b] px-4 py-1.5 rounded-full text-[13px] border border-[#334155]">
                {row.game}
              </span>
            </div>
            
            <div className="text-sm text-[#e2e8f0]">{row.stake}</div>
            
            <div className="flex justify-center">
              <span className={`
                bg-[#1e293b] px-4 py-1.5 rounded-full text-[13px] font-semibold capitalize border min-w-[70px]
                ${row.outcome === 'Win' 
                  ? 'text-emerald-500 border-emerald-500/20' 
                  : 'text-red-500 border-red-500/20'}
              `}>
                {row.outcome}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentGameRounds;