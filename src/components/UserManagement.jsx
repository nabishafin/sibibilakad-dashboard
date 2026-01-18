import React, { useState, useEffect } from "react";
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
import { useGetUsersQuery, useGetUserDetailsQuery, useGetUserGameLogsQuery } from "../redux/features/users/usersApi";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: usersData, isLoading, isFetching } = useGetUsersQuery({
    page,
    limit,
    search: debouncedSearch
  });

  const users = usersData?.data || [];
  const pagination = usersData?.pagination || {};

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
    ];

    const tableRows = users.map((u) => [
      u._id,
      u.username,
      u.email,
      `$${u.balance}`,
      u.type,
      u.status,
      new Date(u.createdAt).toLocaleDateString(),
      u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Never",
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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
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
        <div className="relative overflow-x-auto">
          {(isLoading || isFetching) && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
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
                <th className="p-4 font-semibold text-center">Type</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold">Last Login</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user._id}
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
                  <td className="p-4 text-sm font-bold">${user.balance?.toFixed(4)}</td>
                  <td className="p-4 text-sm text-gray-400 text-center">{user.type}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedUserId(user._id);
                        setActiveTab("Details");
                      }}
                      className="text-yellow-500 flex items-center gap-1 mx-auto text-sm font-bold hover:text-yellow-400 uppercase tracking-tighter"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !isLoading && (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
              {[5, 10, 20, 50].map((val) => (
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

      {/* --- MODAL SECTION --- */}
      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

const UserDetailModal = ({ userId, onClose, activeTab, setActiveTab }) => {
  const { data: userDetails, isLoading } = useGetUserDetailsQuery(userId);
  const user = userDetails?.data;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a111a] w-full max-w-[600px] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-20 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : user ? (
          <>
            <div className="p-5 flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {user.username}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                    Joined Date: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition"
              >
                <X className="w-5 h-5" />
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
              {activeTab === "Details" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="text-[12px] text-gray-400 font-bold uppercase mb-4 tracking-wider">
                    Account Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoBox label="Email" value={user.email} />
                    <InfoBox
                      label="Status"
                      value={user.status}
                      isStatus
                    />
                    <InfoBox
                      label="Balance"
                      value={`$${user.balance?.toFixed(4)}`}
                    />
                    <InfoBox
                      label="Total Wagered"
                      value={`$${user.totalWagered?.toFixed(2) || 0}`}
                    />
                    <InfoBox
                      label="User Role"
                      value={user.role}
                    />
                    <InfoBox
                      label="Total Won"
                      value={`$${user.totalWon?.toFixed(2) || 0}`}
                    />
                  </div>
                </div>
              )}

              {activeTab === "Login History" && (
                <div className="animate-in slide-in-from-right duration-300">
                  <div className="bg-[#1e293b] p-2 rounded-t-lg grid grid-cols-3 text-[10px] text-gray-400 font-bold mb-0.5 uppercase px-4">
                    <span>Date & Time</span>
                    <span className="text-center">IP Address</span>
                    <span className="text-right">Device</span>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {user.loginHistory && user.loginHistory.length > 0 ? (
                      user.loginHistory.map((login, idx) => (
                        <div key={idx} className="grid grid-cols-3 text-[11px] p-4 text-gray-300 bg-[#161f30] border-b border-gray-800 last:rounded-b-lg last:border-0">
                          <span>{new Date(login.date).toLocaleString()}</span>
                          <span className="text-center">{login.ip}</span>
                          <span className="text-right truncate" title={login.device}>{login.device.split(' ')[0]}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-xs">No login history</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "Game Logs" && (
                <GameLogsTab userId={userId} />
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
          </>
        ) : (
          <div className="p-20 text-center text-gray-500">Failed to load user details</div>
        )}
      </div>
    </div>
  );
};

const GameLogsTab = ({ userId }) => {
  const [page, setPage] = useState(1);
  const { data: logsResponse, isLoading } = useGetUserGameLogsQuery({ userId, page, limit: 10 });
  const logsData = logsResponse?.data;
  const history = logsData?.history || [];
  const stats = logsData?.stats;
  const pagination = logsData?.pagination || {};

  if (isLoading) return <div className="flex justify-center p-10"><div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="animate-in slide-in-from-right duration-300">
      {stats && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[#161f30] p-2 rounded-lg border border-gray-800 text-center">
            <p className="text-[9px] text-gray-500 uppercase font-bold">Total Played</p>
            <p className="text-xs font-bold text-white">{stats.totalGamesPlayed}</p>
          </div>
          <div className="bg-[#161f30] p-2 rounded-lg border border-gray-800 text-center">
            <p className="text-[9px] text-gray-500 uppercase font-bold">Total Staked</p>
            <p className="text-xs font-bold text-teal-400">{stats.totalStaked}</p>
          </div>
          <div className="bg-[#161f30] p-2 rounded-lg border border-gray-800 text-center">
            <p className="text-[9px] text-gray-500 uppercase font-bold">RTP</p>
            <p className="text-xs font-bold text-yellow-500">{stats.rtp}</p>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-800">
        <table className="w-full text-[10px] text-left">
          <thead className="bg-[#1e293b] text-gray-400 uppercase">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Game</th>
              <th className="p-2">Stake</th>
              <th className="p-2">Payout</th>
              <th className="p-2 text-center">Result</th>
              <th className="p-2 text-right">Net</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-[#161f30]">
            {history.map((log) => (
              <tr key={log.id} className="border-b border-gray-800/50">
                <td className="p-2 text-gray-400">{new Date(log.date).toLocaleDateString()}</td>
                <td className="p-2 font-medium">{log.game}</td>
                <td className="p-2 font-medium">${log.stake?.toFixed(4)}</td>
                <td className="p-2 font-medium">${log.payout?.toFixed(4)}</td>
                <td className={`p-2 text-center font-bold uppercase text-[9px] ${log.result.toLowerCase() === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                  {log.result}
                </td>
                <td className={`p-2 text-right font-medium ${log.net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${log.net?.toFixed(4)}
                </td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">No logs found</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination.totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4 items-center">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => p - 1)}
            className="p-1.5 border border-gray-700 rounded-md hover:bg-gray-800 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-[10px] text-gray-500 font-bold">
            {page} / {pagination.totalPages}
          </span>
          <button
            disabled={page >= pagination.totalPages}
            onClick={() => setPage(p => p + 1)}
            className="p-1.5 border border-gray-700 rounded-md hover:bg-gray-800 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
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
      <span className={`border px-2 py-0.5 rounded text-[9px] font-bold uppercase ${value === 'active' ? 'bg-[#1a2d2d] text-[#2dd4bf] border-[#2dd4bf]/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
        {value}
      </span>
    ) : (
      <p className="text-xs font-semibold text-gray-200 truncate">{value}</p>
    )}
  </div>
);

export default UserManagement;
