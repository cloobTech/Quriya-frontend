import { useParams } from "react-router-dom";
import { useAgentStatsQuery } from "@features/members";
import { useAppSelector } from "@features/shared";

const StatCard = ({
  title,
  value,
  optional,
}: {
  title: string;
  value: number;
  optional?: string;
}) => {
  return (
    <div className="bg-white rounded-xl grid p-3 gap-3">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-semibold text-dark">
        {value > 0 ? value : "-"}
        {optional && ` ${optional}`}
      </p>
    </div>
  );
};

const StatCards = () => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );
  const { projectId } = useParams();

  const { data } = useAgentStatsQuery({
    organizationId: organizationId!,
    projectId: projectId!,
  });

  return (
    <div className="grid grid-cols-2 gap-6">
      <StatCard title="Total Agents" value={data?.statistics?.total_agents} />
      <StatCard title="Active Agents" value={data?.statistics?.active_agents} />
      <StatCard
        title="Assigned Polling Units"
        value={data?.statistics?.total_pus_in_project}
        optional={`/ ${data?.statistics?.total_pus_assigned ?? "-"}`}
      />
      <StatCard
        title="Unassigned Agents"
        value={data?.statistics?.idle_agents}
      />
    </div>
  );
};

export default StatCards;
