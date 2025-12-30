import { Button, TextInput, Select, Avatar } from "@mantine/core";
import { BsFiletypeXlsx, BsX } from "react-icons/bs";
import { useModal } from "@features/shared";
import AddUsersToAnOrganizationViaImport from "./AddUsersToAnOrganizationViaImport";

const User = () => (
  <div className="text-xs flex items-center gap-3 border border-gray-100 rounded-full p-1">
    <Avatar src={""} alt="it's me" size="sm" />
    <div>
      <p className="font-semibold text-[10px]">John Doe</p>
      <small className="text-gray-500 text-[10px]">john@gmail.com</small>
    </div>
    <div className="cursor-pointer flex-1 flex justify-end">
      <BsX
        size={28}
        className="cursor-pointer"
      />
    </div>
  </div>
);
const AddUsersToAnOrganization = () => {
  const { showModal } = useModal();

  const addViaImport = () => {
    // clear form array
    showModal(<AddUsersToAnOrganizationViaImport />, {
      centered: true,
      radius: "lg",
    });
  };

  const newUsers = [1];
  return (
    <div className="flex items-start justify-center gap-8 px-8">
      <div className="w-[320px] bg-white rounded-2xl p-3 grid gap-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Invite Users</p>
          <Button
            leftSection={<BsFiletypeXlsx />}
            size="xs"
            radius={"md"}
            variant="light"
            onClick={addViaImport}
          >
            import
          </Button>
        </div>
        <form action="" className="grid gap-3">
          <TextInput
            size="xs"
            placeholder="Enter email address"
            label="Email address"
            type="email"
          />
          <TextInput
            size="xs"
            placeholder="Enter first name"
            label="First name"
          />
          <TextInput
            size="xs"
            placeholder="Enter last name"
            label="Last Address"
          />
          <Select
            size="xs"
            placeholder="Select role"
            label="Role"
            defaultValue={"staff"}
            // Please fetch from backend
            data={["Admin", "Staff"]}
          />
          <Button
            size="xs"
            radius={"md"}
            variant="light"
            fullWidth
            type="button"
          >
            Add User
          </Button>
        </form>
      </div>{" "}
      <div
        className={`${
          newUsers.length > 0 && "flex-1"
        } rounded-2xl bg-white p-3 grid gap-3`}
      >
        <div className="flex items-center justify-between">
          <p className="font-semibold">Users to add</p>
          <Button size="xs" radius={"md"} variant="light" type="button">
            Clear all
          </Button>
        </div>
        <div className=" grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
        </div>
        <div className="flex justify-end">
          <Button size="sm" radius={"md"} type="button">
            Save to database
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUsersToAnOrganization;
