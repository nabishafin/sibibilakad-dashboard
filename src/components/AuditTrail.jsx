
import React, { useState, forwardRef } from "react";
import { Filter, Download, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAuditLogsQuery } from "../redux/features/reports/reportsApi";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="bg-[#121d2b] gap-3 border border-gray-700 rounded-md py-2 px-4 pr-10 text-sm w-full cursor-pointer flex  justify-between"
  >
    <span>{value}</span>
    <Calendar className="text-gray-500" size={16} />
  </div>
));

const AuditTrail = () => {
  const today = new Date();
  const lastFiveDays = new Date();
  lastFiveDays.setDate(today.getDate() - 5);

  const [startDate, setStartDate] = useState(lastFiveDays);
  const [endDate, setEndDate] = useState(today);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data: auditResponse, isLoading, isFetching } = useGetAuditLogsQuery({
    page,
    limit
  });

  const auditData = auditResponse?.data || [];
  const pagination = auditResponse?.pagination || {};

  const getActionColor = (type) => {
    if (type.includes("Balance")) return "text-red-400";
    if (type.includes("Login") || type.includes("Configuration")) return "text-blue-400";
    if (type.includes("Round Inspection")) return "text-orange-400";
    return "text-green-400";
  };

  return (
    <div className="mt-12 m-8 text-white font-sans min-h-[600px]">
      {/* Title */}
      <div className="mb-6 px-4">
        <h2 className="text-2xl font-bold">Audit Trail</h2>
        <p className="text-gray-400 text-sm">
          Track and review all admin actions for security and compliance
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-[#0a111a] p-4 rounded-xl border border-gray-800 mx-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 ">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomInput />}
            />
          </div>

          <span className="text-gray-500">to</span>

          <div className="flex-1 ">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomInput />}
            />
          </div>
        </div>

        <button className="flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors ml-auto">
          <Filter size={16} /> Configure Filters
        </button>
      </div>

      {/* Audit Table */}
      <div className="bg-[#0a111a] border border-gray-800 rounded-xl overflow-hidden mx-4 relative">
        {isFetching && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1e2733] text-gray-400 text-[11px] uppercase tracking-wider">
                <th className="px-6 py-4">
                  <input type="checkbox" className="accent-teal-500" />
                </th>
                <th className="px-4 py-4 font-bold">Timestamp</th>
                <th className="px-4 py-4 font-bold">Admin User</th>
                <th className="px-4 py-4 font-bold">Action Type</th>
                <th className="px-4 py-4 font-bold">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/50">
              {auditData.length > 0 ? (
                auditData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#121d2b] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input type="checkbox" className="accent-teal-500" />
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-300 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-teal-500">{item.adminName}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 ${getActionColor(item.actionType)}`}
                      >
                        {item.actionType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400">
                      {item.details}
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-gray-500 font-medium">
                      No audit logs found.
                    </td>
                  </tr>
                )
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
    </div>
  );
};

export default AuditTrail;
