import { useState } from "react";
import { Button, TextInput, Select, Avatar } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { BsFiletypeXlsx, BsX } from "react-icons/bs";
import { useModal, useAppSelector, showApiError } from "@features/shared";
import AddUsersToAnOrganizationViaImport from "./AddUsersToAnOrganizationViaImport";
import type { NewUser } from "@features/users/types";
import { useAddUserToOragnizationMutation } from "../services/api";

const User = ({ user, onRemove }: { user: NewUser; onRemove: () => void }) => (
  <div className="text-xs flex items-center gap-3 border border-gray-100 rounded-full p-1">
    <Avatar size="sm" />
    <div>
      <p className="font-semibold text-[10px]">
        {user.firstName} {user.lastName}
      </p>
      <small className="text-gray-500 text-[10px]">{user.email}</small>
    </div>
    <div className="flex-1 flex justify-end">
      <BsX size={28} className="cursor-pointer" onClick={onRemove} />
    </div>
  </div>
);

const AddUsersToAnOrganization = () => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );
  const [addUserToOragnization, { isLoading }] =
    useAddUserToOragnizationMutation();
  const [users, setUsers] = useState<NewUser[]>([]);
  const { showModal } = useModal();

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: null,
    },
    validateInputOnBlur: true,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: (value) => (value ? null : "Enter first name"),
      lastName: (value) => (value ? null : "Enter last name"),
      role: (value) => (value ? null : "Select role"),
    },
  });

  const handleSubmit = (values: NewUser) => {
    setUsers((prev) => [...prev, values]);

    form.setFieldValue("role", null);
    form.reset();
  };

  const addViaImport = () => {
    setUsers([]);
    showModal(<AddUsersToAnOrganizationViaImport />, {
      centered: true,
      radius: "lg",
      padding: "0",
    });
  };

  const saveNewUsersToDb = async () => {
    try {
      await addUserToOragnization({
        organizationId,
        data: users,
      }).unwrap();

      notifications.show({
        position: "top-right",
        title: "Success",
        message: "Users added successfully",
        color: "green",
      });
      setUsers([]);
    } catch (err: any) {
      showApiError(err.data || err);
    }
  };

  const validForm = form.isValid();

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
        <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-3">
          <TextInput
            size="xs"
            placeholder="Enter email address"
            label="Email address"
            type="email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            size="xs"
            placeholder="Enter first name"
            label="First name"
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            size="xs"
            placeholder="Enter last name"
            label="Last Name"
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <Select
            size="xs"
            placeholder="Select role"
            label="Role"
            key={form.key("role")}
            {...form.getInputProps("role")}
            // Please fetch from backend
            data={[
              { value: "org_admin", label: "Admin" },
              { value: "staff", label: "Staff" },
            ]}
          />
          <Button
            size="xs"
            radius={"md"}
            variant="light"
            fullWidth
            type="submit"
            disabled={!validForm}
          >
            Add User
          </Button>
        </form>
      </div>{" "}
      {users.length > 0 && (
        <div
          className={`"flex-1"
          } rounded-2xl bg-white p-3 grid gap-3`}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">Users to add</p>
            <Button
              size="xs"
              radius={"md"}
              variant="light"
              type="button"
              onClick={() => setUsers([])}
            >
              Clear all
            </Button>
          </div>
          <div className=" grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            {users.map((user, index) => (
              <User
                key={user.email}
                user={user}
                onRemove={() =>
                  setUsers((prev) => prev.filter((_, i) => i !== index))
                }
              />
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              loading={isLoading}
              loaderProps={{ type: "dots", size: "md" }}
              size="sm"
              radius={"md"}
              type="button"
              onClick={() => saveNewUsersToDb()}
            >
              Save to database
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUsersToAnOrganization;
