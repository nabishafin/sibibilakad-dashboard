import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  Eye,
  X,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetGameRoundsQuery } from "../redux/features/stats/statsApi";

const RoundExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedRound, setSelectedRound] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: roundsResponse, isLoading, isFetching } = useGetGameRoundsQuery({
    page,
    limit,
    search: debouncedSearch,
    status: statusFilter === "All Status" ? "" : statusFilter
  });

  const rounds = roundsResponse?.data || [];
  const pagination = roundsResponse?.pagination || {};

  const handleExportAll = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(16);
    doc.text("Round Explorer Report", 14, 15);

    const tableColumn = [
      "Round ID",
      "User",
      "Game",
      "Stake",
      "Payout",
      "Status",
      "Timestamp",
    ];

    const tableRows = rounds.map((round) => [
      round.id,
      round.username,
      round.game,
      `$${round.stake}`,
      `$${round.payout}`,
      round.status,
      new Date(round.createdAt).toLocaleString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      headStyles: { fillColor: [45, 212, 191] },
    });

    doc.save("Round_Explorer_Report.pdf");
  };

  const exportSingleRound = (round) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Round Details Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Round ID: ${round.id}`, 14, 35);
    doc.text(`User: ${round.username}`, 14, 42);
    doc.text(`Stake: $${round.stake}`, 14, 49);
    doc.text(`Payout: $${round.payout}`, 14, 56);
    doc.text(`Game: ${round.game}`, 14, 63);
    doc.text(`Status: ${round.status}`, 14, 70);
    doc.text(`Date: ${new Date(round.createdAt).toLocaleString()}`, 14, 77);
    doc.save(`Round_${round.id}.pdf`);
  };

  return (
    <div className="bg-[#0b1221] p-6 rounded-2xl text-white font-sans min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Round Explorer</h1>
        <p className="text-gray-400 text-sm">Inspect game rounds and related data</p>
      </div>
      <div className="bg-[#0a111a] border border-gray-800 p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by User or Round ID"
              className="w-full bg-[#161f30] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-teal-500 text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-[#161f30] border border-gray-700 rounded-lg py-2 pl-9 pr-8 focus:outline-none focus:border-teal-500 text-sm appearance-none cursor-pointer text-gray-300"
            >
              {["All Status", "Win", "Loss"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleExportAll}
          className="bg-[#2dd4bf] text-[#0b1221] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#28c0ad] transition"
        >
          <Download className="w-4 h-4" /> Export All
        </button>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto border bg-[#0a111a] border-gray-800 rounded-xl relative">
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1e293b] text-gray-400 text-[12px] font-medium uppercase tracking-wider">
            <tr>
              <th className="p-4 w-12 text-center">
                <input
                  type="checkbox"
                  className="rounded bg-gray-700 border-none"
                />
              </th>
              <th className="p-4">Round ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Game</th>
              <th className="p-4">Stake</th>
              <th className="p-4">Payout</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rounds.length > 0 ? (
              rounds.map((round, index) => (
                <tr
                  key={round.id}
                  className="hover:bg-[#161f30] transition-colors"
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="rounded bg-gray-700 border-none"
                    />
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-200" title={round.id}>
                    {round.id.slice(0, 15)}...
                  </td>
                  <td className="p-4 text-sm text-gray-400">{round.username}</td>
                  <td className="p-4 text-sm text-gray-300">{round.game}</td>
                  <td className="p-4 text-sm font-bold">${round.stake?.toFixed(4)}</td>
                  <td className="p-4 text-sm font-bold">${round.payout?.toFixed(4)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded text-[10px] font-bold border ${round.status === 'Win' ? 'bg-[#1a2d2d] text-[#2dd4bf] border-[#2dd4bf]/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                      {round.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedRound(round)}
                      className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1 text-[12px] font-bold uppercase mx-auto"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !isLoading && (
                <tr>
                  <td colSpan="8" className="p-10 text-center text-gray-500">
                    No rounds found matching your filters.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="p-4 flex items-center justify-end gap-6 border-t border-gray-800 text-sm text-gray-400">
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
              disabled={page >= pagination.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {selectedRound && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] w-full max-w-[600px] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-5 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Round Details</h3>
              <button
                onClick={() => setSelectedRound(null)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 pt-0 space-y-4">
              <div className="bg-[#1e2533] rounded-xl p-6 grid grid-cols-2 gap-8 border border-gray-800">
                <div className="space-y-5">
                  <h4 className="text-gray-300 font-medium text-base mb-4">
                    Basic Information
                  </h4>
                  <DetailItem label="Round ID" value={selectedRound.id} />
                  <DetailItem label="User" value={selectedRound.username} />
                  <DetailItem label="Game Type" value={selectedRound.game} />
                  <DetailItem
                    label="Timestamp"
                    value={new Date(selectedRound.createdAt).toLocaleString()}
                  />
                </div>
                <div className="space-y-5">
                  <h4 className="text-gray-300 font-medium text-base mb-4">
                    Financial Details
                  </h4>
                  <DetailItem label="Stake" value={`$${selectedRound.stake?.toFixed(4)}`} />
                  <DetailItem
                    label="Payout"
                    value={`$${selectedRound.payout?.toFixed(4)}`}
                  />
                  <div>
                    <p className="text-sm text-yellow-500 font-medium mb-1">
                      Status
                    </p>
                    <span className={`px-3 py-1 rounded-md text-[11px] font-bold border uppercase ${selectedRound.status === 'Win' ? 'bg-[#1a2d2d] text-[#2dd4bf] border-[#2dd4bf]/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {selectedRound.status}
                    </span>
                  </div>
                  {selectedRound.fxRate && <DetailItem label="FX Rate" value={selectedRound.fxRate} />}
                </div>
              </div>

              {selectedRound.rngData && (
                <div className="bg-[#1e2533] rounded-xl p-6 border border-gray-800">
                  <h4 className="text-gray-300 font-medium text-base mb-4">
                    RNG Data
                  </h4>
                  <div className="bg-[#0b1221] p-4 rounded-lg space-y-3 font-mono">
                    <p className="text-sm">
                      <span className="text-yellow-500">Seed:</span>{" "}
                      <span className="text-gray-300 ml-1">
                        {selectedRound.rngData.seed}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="text-yellow-500">Initial State:</span>{" "}
                      <span className="text-gray-300 ml-1">
                        {selectedRound.rngData.initial}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="text-yellow-500">Final State:</span>{" "}
                      <span className="text-gray-300 ml-1">
                        {selectedRound.rngData.final}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => exportSingleRound(selectedRound)}
                  className="bg-[#2a7a7a] hover:bg-[#328a8a] text-white flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  <Download className="w-4 h-4" /> Export Details
                </button>
                <button className="bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition">
                  <User className="w-4 h-4" /> View User Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="max-w-full overflow-hidden">
    <p className="text-sm text-yellow-500 font-medium mb-1">{label}</p>
    <p className="text-sm text-gray-200 break-all leading-tight">{value}</p>
  </div>
);

export default RoundExplorer;
