import React from 'react';

const RecentUsers = () => {

  const usersData = [
    { id: 1, username: "User 1", balance: "$9,031.87", date: "Oct 15, 2025, 09:24 AM", status: "Active" },
    { id: 2, username: "User 2", balance: "$9,031.87", date: "Oct 15, 2025, 09:24 AM", status: "Active" },
    { id: 3, username: "User 3", balance: "$9,031.87", date: "Oct 15, 2025, 09:24 AM", status: "Active" },
    { id: 4, username: "User 4", balance: "$9,031.87", date: "Oct 15, 2025, 09:24 AM", status: "Active" },
  ];

  return (
    <div className="bg-[#0a111a] p-6 rounded-[24px] text-white font-inter max-w-[800px] mx-auto my-5 shadow-2xl">
      <h3 className="text-lg font-medium mb-5 text-left">Recent Users</h3>
      
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-[1.2fr_1fr_2fr_1fr] bg-[#1f2937] px-5 py-3 rounded-2xl mb-2.5">
          <div className="text-[#9ca3af] text-sm font-medium text-center">Username</div>
          <div className="text-[#9ca3af] text-sm font-medium text-center">Balance</div>
          <div className="text-[#9ca3af] text-sm font-medium text-center">Stake</div>
          <div className="text-[#9ca3af] text-sm font-medium text-center">Outcome</div>
        </div>

        {/* Table Body (Map items) */}
        {usersData.map((user) => (
          <div key={user.id} className="grid grid-cols-[1.2fr_1fr_2fr_1fr] px-5 py-4 border-b border-[#1e293b] items-center last:border-none">
            <div className="text-sm text-[#e5e7eb] text-center">{user.username}</div>
            <div className="text-sm text-[#e5e7eb] text-center">{user.balance}</div>
            <div className="text-sm text-[#e5e7eb] text-center">{user.date}</div>
            <div className="flex justify-center">
              <div className="bg-[#1f2937] border border-[#374151] rounded-xl px-3 py-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                <span className="text-[#10b981] text-[13px] font-semibold">{user.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;