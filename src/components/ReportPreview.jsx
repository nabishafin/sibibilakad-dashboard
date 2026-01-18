import React, { useState } from 'react';
import { RefreshCw, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetUserReportQuery, useGetFinancialReportQuery, useGetPerformanceReportQuery } from '../redux/features/reports/reportsApi';
import { useGetGameRoundsQuery } from '../redux/features/stats/statsApi';

const ReportPreview = ({ selectedReport }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const isUserReport = selectedReport === "User Report";
  const isGameRounds = selectedReport === "Game Rounds Report";
  const isFinancial = selectedReport === "Financial Report";
  const isPerformance = selectedReport === "Performance Report";

  // Reset page when report type changes
  React.useEffect(() => {
    setPage(1);
  }, [selectedReport]);

  const { data: userReportResponse, isFetching: isUserFetching } = useGetUserReportQuery({
    page,
    limit
  }, {
    skip: !isUserReport
  });

  const { data: gameRoundsResponse, isFetching: isGamesFetching } = useGetGameRoundsQuery({
    page,
    limit
  }, {
    skip: !isGameRounds
  });

  const { data: financialResponse, isFetching: isFinancialFetching } = useGetFinancialReportQuery({
    page,
    limit
  }, {
    skip: !isFinancial
  });

  const { data: performanceResponse, isFetching: isPerformanceFetching } = useGetPerformanceReportQuery({
    page,
    limit
  }, {
    skip: !isPerformance
  });

  const isFetching = isUserFetching || isGamesFetching || isFinancialFetching || isPerformanceFetching;

  const userReportData = userReportResponse?.data?.data || [];
  const userPagination = userReportResponse?.data?.pagination || {};

  const gameRoundsData = gameRoundsResponse?.data || [];
  const gamePagination = gameRoundsResponse?.pagination || {};

  const financialData = financialResponse?.data?.data || [];
  const financialPagination = financialResponse?.data?.pagination || {};

  const performanceData = performanceResponse?.data?.data || [];
  const performancePagination = performanceResponse?.data?.pagination || {};

  let displayData = [];
  let pagination = {};

  if (isUserReport) {
    displayData = userReportData;
    pagination = userPagination;
  } else if (isGameRounds) {
    displayData = gameRoundsData;
    pagination = gamePagination;
  } else if (isFinancial) {
    displayData = financialData;
    pagination = financialPagination;
  } else if (isPerformance) {
    displayData = performanceData;
    pagination = performancePagination;
  }

  const downloadCSV = () => {
    let headers = "";
    let rows = [];

    if (isGameRounds) {
      headers = "Round ID,User,Game,Stake,Payout,Status,Timestamp";
      rows = gameRoundsData.map(round =>
        `${round.id},${round.username},${round.game},${round.stake},${round.payout},${round.status},${new Date(round.createdAt).toLocaleString()}`
      );
    } else if (isFinancial) {
      headers = "Round ID,User,Game,Stake,Payout,Status,Last Login";
      rows = financialData.map(round =>
        `${round.roundId},${round.user},${round.game},${round.stake},${round.payout},${round.status},${new Date(round.lastLogin).toLocaleString()}`
      );
    } else if (isPerformance) {
      headers = "Date,RTP%,House Edge %,New User,Total wagered";
      rows = performanceData.map(data =>
        `${data.date},${data.rtp},${data.houseEdge},${data.newUsers},${data.totalWagered}`
      );
    } else {
      headers = "Username,Email,Balance,Total Wagered,Total Won,Status";
      rows = userReportData.map(user =>
        `${user.username},${user.email},${user.balance},${user.totalWagered},${user.totalWon},${user.status}`
      );
    }

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedReport.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0a111a] border border-gray-800 m-8 rounded-xl overflow-hidden relative min-h-[400px]">
      {isFetching && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white">Report Preview</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-[#121d2b] hover:bg-gray-800 border border-gray-700 py-2.5 px-6 rounded-lg text-sm font-medium transition-colors text-white"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-[#facc15] hover:bg-yellow-500 text-black py-2.5 px-6 rounded-lg text-sm font-bold transition-colors shadow-lg active:scale-95"
          >
            <Download size={18} />
            Generate & Download CSV
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto px-6 pb-6 mt-6">
        <table className="w-full text-left border-separate border-spacing-y-0">
          <thead>
            <tr className="bg-[#1f2937] text-gray-400 uppercase text-[11px] tracking-widest ">
              {isGameRounds || isFinancial ? (
                <>
                  <th className="px-6 py-4 rounded-l-xl font-bold">Round ID</th>
                  <th className="px-6 py-4 font-bold">User</th>
                  <th className="px-6 py-4 font-bold">Game</th>
                  <th className="px-6 py-4 font-bold">Stake</th>
                  <th className="px-6 py-4 font-bold">Payout</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">{isGameRounds ? "Timestamp" : "Last Login"}</th>
                  <th className="px-6 py-4 rounded-r-xl font-bold text-center">Actions</th>
                </>
              ) : isPerformance ? (
                <>
                  <th className="px-6 py-4 rounded-l-xl font-bold text-center">Date</th>
                  <th className="px-6 py-4 font-bold text-center">RTP%</th>
                  <th className="px-6 py-4 font-bold text-center">House Edge %</th>
                  <th className="px-6 py-4 font-bold text-center">New User</th>
                  <th className="px-6 py-4 rounded-r-xl font-bold text-center">Total wagered</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4 rounded-l-xl font-bold">Username</th>
                  <th className="px-6 py-4 font-bold">Email</th>
                  <th className="px-6 py-4 font-bold">Balance</th>
                  <th className="px-6 py-4 font-bold">Total Wagered</th>
                  <th className="px-6 py-4 font-bold">Total Won</th>
                  <th className="px-6 py-4 rounded-r-xl font-bold">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="text-sm">
            {displayData.map((row, index) => (
              <tr key={row.id || row.roundId || row.date || index} className="hover:bg-[#121d2b]/50 transition-all group border-b border-gray-800 font-medium">
                {isGameRounds || isFinancial ? (
                  <>
                    <td className="px-6 py-5 text-gray-400 border-b border-gray-800/50" title={row.id || row.roundId}>{(row.id || row.roundId)?.slice(0, 8)}...</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50">{row.username || row.user}</td>
                    <td className="px-6 py-5 text-gray-300 border-b border-gray-800/50">{row.game}</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50">${row.stake?.toFixed(4)}</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50">${row.payout?.toFixed(4)}</td>
                    <td className="px-6 py-5 border-b border-gray-800/50">
                      <span className={`bg-[#121d2b] border border-gray-800 text-[10px] font-bold px-3 py-1 rounded-md ring-1 ring-gray-700/50 ${row.status === 'Win' ? 'text-[#2dd4bf]' : 'text-red-500'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-400 border-b border-gray-800/50 text-xs">{new Date(row.createdAt || row.lastLogin).toLocaleString()}</td>
                    <td className="px-6 py-5 text-center border-b border-gray-800/50">
                      <button className="flex items-center gap-1 text-[#facc15] hover:text-yellow-400 transition-colors mx-auto font-bold text-xs uppercase tracking-tighter">
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </>
                ) : isPerformance ? (
                  <>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50 text-center">{row.date}</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50 text-center">{row.rtp}%</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50 text-center">{row.houseEdge}%</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50 text-center">{row.newUsers}</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50 text-center">${row.totalWagered?.toFixed(2)}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-5 text-white font-medium border-b border-gray-800/50">{row.username}</td>
                    <td className="px-6 py-5 text-gray-500 border-b border-gray-800/50">{row.email}</td>
                    <td className="px-6 py-5 text-white font-bold border-b border-gray-800/50">${row.balance?.toFixed(2)}</td>
                    <td className="px-6 py-5 text-gray-400 border-b border-gray-800/50">${row.totalWagered?.toFixed(2)}</td>
                    <td className="px-6 py-5 text-gray-400 border-b border-gray-800/50">${row.totalWon?.toFixed(2)}</td>
                    <td className="px-6 py-5 border-b border-gray-800/50">
                      <span className="bg-[#121d2b] border border-gray-800 text-[#2dd4bf] text-[10px] font-bold px-3 py-1 rounded-full ring-1 ring-[#2dd4bf]/20">
                        {row.status}
                      </span>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {displayData.length === 0 && !isFetching && (
              <tr>
                <td colSpan="10" className="p-20 text-center text-gray-500 font-medium">
                  No data available for this report.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {pagination?.totalPages > 1 && (
        <div className="px-6 py-4 flex items-center justify-end gap-6 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>Rows Per Page</span>
            <select
              className="bg-[#0b1221] border border-gray-700 rounded px-2 py-1 outline-none cursor-pointer"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              {[10, 20, 50, 100].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <span>Page {pagination.currentPage || 1} Of {pagination.totalPages || 1}</span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= (pagination.totalPages || 1)}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPreview;