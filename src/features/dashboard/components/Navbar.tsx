import React from "react";
import { Avatar, TextInput } from "@mantine/core";
import { BsSearch } from "react-icons/bs";
import { useGetCurrentUserQuery } from "@features/users";
import { useAppSelector } from "@features/shared";

const Navbar: React.FC = () => {
  const { organizationId } = useAppSelector((state) => state.organization);

  const { data: currentUser } = useGetCurrentUserQuery({
    organizationId: organizationId || "",
  });

  return (
    <nav className="grid gap-2 sm:flex justify-between items-center py-4 px-6">
      <div className="gap-2 sm:flex justify-between items-center w-full ">
        <div>
          <TextInput
            leftSection={<BsSearch />}
            placeholder="search agent, polling units.."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Avatar src={""} alt="it's me" size="md" />

          <div className="grid items-center ">
            <p className="text-sm">{currentUser?.user?.full_name}</p>
            <small className="text-xs text-gray-500">
              {currentUser?.user?.email}
            </small>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
