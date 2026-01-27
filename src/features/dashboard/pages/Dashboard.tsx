import React from "react";
import ExportReportBar from "../components/ExportReportBar";
import StatsCards from "../components/StatsCards";
import PollingUnitCoverage from "../components/PollingUnitCoverage";
import DashboardCharts from "../components/DashboardCharts";
import DashboardRecentNotification from "../components/DashboardRecentNotification";
import { useGetProjectQuery } from "@features/projects";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@features/shared";

const Dashboard: React.FC = () => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );

  const projectId = useParams().projectId;
  

  const { data } = useGetProjectQuery({
    organizationId: organizationId!,
    projectId: projectId!,
  });

  return (
    <div className="grid gap-8 text-sm">
      {/* Report Bar */}
      <ExportReportBar projectName={data?.project?.name} />
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
