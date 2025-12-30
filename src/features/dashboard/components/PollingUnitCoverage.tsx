import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { Button } from "@mantine/core";

const PollingUnitCoverage: React.FC = () => {
  return (
    <div className="grid gap-4 p-3 bg-white rounded-2xl ">
      <div className="flex justify-between items-center">
        <p className="text-dark text-lg font-bold">Polling Unit Coverage</p>
        <Button
          radius="xl"
          size="xs"
          variant="light"
          leftSection={<BsArrowRepeat size={16} />}
        >
          Refresh Data
        </Button>
      </div>
      <div className="h-[300px] bg-gray-100 rounded-xl p-2">map image here</div>
      <div>
        <p>map markers go here...</p>
      </div>
    </div>
  );
};

export default PollingUnitCoverage;
