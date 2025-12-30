import React from "react";
import { Avatar, TextInput } from "@mantine/core";
import { BsSearch } from "react-icons/bs";

const Navbar: React.FC = () => {
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
            <p className="text-sm">Admin User</p>
            <small className="text-xs text-gray-500">admin@quariya.com</small>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
