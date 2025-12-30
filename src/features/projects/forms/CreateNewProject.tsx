import React from "react";
import { Button, TextInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { BsCalendar2Event } from "react-icons/bs";

const CreateNewProject: React.FC = () => {
  return (
    <div className="">
      <p className="text-xl font-bold text-center">
        Create a new election project
      </p>
      <form action="" className="min-w-[400px] grid gap-3">
        <TextInput placeholder="Enter a name for your project" label="Name" />
        <Select
          data={[
            "Presidential",
            "Gubernutorial",
            "Senatorial",
            "Federal House of Assembly",
            "State House of Assembly",
            "Local Government",
            "Councillorship",
          ]}
          placeholder="Select Election Type"
          label="Election Type"
          searchable
        />

        <DateInput
          valueFormat="YYYY MMM DD"
          label="Election date"
          placeholder="select election date"
          rightSection={<BsCalendar2Event />}
          minDate={new Date()}
        />
        <div className="grid gap-4 mt-8">
          <Button
            size="sm" // default medium size
            fw="bold" // font-bold
            radius={"md"}
            variant="light"
          >
            Cancel
          </Button>
          <Button
            size="sm" // default medium size
            fw="bold" // font-bold
            radius={"md"}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewProject;
