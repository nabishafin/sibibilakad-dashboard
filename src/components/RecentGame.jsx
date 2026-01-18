

import React, { useState } from "react";
import { Eye, X, Download, UserCircle } from "lucide-react";
import { useGetGameRoundsQuery } from "../redux/features/stats/statsApi";
import { useGetUserDetailsQuery, useGetUserGameLogsQuery } from "../redux/features/users/usersApi";


const InfoBox = ({ label, value, isStatus }) => (
  <div className="bg-[#111827] p-3 rounded-xl border border-gray-800/50">
    <p className="text-[#d4a017] text-[10px] font-bold uppercase mb-1 tracking-tight">
      {label}
    </p>
    {isStatus ? (
      <span className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase ${value === 'active' ? 'bg-green-900/20 text-green-500 border-green-900/50' : 'bg-red-900/20 text-red-500 border-red-900/50'
        }`}>
        {value || "Unknown"}
      </span>
    ) : (
      <p className="text-white text-[12px] font-bold truncate">{value}</p>
    )}
  </div>
);

const RecentGame = () => {
  const [page, setPage] = useState(1);
  const { data: roundsResponse, isLoading } = useGetGameRoundsQuery({ page, limit: 10 });
  const roundsData = roundsResponse?.data || [];
  const totalRounds = roundsResponse?.pagination?.totalItems || 0;
  const totalPages = roundsResponse?.pagination?.totalPages || 1;


  const handlePrevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  const [isRoundModalOpen, setIsRoundModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");

  // Fetch User Details
  const { data: userDetailsRes, isFetching: isUserFetching } = useGetUserDetailsQuery(selectedRound?.userId || selectedRound?.username, {
    skip: !isProfileModalOpen || (!selectedRound?.userId && !selectedRound?.username)
  });
  const userDetails = userDetailsRes?.data;

  // Fetch User Game Logs
  const userIdToFetchLogs = userDetails?._id || selectedRound?.userId;
  const { data: userLogsRes, isFetching: isLogsFetching } = useGetUserGameLogsQuery({ userId: userIdToFetchLogs, page: 1, limit: 20 }, {
    skip: !isProfileModalOpen || !userIdToFetchLogs || activeTab !== "Game Logs"
  });
  const userLogs = userLogsRes?.data?.history || [];


  const handleExport = (data) => {
    const fileName = `round-${data.roundId}.json`;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetails = (round) => {
    setSelectedRound(round);
    setIsRoundModalOpen(true);
  };

  const handleOpenProfile = () => {
    setIsRoundModalOpen(false);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="bg-[#0a111a] p-6 m-10 rounded-xl border border-gray-800 shadow-lg font-sans text-left">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-semibold">
          Recent Game Rounds
        </h2>
        <div className="text-gray-400 text-sm">
          Total Rounds: {totalRounds}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1e293b] text-gray-400 text-sm uppercase">
              <th className="p-4 rounded-l-lg">

              </th>
              <th className="p-4 font-medium">Round ID</th>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Game</th>
              <th className="p-4 font-medium">Stake</th>
              <th className="p-4 font-medium">Payout</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Timestamp</th>
              <th className="p-4 font-medium rounded-r-lg text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-300 divide-y divide-gray-800">
            {isLoading ? (
              <tr><td colSpan="9" className="p-4 text-center">Loading...</td></tr>
            ) : roundsData.length > 0 ? (
              roundsData.map((round) => (
                <tr
                  key={round.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-4">

                  </td>
                  <td className="p-4 font-bold text-white truncate max-w-[120px]" title={round.id}>
                    {round.id?.slice(0, 10)}...
                  </td>
                  <td className="p-4 font-bold text-white">{round.username}</td>
                  <td className="p-4 font-bold text-white">{round.game}</td>
                  <td className="p-4 font-bold text-white">${round.stake?.toFixed(4)}</td>
                  <td className="p-4 font-bold text-white">${round.payout?.toFixed(4)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold border ${round.status === 'Win' ? 'bg-[#1e293b] text-[#4ade80] border-gray-700' : 'bg-red-900/20 text-red-500 border-red-900/50'}`}>
                      {round.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-white">
                    {new Date(round.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleViewDetails(round)}
                      className="flex items-center justify-center gap-2 text-[#d4a017] hover:text-yellow-400 font-bold mx-auto"
                    >
                      <Eye size={18} /> <span>View</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" className="p-4 text-center">No rounds found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <div>
          Page {page} of {totalPages || 1}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-3 py-1 bg-[#1e293b] rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className="px-3 py-1 bg-[#1e293b] rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* --- Round Details Modal --- */}
      {isRoundModalOpen && selectedRound && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-800 p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-medium">Round Details</h3>
              <button
                onClick={() => setIsRoundModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-[#1c2533] rounded-xl p-6 border border-gray-700/50 grid grid-cols-2 gap-y-6 gap-x-12 mb-6 text-left">
              <div className="space-y-6">
                <h4 className="text-gray-300 font-semibold mb-2">
                  Basic Information
                </h4>
                <div>
                  <p className="text-[#d4a017] text-sm mb-1">Round ID</p>
                  <p className="text-gray-300 text-sm break-all">
                    {selectedRound.id}
                  </p>
                </div>
                <div>
                  <p className="text-[#d4a017] text-sm mb-1">User</p>
                  <p className="text-gray-300 text-sm">{selectedRound.username}</p>
                </div>
                <div>
                  <p className="text-[#d4a017] text-sm mb-1">Game Type</p>
                  <p className="text-gray-300 text-sm">{selectedRound.game}</p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-gray-300 font-semibold mb-2">
                  Financial Details
                </h4>
                <div>
                  <p className="text-[#d4a017] text-sm mb-1">Stake</p>
                  <p className="text-gray-300 text-sm">{selectedRound.stake}</p>
                </div>
                <div>
                  <p className="text-[#d4a017] text-sm mb-1">Payout</p>
                  <p className="text-gray-300 text-sm">
                    {selectedRound.payout}
                  </p>
                </div>
                <div>
                  <p className="text-[#d4a017] text-sm mb-1">Status</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${selectedRound.status === 'Win' ? 'bg-[#1e293b] text-[#4ade80] border-gray-700' : 'bg-red-900/20 text-red-500 border-red-900/50'}`}>
                    {selectedRound.status}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="bg-[#111827] rounded-xl p-4 border border-gray-800 mb-6 text-left">
              <h4 className="text-gray-300 font-semibold mb-4">RNG Data</h4>
              <div className="bg-[#0a111a] rounded-lg p-4 space-y-2 border border-gray-800 text-xs">
                <p>
                  <span className="text-[#d4a017]">Seed:</span>{" "}
                  <span className="text-gray-300 font-mono">
                    {selectedRound.seed}
                  </span>
                </p>
                <p>
                  <span className="text-[#d4a017]">Initial State:</span>{" "}
                  <span className="text-gray-300 font-mono">
                    {selectedRound.initialState}
                  </span>
                </p>
                <p>
                  <span className="text-[#d4a017]">Final State:</span>{" "}
                  <span className="text-gray-300 font-mono">
                    {selectedRound.finalState}
                  </span>
                </p>
              </div>
            </div> */}

            <div className="flex gap-4">
              <button
                onClick={() => handleExport(selectedRound)}
                className="flex items-center gap-2 bg-[#337a7a] text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Download size={18} /> Export Details
              </button>
              <button
                onClick={handleOpenProfile}
                className="flex items-center gap-2 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <UserCircle size={18} /> View User Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- User Profile Modal --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a111a] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
            <div className="p-4 bg-[#111827] flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                  {(userDetails?.username || "U").charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm">
                    {userDetails?.username || "Loading..."}
                  </h3>
                  <p className="text-gray-500 text-[10px]">
                    Joined Date: {userDetails?.createdAt ? new Date(userDetails.createdAt).toLocaleDateString() : '...'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex px-5 gap-6 mt-5 text-[11px] font-bold uppercase border-b border-gray-800">
              {["Details", "Login History", "Game Logs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 transition-all relative ${activeTab === tab
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-400"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-5 min-h-[250px]">
              {isUserFetching ? (
                <div className="text-center text-gray-400">Loading user details...</div>
              ) : !userDetails ? (
                <div className="text-center text-gray-400">User details not available.</div>
              ) : activeTab === "Details" ? (
                <div className="animate-in fade-in duration-300 text-left">
                  <h4 className="text-[12px] text-gray-400 font-bold uppercase mb-4 tracking-wider">
                    Account Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoBox label="Email" value={userDetails.email} />
                    <InfoBox label="Status" value={userDetails.status} isStatus />
                    <InfoBox
                      label="Balance"
                      value={typeof userDetails.balance === 'number' ? userDetails.balance.toFixed(4) : userDetails.balance}
                    />
                    <InfoBox
                      label="Total Wagered"
                      value={typeof userDetails.totalWagered === 'number' ? userDetails.totalWagered.toFixed(4) : userDetails.totalWagered}
                    />
                    <InfoBox label="User Type" value={userDetails.role} />
                    <InfoBox
                      label="Total Won"
                      value={typeof userDetails.totalWon === 'number' ? userDetails.totalWon.toFixed(4) : userDetails.totalWon}
                    />
                  </div>
                </div>
              ) : activeTab === "Login History" ? (
                <div className="animate-in slide-in-from-right duration-300">
                  <div className="bg-[#1e293b] p-2 rounded-t-lg flex justify-between text-[10px] text-gray-400 font-bold uppercase px-4">
                    <span>Date & Time</span>
                    <span>IP Address</span>
                    <span>Device</span>
                  </div>
                  {userDetails?.loginHistory?.map((log, index) => (
                    <div key={index} className="flex justify-between items-center text-[11px] p-4 text-gray-300 bg-[#161f30] border-b border-gray-800 first:rounded-t-none last:rounded-b-lg gap-4">
                      <span className="whitespace-nowrap">{new Date(log.date).toLocaleString()}</span>
                      <span className="whitespace-nowrap">{log.ip}</span>
                      <span className="truncate max-w-[150px]" title={log.device}>{log.device}</span>
                    </div>
                  ))}
                  {(!userDetails?.loginHistory || userDetails.loginHistory.length === 0) && (
                    <div className="p-4 text-center text-gray-400 text-xs">No login history found.</div>
                  )}
                </div>
              ) : activeTab === "Game Logs" ? (
                <div className="animate-in slide-in-from-right duration-300 overflow-hidden rounded-lg border border-gray-800">
                  {isLogsFetching ? (
                    <div className="p-4 text-center text-gray-400">Loading logs...</div>
                  ) : (
                    <table className="w-full text-[10px] text-left">
                      <thead className="bg-[#1e293b] text-gray-400 uppercase font-bold">
                        <tr>
                          <th className="p-2 pl-4">Date</th>
                          <th className="p-2">Game</th>
                          <th className="p-2 text-center">Result</th>
                          <th className="p-2">Stake</th>
                          <th className="p-2">Payout</th>
                          <th className="p-2 text-right pr-4">Net</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800 bg-[#161f30]">
                        {userLogs.length > 0 ? userLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-800/30">
                            <td className="p-2 pl-4 text-gray-400">{new Date(log.date).toLocaleDateString()}</td>
                            <td className="p-2 text-gray-400">{log.game}</td>
                            <td className={`p-2 text-center font-bold ${log.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>
                              {log.result}
                            </td>
                            <td className="p-2 text-gray-400">{typeof log.stake === 'number' ? log.stake.toFixed(4) : log.stake}</td>
                            <td className="p-2 text-gray-400">{typeof log.payout === 'number' ? log.payout.toFixed(4) : log.payout}</td>
                            <td className="p-2 text-right pr-4 text-gray-200 font-medium">
                              {typeof log.net === 'number' ? log.net.toFixed(4) : log.net}
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="6" className="p-4 text-center text-gray-400">No game logs found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              ) : null}
            </div>

            <div className="p-5 bg-[#0a111a] border-t border-gray-800 flex gap-3">
              <button className="flex-1 bg-[#d4a017] text-black font-bold py-2 rounded-lg text-xs uppercase transition-all">
                Adjust Balance
              </button>
              <button className="flex-1 bg-[#ef4444] text-white font-bold py-2 rounded-lg text-xs uppercase transition-all">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentGame;
