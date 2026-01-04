import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  User,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RoundExplorer = () => {

  const [rounds] = useState([
    {
      roundId: "d29dbee5",
      user: "user88",
      game: "Blackjack",
      stake: 573.28,
      payout: 697.0,
      status: "Active",
      timestamp: "Nov 13, 2025, 05:32 AM",
      fxRate: "0.967",
      rngData: { seed: "3333a839", initial: "decd4", final: "5d736" },
    },
    {
      roundId: "d29dbee5",
      user: "user88",
      game: "Blackjack",
      stake: 573.28,
      payout: 697.0,
      status: "Active",
      timestamp: "Nov 13, 2025, 05:32 AM",
      fxRate: "0.967",
      rngData: { seed: "3333a839", initial: "decd4", final: "5d736" },
    },
    {
      roundId: "d29dbee5",
      user: "user88",
      game: "Blackjack",
      stake: 573.28,
      payout: 697.0,
      status: "Active",
      timestamp: "Nov 13, 2025, 05:32 AM",
      fxRate: "0.967",
      rngData: { seed: "3333a839", initial: "decd4", final: "5d736" },
    },
    {
      roundId: "d29dbee5",
      user: "user88",
      game: "Blackjack",
      stake: 573.28,
      payout: 697.0,
      status: "Active",
      timestamp: "Nov 13, 2025, 05:32 AM",
      fxRate: "0.967",
      rngData: { seed: "3333a839", initial: "decd4", final: "5d736" },
    },
    // আরও ডাটা...
  ]);

  const [selectedRound, setSelectedRound] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");


  const exportRoundDetails = (round) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Round Details Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Round ID: ${round.roundId}`, 14, 30);
    doc.text(`User: ${round.user}`, 14, 37);
    doc.text(`Game: ${round.game}`, 14, 44);
    doc.text(`Stake: $${round.stake}`, 14, 51);
    doc.text(`Payout: $${round.payout}`, 14, 58);
    doc.save(`Round_${round.roundId}.pdf`);
  };

  return (
    <div className="bg-[#0b1221] p-6 rounded-2xl text-white font-sans min-h-screen">
      {/* Table Header Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by User or Round ID"
            className="w-full bg-[#161f30] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-teal-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/20 px-4 py-2 rounded-lg text-sm font-medium">
            <Download className="w-4 h-4" /> Export All
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto border border-gray-800 rounded-xl bg-[#0b1221]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1e293b] text-gray-300 text-[11px] uppercase font-bold tracking-wider">
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
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rounds.map((round, index) => (
              <tr key={index} className="hover:bg-[#161f30] transition-colors">
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    className="rounded bg-gray-700 border-none"
                  />
                </td>
                <td className="p-4 text-sm font-bold text-gray-200 truncate max-w-[120px]">
                  {round.roundId}
                </td>
                <td className="p-4 text-sm text-gray-400">{round.user}</td>
                <td className="p-4 text-sm text-gray-300">{round.game}</td>
                <td className="p-4 text-sm font-bold">${round.stake}</td>
                <td className="p-4 text-sm font-bold">${round.payout}</td>
                <td className="p-4 text-center">
                  <span className="bg-[#1a2d2d] border border-[#2dd4bf]/20 text-[#2dd4bf] px-3 py-1 rounded-lg text-[10px] font-bold uppercase">
                    {round.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedRound(round)} 
                    className="text-yellow-500 hover:text-yellow-400 text-[10px] font-bold uppercase flex items-center gap-1 mx-auto"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ROUND DETAILS MODAL (Exact Image Design) --- */}
      {selectedRound && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2533] w-full max-w-[550px] rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">
                Round Details
              </h3>
              <button
                onClick={() => setSelectedRound(null)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {/* Basic Info Column */}
                <div className="space-y-4">
                  <h4 className="text-gray-300 font-medium text-sm">
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

                {/* Financial Details Column */}
                <div className="space-y-4">
                  <h4 className="text-gray-300 font-medium text-sm">
                    Financial Details
                  </h4>
                  <DetailItem label="Stake" value={`$${selectedRound.stake}`} />
                  <DetailItem
                    label="Payout"
                    value={`$${selectedRound.payout}`}
                  />
                  <div>
                    <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider mb-1">
                      Status
                    </p>
                    <span className="bg-[#1a2d2d] text-[#2dd4bf] border border-[#2dd4bf]/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                      {selectedRound.status}
                    </span>
                  </div>
                  <DetailItem label="FX Rate" value={selectedRound.fxRate} />
                </div>
              </div>

              {/* RNG Data Section */}
              <div className="bg-[#0b1221] border border-gray-800 p-5 rounded-xl shadow-inner">
                <h4 className="text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-4">
                  RNG Data
                </h4>
                <div className="space-y-2 font-mono">
                  <p className="text-xs">
                    <span className="text-yellow-500 font-bold">Seed:</span>{" "}
                    <span className="text-gray-300 ml-2">
                      {selectedRound.rngData.seed}
                    </span>
                  </p>
                  <p className="text-xs">
                    <span className="text-yellow-500 font-bold">
                      Initial State:
                    </span>{" "}
                    <span className="text-gray-300 ml-2">
                      {selectedRound.rngData.initial}
                    </span>
                  </p>
                  <p className="text-xs">
                    <span className="text-yellow-500 font-bold">
                      Final State:
                    </span>{" "}
                    <span className="text-gray-300 ml-2">
                      {selectedRound.rngData.final}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => exportRoundDetails(selectedRound)}
                className="bg-[#236e6e] hover:bg-[#2a7a7a] text-white flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-lg"
              >
                <Download className="w-4 h-4" /> Export Details
              </button>
              <button className="bg-[#161f30] border border-gray-700 hover:border-gray-500 text-gray-300 flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition">
                <User className="w-4 h-4" /> View User Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-yellow-500/80 font-bold uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="text-xs text-gray-200 font-medium break-all">{value}</p>
  </div>
);

export default RoundExplorer;
