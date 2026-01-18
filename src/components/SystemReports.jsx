// import React, { useState } from "react";
// import { FileText, Filter, Calendar } from "lucide-react";

// const SystemReports = () => {

//   const formatDate = (date) => date.toISOString().split("T")[0];

//   const today = new Date();
//   const lastWeek = new Date();
//   lastWeek.setDate(today.getDate() - 7);

//   const [selectedReport, setSelectedReport] = useState("User Report");
//   const [startDate, setStartDate] = useState(formatDate(lastWeek));
//   const [endDate, setEndDate] = useState(formatDate(today));

//   const reportTypes = [
//     {
//       id: 1,
//       title: "User Report",
//       description: "Export user details, balances, and activity metrics",
//       color: "text-yellow-500",
//     },
//     {
//       id: 2,
//       title: "Game Rounds Report",
//       description:
//         "Export game round data with stake, payout, and outcome details",
//       color: "text-teal-500",
//     },
//     {
//       id: 3,
//       title: "Financial Report",
//       description:
//         "Export financial metrics including deposits, withdrawals, and adjustments",
//       color: "text-yellow-500",
//     },
//     {
//       id: 4,
//       title: "Platform Report",
//       description:
//         "Export platform performance metrics including RTP and edge percentages",
//       color: "text-teal-500",
//     },
//   ];

//   return (
//     <div className=" p-8 text-white  font-sans">
//       {/* Header Section */}
//       <div className="">
//         <h2 className="text-2xl font-bold">System Reports</h2>
//         <p className="text-gray-400 text-sm mt-1">
//           Generate and export system data for analysis and audit
//         </p>
//       </div>

//       {/* Main Container */}
//       <div className="border border-gray-800 rounded-xl p-6 bg-[#0a111a]">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           {reportTypes.map((report) => (
//             <div
//               key={report.id}
//               onClick={() => setSelectedReport(report.title)}
//               className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center h-full
//                 ${
//                   selectedReport === report.title
//                     ? "border-yellow-500 bg-[#121d2b]"
//                     : "border-gray-800 hover:border-gray-600 bg-transparent"
//                 }`}
//             >
//               <FileText
//                 size={48}
//                 className={`mb-4 ${report.color}`}
//                 strokeWidth={1.5}
//               />
//               <h3 className="font-bold text-lg mb-2">{report.title}</h3>
//               <p className="text-gray-400 text-xs leading-relaxed">
//                 {report.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-3 w-full md:w-auto">

//             <div className="relative flex-1 group">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="bg-[#121d2b] border border-gray-700 rounded-md py-2 px-4 pr-10 text-sm w-full focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer"
//               />
//               <Calendar
//                 className="absolute right-3 top-2.5 text-gray-500 pointer-events-none group-focus-within:text-yellow-500"
//                 size={16}
//               />
//             </div>

//             <span className="text-gray-500 text-sm font-medium">to</span>

//             <div className="relative flex-1 group">
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="bg-[#121d2b] border border-gray-700 rounded-md py-2 px-4 pr-10 text-sm w-full focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer"
//               />
//               <Calendar
//                 className="absolute right-3 top-2.5 text-gray-500 pointer-events-none group-focus-within:text-yellow-500"
//                 size={16}
//               />
//             </div>
//           </div>

//           <button className="flex items-center gap-2 bg-[#121d2b] hover:bg-[#1a293d] border border-gray-800 py-2 px-6 rounded-md text-sm font-medium transition-colors w-full md:w-auto justify-center">
//             <Filter size={18} />
//             Configure Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SystemReports;

import React, { useState, forwardRef } from "react";
import { FileText, Filter, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// --- Move CustomInput outside the component ---
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="bg-[#121d2b] gap-2 border border-gray-700 rounded-md py-2 px-4 pr-10 text-sm w-full cursor-pointer flex  justify-between"
  >
    <span>{value}</span>
    <Calendar className="text-gray-500" size={16} />
  </div>
));

const SystemReports = ({ selectedReport, setSelectedReport }) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState(lastWeek);
  const [endDate, setEndDate] = useState(today);

  const reportTypes = [
    {
      id: 1,
      title: "User Report",
      description: "Export user details, balances, and activity metrics",
      color: "text-yellow-500",
    },
    {
      id: 2,
      title: "Game Rounds Report",
      description:
        "Export game round data with stake, payout, and outcome details",
      color: "text-teal-500",
    },
    {
      id: 3,
      title: "Financial Report",
      description:
        "Export financial metrics including deposits, withdrawals, and adjustments",
      color: "text-yellow-500",
    },
    {
      id: 4,
      title: "Performance Report",
      description:
        "Export platform performance metrics including RTP and edge percentages",
      color: "text-teal-500",
    },
  ];

  return (
    <div className="p-8 text-white font-sans">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold">System Reports</h2>
        <p className="text-gray-400 text-sm mt-1">
          Generate and export system data for analysis and audit
        </p>
      </div>

      {/* Main Container */}
      <div className="border border-gray-800 rounded-xl mt-10 p-6 bg-[#0a111a]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.title)}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center h-full
                ${selectedReport === report.title
                  ? "border-yellow-500 bg-[#121d2b]"
                  : "border-gray-800 hover:border-gray-600 bg-transparent"
                }`}
            >
              <FileText
                size={48}
                className={`mb-4 ${report.color}`}
                strokeWidth={1.5}
              />
              <h3 className="font-bold text-lg mb-2">{report.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                {report.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Start Date */}
            <div className="flex-1 ">
              <DatePicker
                className=""
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                customInput={<CustomInput />}
              />
            </div>

            <span className="text-gray-500 text-sm font-medium">to</span>

            {/* End Date */}
            <div className="flex-1">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                customInput={<CustomInput />}
              />
            </div>
          </div>

          <button className="flex items-center gap-2 bg-[#121d2b] hover:bg-[#1a293d] border border-gray-800 py-2 px-6 rounded-md text-sm font-medium transition-colors w-full md:w-auto justify-center">
            <Filter size={18} />
            Configure Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemReports;
