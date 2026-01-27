import React from "react";
import { Button, Badge } from "@mantine/core";
import { BsPlus } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import {
  useModal,
  useAppSelector,
  RenderListItems,
  timeLeft,
} from "@features/shared";
import CreateNewProject from "../forms/CreateNewProject";
import { useGetProjectsQuery } from "../services/api";
import { useNavigate } from "react-router-dom";

const ElectionProject = ({
  id,
  name,
  status,
  election_date: electionDate,
}: {
  name: string;
  status: string;
  id: string;
  election_date: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-between bg-white rounded-2xl cursor-pointer w-full hover:bg-gray-50 p-3"
      onClick={() => navigate(`${id}/dashboard?name=${name}`)}
    >
      <div className="flex flex-col">
        <p className="font-semibold text-sm text-gray-700">{name}</p>
        <Badge
          tt={"none"}
          radius={"xl"}
          size="xs"
          variant="light"
          color={status === "draft" ? "blue" : "green"}
        >
          {timeLeft({ endTime: new Date(electionDate) })}
        </Badge>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <p>Monitor</p>
        <FaAngleRight />
      </div>
    </div>
  );
};

const ElectionProjects: React.FC = () => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );
  const { data } = useGetProjectsQuery({ organizationId });

  const projects = data?.projects ?? [];

  const { showModal } = useModal();

  const show = () => {
    showModal(<CreateNewProject />, {
      centered: true,
      radius: "lg",
      padding: 0,
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
          {
            <RenderListItems
              data={projects}
              renderItem={(items: {
                name: string;
                status: string;
                id: string;
                election_date: string;
              }) => <ElectionProject {...items} key={items.id} />}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default ElectionProjects;
