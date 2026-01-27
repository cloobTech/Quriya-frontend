import React from "react";
import { Button, TextInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { BsCalendar2Event } from "react-icons/bs";
import { useCreateProjectMutation } from "../services/api";
import {
  useAppSelector,
  showApiError,
  ElectionType,
  useModal,
} from "@features/shared";
import type { NewProject } from "../types";

const electionTypeOptions = Object.entries(ElectionType).map(
  ([key, value]) => ({
    value, // The value for the select option
    label: key
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  })
);

const CreateNewProject: React.FC = () => {
  const { hideModal } = useModal();
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const form = useForm({
    initialValues: {
      name: "",
      electionDate: null,
      electionType: null,
    },
    validateInputOnBlur: true,

    validate: {
      name: (value) => (value ? null : "Kindly input a project name"),
      electionDate: (value) => (value ? null : "Enter election date"),
      electionType: (value) => (value ? null : "Select an election type role"),
    },
  });

  const handleSubmit = async (values: NewProject) => {
    try {
      const x = await createProject({ organizationId, data: values }).unwrap();
      console.log(x);
      form.reset();
      form.setFieldValue("electionType", null);
      notifications.show({
        position: "top-right",
        title: "Success",
        message: "Users added successfully",
        color: "green",
      });
    } catch (err: any) {
      showApiError(err.data || err);
    }
  };

  const validForm = form.isValid();

  return (
    <div className="p-4 bg-white">
      <p className="text-xl font-bold text-center">
        Create a new election project
      </p>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="min-w-[400px] grid gap-3"
      >
        <TextInput
          placeholder="Enter a name for your project"
          label="Name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <Select
          data={electionTypeOptions}
          placeholder="Select Election Type"
          label="Election Type"
          searchable
          key={form.key("electionType")}
          {...form.getInputProps("electionType")}
        />

        <DateInput
          valueFormat="YYYY MMM DD"
          label="Election date"
          placeholder="select election start date"
          rightSection={<BsCalendar2Event />}
          minDate={new Date()}
          key={form.key("electionDate")}
          {...form.getInputProps("electionDate")}
        />
        <div className="grid gap-4 mt-8">
          <Button
            size="sm"
            fw="bold"
            radius={"md"}
            variant="light"
            onClick={hideModal}
          >
            Cancel
          </Button>
          <Button
            loading={isLoading}
            disabled={!validForm || isLoading}
            loaderProps={{ type: "dots", size: "md" }}
            size="sm"
            fw="bold"
            radius={"md"}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewProject;
