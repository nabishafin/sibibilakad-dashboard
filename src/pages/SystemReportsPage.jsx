import React, { useState } from "react";
import SystemReports from "../components/SystemReports";
import ReportPreview from "../components/ReportPreview";

const SystemReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("User Report");

  return (
    <div>
      <SystemReports
        selectedReport={selectedReport}
        setSelectedReport={setSelectedReport}
      />
      <ReportPreview selectedReport={selectedReport} />
    </div>
  );
};

export default SystemReportsPage;
