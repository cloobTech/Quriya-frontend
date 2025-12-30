import React from "react";
// import { GenericStatCard, RenderListItems } from "@features/shared";
import { GenericStatCard } from "@features/shared";
import { BsPeople } from "react-icons/bs";

const StatsCards: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-6 ">
      <GenericStatCard
        title="Total Agents"
        iconBgColor="text-blue-500"
        value={1500}
        description="3,000"
        badge={[
          { text: "1,000 Active", color: "blue" },
          { text: "200 Inactive", color: "gray" },
        ]}
        icon={<BsPeople size={12} />}
      />
      <GenericStatCard
        title="Total Agents"
        iconBgColor="text-blue-500"
        value={1500}
        description="3,000"
        badge={[
          { text: "1,000 Active", color: "blue" },
          { text: "200 Inactive", color: "gray" },
        ]}
        icon={<BsPeople size={12} />}
      />
      <GenericStatCard
        title="Total Agents"
        iconBgColor="text-blue-500"
        value={1500}
        description="3,000"
        badge={[
          { text: "1,000 Active", color: "blue" },
          { text: "200 Inactive", color: "gray" },
        ]}
        icon={<BsPeople size={12} />}
      />
      <GenericStatCard
        title="Total Agents"
        iconBgColor="text-blue-500"
        value={1500}
        description="3,000"
        badge={[
          { text: "1,000 Active", color: "blue" },
          { text: "200 Inactive", color: "gray" },
        ]}
        icon={<BsPeople size={12} />}
      />
    </div>
  );
};

export default StatsCards;
