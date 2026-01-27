import { Button } from "@mantine/core";
import { BsArrowDownSquare } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

const ExportReportBar = ({ projectName }: { projectName: string }) => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  return (
    <div className=" text-dark flex items-center justify-between w-full bg-white p-3 rounded-xl font-bold text-lg ">
      <p>{name ?? projectName}</p>
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
