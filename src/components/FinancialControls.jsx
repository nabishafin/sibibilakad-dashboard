import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const FinancialControls = () => {
  // ডাইনামিক ইউজার ডাটা
  const [users] = useState([
    { id: 1, username: "user1", email: "user1@example.com", balance: 9031.87 },
    { id: 2, username: "user2", email: "user2@example.com", balance: 1500.00 },
    { id: 3, username: "user3", email: "user3@example.com", balance: 2797.02 },
    { id: 4, username: "user4", email: "user4@example.com", balance: 50.00 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [adjustmentType, setAdjustmentType] = useState("credit");
  const [amount, setAmount] = useState("00.0");
  const [reason, setReason] = useState("");

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0b1221] p-8 rounded-2xl text-white font-sans min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Financial Controls</h2>
        <p className="text-gray-400 text-sm">Manage user balances and perform manual adjustments</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Select User List */}
        <div className="w-full lg:w-[350px] bg-[#0b1221] border border-gray-800 rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-semibold mb-4">Select User</h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by username or email"
              className="w-full bg-[#fef3d7] text-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  selectedUser?.id === user.id
                    ? "bg-[#1e293b] border-gray-600 shadow-inner"
                    : "bg-[#161f30] border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-gray-200">{user.username}</h4>
                    <p className="text-[10px] text-gray-500">{user.email}</p>
                    <p className="text-[11px] text-yellow-500 font-bold mt-1">
                      Balance: ${user.balance.toLocaleString()}
                    </p>
                  </div>
                  {selectedUser?.id === user.id && (
                    <div className="w-2 h-8 bg-gray-400 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Balance Adjustment Form */}
        <div className="flex-1 bg-[#161f30]/30 border border-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-lg font-medium mb-6">Balance Adjustment</h3>
          
          <div className="space-y-6">
            {/* Selected User Info Box */}
            <div>
              <p className="text-xs text-gray-400 mb-2 font-medium">Selected User:</p>
              <div className="bg-[#161f30] border border-gray-800 p-5 rounded-xl">
                <h4 className="font-bold text-lg text-gray-200">{selectedUser?.username}</h4>
                <p className="text-xs text-gray-500">{selectedUser?.email}</p>
                <p className="text-sm text-yellow-500 font-bold mt-1">
                  Balance: ${selectedUser?.balance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Adjustment Type Radio Buttons */}
            <div>
              <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">Adjustment Type</p>
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    adjustmentType === 'credit' ? 'border-[#2dd4bf]' : 'border-gray-600'
                  }`}>
                    {adjustmentType === 'credit' && <div className="w-2.5 h-2.5 bg-[#2dd4bf] rounded-full" />}
                  </div>
                  <input 
                    type="radio" className="hidden" 
                    onChange={() => setAdjustmentType('credit')} 
                    checked={adjustmentType === 'credit'} 
                  />
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white">Credit (Add Funds)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    adjustmentType === 'debit' ? 'border-[#2dd4bf]' : 'border-gray-600'
                  }`}>
                    {adjustmentType === 'debit' && <div className="w-2.5 h-2.5 bg-[#2dd4bf] rounded-full" />}
                  </div>
                  <input 
                    type="radio" className="hidden" 
                    onChange={() => setAdjustmentType('debit')} 
                    checked={adjustmentType === 'debit'} 
                  />
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white">Debit (Remove Funds)</span>
                </label>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <p className="text-xs text-gray-400 mb-2 font-medium">Amount</p>
              <input
                type="text"
                className="w-full bg-[#161f30] border border-gray-800 rounded-xl py-4 px-5 text-xl font-bold focus:outline-none focus:border-gray-600 text-gray-300"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Reason Selection */}
            <div className="relative">
              <p className="text-xs text-gray-400 mb-2 font-medium">Reason for Adjustment</p>
              <div className="relative">
                <select 
                  className="w-full bg-[#161f30] border border-gray-800 rounded-xl py-4 px-5 appearance-none focus:outline-none focus:border-gray-600 text-gray-400 cursor-pointer text-sm"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Select a reason...</option>
                  <option value="bonus">Promotion Bonus</option>
                  <option value="correction">Error Correction</option>
                  <option value="referral">Referral Reward</option>
                </select>
                <ChevronDown className="absolute right-5 top-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-[#1e293b] hover:bg-[#253347] text-gray-300 font-bold py-3.5 rounded-xl transition text-sm">
                Cancel
              </button>
              <button className="flex-1 bg-[#236e6e] hover:bg-[#2a7a7a] text-white font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-[#236e6e]/20">
                {adjustmentType === 'credit' ? 'Credit Account' : 'Debit Account'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default FinancialControls;