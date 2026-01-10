import React, { useState, useMemo } from "react";
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

const RoundExplorer = () => {
  const [rounds] = useState(
    Array(15)
      .fill(null)
      .map((_, i) => ({
        roundId: `d29dbee5-ed53-42b2-a4e8-f888ff${i}9`,
        user: i % 2 === 0 ? "user88" : "player_ace",
        game: i % 3 === 0 ? "Blackjack" : i % 3 === 1 ? "Roulette" : "Slots",
        stake: (500 + i * 10).toFixed(2),
        payout: (600 + i * 12).toFixed(2),
        status: "Active",
        timestamp: "Nov 13, 2025, 05:32 AM",
        fxRate: "0.967",
        rngData: { seed: "3333a839", initial: "decd4", final: "5d736" },
      }))
  );

  const [selectedRound, setSelectedRound] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [gameFilter, setGameFilter] = useState("All Games");

  const gameOptions = useMemo(() => {
    const games = rounds.map((r) => r.game);
    return ["All Games", ...new Set(games)];
  }, [rounds]);

  const filteredRounds = useMemo(() => {
    return rounds.filter((round) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        round.roundId.toLowerCase().includes(searchLower) ||
        round.user.toLowerCase().includes(searchLower);

      const matchesGame =
        gameFilter === "All Games" || round.game === gameFilter;

      return matchesSearch && matchesGame;
    });
  }, [searchTerm, gameFilter, rounds]);

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

    const tableRows = filteredRounds.map((round) => [
      round.roundId,
      round.user,
      round.game,
      `$${round.stake}`,
      `$${round.payout}`,
      round.status,
      round.timestamp,
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
    doc.text(`Round ID: ${round.roundId}`, 14, 35);
    doc.text(`User: ${round.user}`, 14, 42);
    doc.text(`Stake: $${round.stake}`, 14, 49);
    doc.save(`Round_${round.roundId}.pdf`);
  };

  return (
    <div className="bg-[#0b1221] p-6 rounded-2xl text-white font-sans min-h-screen">
      {/* Search & Filter Header */}
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
            <select
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value)}
              className="bg-[#161f30] border border-gray-700 rounded-lg py-2 pl-9 pr-8 focus:outline-none focus:border-teal-500 text-sm appearance-none cursor-pointer text-gray-300"
            >
              {gameOptions.map((option) => (
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
      <div className="overflow-x-auto border bg-[#0a111a] border-gray-800 rounded-xl">
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
            {filteredRounds.length > 0 ? (
              filteredRounds.map((round, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#161f30] transition-colors"
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="rounded bg-gray-700 border-none"
                    />
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-200">
                    {round.roundId.slice(0, 15)}...
                  </td>
                  <td className="p-4 text-sm text-gray-400">{round.user}</td>
                  <td className="p-4 text-sm text-gray-300">{round.game}</td>
                  <td className="p-4 text-sm font-bold">${round.stake}</td>
                  <td className="p-4 text-sm font-bold">${round.payout}</td>
                  <td className="p-4">
                    <span className="bg-[#1a2d2d] text-[#2dd4bf] px-3 py-1 rounded text-[10px] font-bold border border-[#2dd4bf]/20">
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
              <tr>
                <td colSpan="8" className="p-10 text-center text-gray-500">
                  No rounds found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
                  <DetailItem label="Round ID" value={selectedRound.roundId} />
                  <DetailItem label="User" value={selectedRound.user} />
                  <DetailItem label="Game Type" value={selectedRound.game} />
                  <DetailItem
                    label="Timestamp"
                    value={selectedRound.timestamp}
                  />
                </div>
                <div className="space-y-5">
                  <h4 className="text-gray-300 font-medium text-base mb-4">
                    Financial Details
                  </h4>
                  <DetailItem label="Stake" value={`$${selectedRound.stake}`} />
                  <DetailItem
                    label="Payout"
                    value={`$${selectedRound.payout}`}
                  />
                  <div>
                    <p className="text-sm text-yellow-500 font-medium mb-1">
                      Status
                    </p>
                    <span className="bg-[#1a2d2d] text-[#2dd4bf] px-3 py-1 rounded-md text-[11px] font-bold border border-[#2dd4bf]/20 uppercase">
                      {selectedRound.status}
                    </span>
                  </div>
                  <DetailItem label="FX Rate" value={selectedRound.fxRate} />
                </div>
              </div>

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
