import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const UserManagement = () => {
  const [users] = useState([
    {
      id: 1,
      username: "User 1",
      email: "user1@example.com",
      balance: "50",
      type: "Regular",
      status: "Active",
      lastLogin: "15 Dec 2025, 10:00 pm",
      joinedDate: "11/14/2025",
      totalWagered: "22,749.70",
      totalWon: "25,497.06",
    },
    {
      id: 2,
      username: "User 2",
      email: "user2@example.com",
      balance: "120",
      type: "Regular",
      status: "Active",
      lastLogin: "15 Dec 2025, 11:00 pm",
      joinedDate: "11/15/2025",
      totalWagered: "5,000.00",
      totalWon: "4,200.00",
    },
    {
      id: 4,
      username: "user4",
      email: "user4@example.com",
      balance: "2,797.02",
      type: "Inactive",
      status: "Active",
      lastLogin: "15 Dec 2025, 11:28 pm",
      joinedDate: "11/14/2025",
      totalWagered: "22,749.70",
      totalWon: "25,497.06",
    },
    {
      id: 4,
      username: "user4",
      email: "user4@example.com",
      balance: "2,797.02",
      type: "Inactive",
      status: "Active",
      lastLogin: "15 Dec 2025, 11:28 pm",
      joinedDate: "11/14/2025",
      totalWagered: "22,749.70",
      totalWon: "25,497.06",
    },
    {
      id: 4,
      username: "user4",
      email: "user4@example.com",
      balance: "2,797.02",
      type: "Inactive",
      status: "Active",
      lastLogin: "15 Dec 2025, 11:28 pm",
      joinedDate: "11/14/2025",
      totalWagered: "22,749.70",
      totalWon: "25,497.06",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(16);
    doc.text("Complete User Management Report", 14, 15);

    const tableColumn = [
      "ID",
      "Username",
      "Email",
      "Balance",
      "Type",
      "Status",
      "Joined Date",
      "Last Login",
      "Total Wagered",
      "Total Won",
    ];

    const tableRows = filteredUsers.map((u) => [
      u.id,
      u.username,
      u.email,
      `$${u.balance}`,
      u.type,
      u.status,
      u.joinedDate,
      u.lastLogin,
      `$${u.totalWagered}`,
      `$${u.totalWon}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      headStyles: { fillColor: [45, 212, 191] },
    });

    doc.save("Full_User_Data.pdf");
  };

  return (
    <div className="bg-[#0b1221] p-8 text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-400 text-sm">Search and manage user accounts</p>
      </div>

      <div className="bg-[#0a111a] border border-gray-800 p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by username or email"
            className="w-full bg-[#0E1624] border border-gray-700 rounded-lg py-2.5 pl-12 pr-4 text-gray-300 focus:outline-none focus:border-teal-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#0E1624] border border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-[#2dd4bf] text-[#0b1221] px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#28c0ad] transition"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#0a111a]">
        <table className="w-full text-left">
          <thead className="bg-[#1f2937] text-gray-400 text-sm">
            <tr>
              <th className="p-4 w-12">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-transparent"
                />
              </th>
              <th className="p-4 font-semibold">Username</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Balance</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Last Login</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-800/40 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-transparent"
                  />
                </td>
                <td className="p-4 text-sm font-medium">{user.username}</td>
                <td className="p-4 text-sm text-gray-400">{user.email}</td>
                <td className="p-4 text-sm font-bold">${user.balance}</td>
                <td className="p-4 text-sm text-gray-400">{user.type}</td>
                <td className="p-4">
                  <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase">
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">{user.lastLogin}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setActiveTab("Details");
                    }}
                    className="text-yellow-500 flex items-center gap-1 mx-auto text-sm font-bold hover:text-yellow-400 uppercase tracking-tighter"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 flex items-center justify-end gap-6 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>Rows Per Page</span>
            <div className="bg-[#0b1221] border border-gray-700 rounded px-2 py-1 flex items-center gap-4 cursor-pointer">
              05 <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <span>Page 01 Of 07</span>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL SECTION --- */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1221] w-full max-w-[600px] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {selectedUser.username}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                    Joined Date: {selectedUser.joinedDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 p-4">
              <InfoBox label="Email" value={selectedUser.email} />
              <InfoBox label="Status" value={selectedUser.status} isStatus />
              <InfoBox label="Balance" value={`$${selectedUser.balance}`} />
              <InfoBox
                label="Total Wagered"
                value={`$${selectedUser.totalWagered}`}
              />
              <InfoBox label="User Type" value={selectedUser.type} />
              <InfoBox label="Total Won" value={`$${selectedUser.totalWon}`} />
            </div>

            {/* Tabs */}
            <div className="flex px-5 gap-6 text-[11px] font-bold uppercase border-b border-gray-800">
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

            {/* Tab Content */}
            <div className="p-5 min-h-[250px]">
              {activeTab === "Details" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="text-[12px] text-gray-400 font-bold uppercase mb-4 tracking-wider">
                    Account Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoBox label="Email" value={selectedUser.email} />
                    <InfoBox
                      label="Status"
                      value={selectedUser.status}
                      isStatus
                    />
                    <InfoBox
                      label="Balance"
                      value={`$${selectedUser.balance}`}
                    />
                    <InfoBox
                      label="Total Wagered"
                      value={`$${selectedUser.totalWagered}`}
                    />
                  </div>
                </div>
              )}

              {activeTab === "Login History" && (
                <div className="animate-in slide-in-from-right duration-300">
                  <div className="bg-[#1e293b] p-2 rounded-t-lg flex justify-between text-[10px] text-gray-400 font-bold mb-0.5 uppercase px-4">
                    <span>Date & Time</span>
                    <span>IP Address</span>
                    <span>Device</span>
                  </div>
                  <div className="flex justify-between text-[11px] p-4 text-gray-300 bg-[#161f30] rounded-b-lg border border-gray-800">
                    <span>Nov 15, 2025, 11:28 PM</span>
                    <span>192.168.1.1</span>
                    <span>Chrome / Windows</span>
                  </div>
                </div>
              )}

              {activeTab === "Game Logs" && (
                <div className="animate-in slide-in-from-right duration-300 overflow-hidden rounded-lg border border-gray-800">
                  <table className="w-full text-[10px] text-left">
                    <thead className="bg-[#1e293b] text-gray-400 uppercase">
                      <tr>
                        <th className="p-2">Date</th>
                        <th className="p-2">Game</th>
                        <th className="p-2 text-center">Result</th>
                        <th className="p-2 text-right">Net</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 bg-[#161f30]">
                      <tr className="border-b border-gray-800/50">
                        <td className="p-2 text-gray-400">12/04/17</td>
                        <td className="p-2 font-medium">Scratch Card</td>
                        <td className="p-2 text-center text-green-400 font-bold">
                          Win
                        </td>
                        <td className="p-2 text-right text-gray-200">$50</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-400">8/30/14</td>
                        <td className="p-2 font-medium">Spin Wheel</td>
                        <td className="p-2 text-center text-red-400 font-bold">
                          Loss
                        </td>
                        <td className="p-2 text-right text-gray-200">$50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>


            <div className="p-4 flex gap-3 border-t border-gray-800 bg-[#0f172a]">
              <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-[#0b1221] text-xs font-bold py-2.5 rounded-lg transition uppercase">
                Adjust Balance
              </button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2.5 rounded-lg transition uppercase">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoBox = ({ label, value, isStatus }) => (
  <div className="bg-[#161f30] p-3 rounded-xl border border-gray-800">
    <p className="text-[10px] text-yellow-500/80 mb-1 font-bold uppercase tracking-wider">
      {label}
    </p>
    {isStatus ? (
      <span className="bg-[#1a2d2d] text-[#2dd4bf] border border-[#2dd4bf]/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
        {value}
      </span>
    ) : (
      <p className="text-xs font-semibold text-gray-200 truncate">{value}</p>
    )}
  </div>
);

export default UserManagement;
