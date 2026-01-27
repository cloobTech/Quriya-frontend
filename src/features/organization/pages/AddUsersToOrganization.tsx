import appLogo from "@src/assets/app-logo.svg";
import { Button } from "@mantine/core";
import { AddUsersToAnOrganizationForm } from "@features/users";
import { useNavigate } from "react-router-dom";

const AddUsersToOrganization = () => {
  const organizationNavigate = useNavigate();
  return (
    <div className="relative h-dvh bg-gray-100 p-4">
      <div className="w-full flex justify-between  items-center mb-8">
        <img src={appLogo} alt="Omniqle Logo" className="h-6 w-auto " />
        <Button
          size="xs"
          className="gap-4"
          radius={"xl"}
          onClick={() => organizationNavigate("/organization/projects")}
        >
          Skip section
        </Button>
      </div>

      <AddUsersToAnOrganizationForm />
    </div>
  );
};

export default AddUsersToOrganization;
