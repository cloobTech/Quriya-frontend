import React from "react";
import { Button } from "@mantine/core";
import { BsPlus } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { useModal } from "@features/shared";
import CreateNewProject from "../forms/CreateNewProject";

const ElectionProject = () => (
  <div className="flex items-center justify-between bg-white rounded-2xl cursor-pointer w-full hover:bg-gray-50 p-3">
    <div className="flex flex-col">
      <p className="font-semibold text-sm text-gray-700">
        Kano State Gubernutorial Elections
      </p>
      <small className="text-xs text-green-800 rounded-full bg-green-300/50 rounded inline px-1 justify-self-start">
        0 days, 5 hours, 30 minutes, 56 seconds
      </small>
    </div>
    <div className="flex items-center gap-2 text-gray-600 text-sm">
      <p>Monitor</p>
      <FaAngleRight />
    </div>
  </div>
);

const ElectionProjects: React.FC = () => {
  const { showModal } = useModal();

  const show = () => {
    showModal(<CreateNewProject />, {
      centered: true,
      radius: "lg",
    });
  };

  return (
    <div className="flex flex-col justify-center mx-auto items-center p-4 gap-4">
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 w-[80%] md:w-[588px] mt-[70px]">
        <div className="flex flex-col">
          <p className="font-semibold text-sm">Create New</p>
          <small className="text-xs text-gray-500">
            Setup new election monitoring project
          </small>
        </div>
        <Button
          leftSection={<BsPlus size={16} />}
          size="xs"
          radius={"md"}
          onClick={show}
        >
          New project
        </Button>
      </div>
      <div className="bg-white w-[80%] md:w-[588px] rounded-2xl p-4">
        <h3 className="font-bold text-sm mb-4 px-2">Recent elections</h3>
        <div className="grid gap-2">
          <ElectionProject />
          <ElectionProject />
          <ElectionProject />
        </div>
      </div>
    </div>
  );
};

export default ElectionProjects;
