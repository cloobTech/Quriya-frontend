import React from "react";
import ExportReportBar from "../components/ExportReportBar";
import StatsCards from "../components/StatsCards";

import PollingUnitCoverage from "../components/PollingUnitCoverage";
import DashboardCharts from "../components/DashboardCharts";
import DashboardRecentNotification from "../components/DashboardRecentNotification";

const Dashboard: React.FC = () => {
  return (
    <div className="grid gap-8 text-sm">
      {/* Report Bar */}
      <ExportReportBar />
      {/* Stats Cards */}
      <StatsCards />
      {/* Polling Unit Coverage */}
      <PollingUnitCoverage />
      {/* Dashboard Charts */}
      <DashboardCharts />
      {/* Recent Notification */}
      <DashboardRecentNotification />
    </div>
  );
};

export default Dashboard;
