import { Button } from "@mantine/core";
import React from "react";
import { BsArrowDownSquare } from "react-icons/bs";

const ExportReportBar: React.FC = () => {
  return (
    <div className=" text-dark flex items-center justify-between w-full bg-white p-3 rounded-xl font-bold text-lg ">
      <p>Kano State Gubernatorial Election</p>
      <Button
        variant="light"
        size="xs"
        radius={"md"}
        leftSection={<BsArrowDownSquare />}
      >
        Export Report
      </Button>
    </div>
  );
};

export default ExportReportBar;
