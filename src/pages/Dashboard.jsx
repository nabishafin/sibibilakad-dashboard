import React from "react";
import OverviewSection from "../components/OverviewSection";
import WageredVsWinnings from "../components/WageredVsWinnings";
import RTPTrendChart from "../components/RTPTrendChart";

import RecentGame from "../components/RecentGame";

const Dashboard = () => {
  return (
    <div>
      <OverviewSection />
      <div className="grid grid-cols-2 gap-2 m-8">
        <div>
          <WageredVsWinnings />
        </div>
        <div>
          <RTPTrendChart />
        </div>
      </div>
      <RecentGame />
    </div>
  );
};

export default Dashboard;
