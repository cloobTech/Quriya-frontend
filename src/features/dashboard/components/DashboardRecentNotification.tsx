import React from "react";
import { BsArrowRepeat, BsDot, BsBoxArrowUpRight } from "react-icons/bs";
import { Button, Badge, Avatar } from "@mantine/core";

const Notification = () => {
  return (
    <div className="snap border-b border-gray-200 py-2 px-4 flex items-center justify-between hover:bg-gray-50 rounded-md">
      <div className="flex items-center gap-3">
        <Avatar size="lg" radius="xl" className="mr-2" />
        <p className="text-sm grid gap-1">
          <span className="font-semibold text-dark">John Doe</span>
          <span className="text-gray-500 text-xs">ward 7, unit 001</span>
          <Badge
            tt={"none"}
            radius={"xl"}
            size="xs"
            variant="light"
            color="green"
          >
            uploaded results
          </Badge>
        </p>
      </div>
      <small className="text-gray-500">5 minutes ago</small>
    </div>
  );
};

const DashboardRecentNotification: React.FC = () => {
  return (
    <div className="grid gap-4 p-4 bg-white rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-4">
          <div>
            <p className="text-dark text-lg font-bold">Recent Activities</p>
            <p className="text-gray-500 text-xs">
              Last Updated : <span className=" text-gray-800"> 6:17:45 PM</span>
            </p>
          </div>
          <span className="flex items-center text-accent font-semibold text-xs gap-1">
            <BsDot size={24} className="mr-[-8px]" />
            Live Data
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            radius="xl"
            size="xs"
            variant="light"
            leftSection={<BsArrowRepeat size={16} />}
          >
            Refresh Data
          </Button>
          <Button
            radius="xl"
            size="xs"
            leftSection={<BsBoxArrowUpRight size={16} />}
          >
            View All
          </Button>
        </div>
      </div>
      {/* List of updates */}
      <div>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  );
};

export default DashboardRecentNotification;
