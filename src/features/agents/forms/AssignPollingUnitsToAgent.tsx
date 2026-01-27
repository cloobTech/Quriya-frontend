import { Button, Select, MultiSelect, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useGetOrganizationUsersQuery } from "@features/users";
import { useAppSelector, showApiError, useModal } from "@features/shared";
import {
  useGetStateCoverageQuery,
  useGetLGACoverageQuery,
  useGetWardCoverageQuery,
  useGetPuCoverageQuery,
} from "@features/location_coverage";
import { useAssignPollingUnitsToAgentMutation } from "@features/members";

type User = {
  id: string;
  full_name: string;
};

type CoverageEntity = {
  id: string;
  name: string;
};

const AssignPollingUnitsToAgent = ({ projectId }: { projectId: string }) => {
  const { hideModal } = useModal();

  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );

  /* -------------------- FORM -------------------- */
  const form = useForm({
    initialValues: {
      user_id: null as string | null,
      state_coverage_id: null as string | null,
      lga_coverage_id: null as string | null,
      ward_coverage_id: null as string | null,
      pu_coverage_ids: [] as string[],
    },
  });

  const { state_coverage_id, lga_coverage_id, ward_coverage_id } = form.values;

  /* -------------------- QUERIES -------------------- */

  const { data: usersData, isLoading: usersLoading } =
    useGetOrganizationUsersQuery({
      organizationId: organizationId!,
      include_admins: false,
    });

  const { data: stateData, isLoading: stateLoading } = useGetStateCoverageQuery(
    {
      organizationId: organizationId!,
      projectId,
    },
  );

  const { data: lgaData, isLoading: lgaLoading } = useGetLGACoverageQuery(
    {
      organizationId: organizationId!,
      projectId,
      state_coverage_id: state_coverage_id!,
    },
    { skip: !state_coverage_id },
  );

  const { data: wardData, isLoading: wardLoading } = useGetWardCoverageQuery(
    {
      organizationId: organizationId!,
      projectId,
      lga_coverage_id: lga_coverage_id!,
    },
    { skip: !lga_coverage_id },
  );

  const { data: puData, isLoading: puLoading } = useGetPuCoverageQuery(
    {
      organizationId: organizationId!,
      projectId,
      ward_coverage_id: ward_coverage_id!,
      assigned_status: false,
    },
    { skip: !ward_coverage_id },
  );

  /* -------------------- MUTATION -------------------- */

  const [assignPollingUnitsToAgent, { isLoading: isSubmitting }] =
    useAssignPollingUnitsToAgentMutation();

  /* -------------------- SUBMIT -------------------- */

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await assignPollingUnitsToAgent({
        organizationId: organizationId!,
        projectId,
        data: { ...values, user_id: values.user_id! },
      }).unwrap();

      notifications.show({
        title: "Success",
        message: response.message,
        color: "green",
        position: "top-right",
      });

      form.reset();
    } catch (err: any) {
      showApiError(err.data ?? err);
    }
  };

  /* -------------------- RENDER -------------------- */

  return (
    <div className="flex items-start justify-center gap-8 p-4 bg-white">
      <div className="w-[320px] bg-white rounded-2xl grid gap-3">
        <p className="font-semibold text-center">Invite new agent</p>

        <form className="grid gap-3" onSubmit={form.onSubmit(handleSubmit)}>
          {/* -------- USER -------- */}
          <Select
            label="Select organization staff"
            placeholder="Select Staff"
            size="xs"
            searchable
            leftSection={usersLoading && <Loader size="xs" />}
            data={
              usersData?.users.map((user: User) => ({
                value: user.id,
                label: user.full_name,
              })) ?? []
            }
            {...form.getInputProps("user_id")}
          />

          {/* -------- STATE -------- */}
          <Select
            label="Select State Covered"
            placeholder="Select State Covered"
            size="xs"
            searchable
            disabled={stateLoading}
            leftSection={stateLoading && <Loader size="xs" />}
            data={
              stateData?.state_coverage.map((state: CoverageEntity) => ({
                value: state.id,
                label: state.name,
              })) ?? []
            }
            {...form.getInputProps("state_coverage_id")}
            onChange={(value) => {
              form.setFieldValue("state_coverage_id", value);
              form.setFieldValue("lga_coverage_id", null);
              form.setFieldValue("ward_coverage_id", null);
              form.setFieldValue("pu_coverage_ids", []);
            }}
          />

          {/* -------- LGA -------- */}
          <Select
            label="Select LGA Covered"
            placeholder={
              state_coverage_id ? "Select LGA Covered" : "Select a state first"
            }
            size="xs"
            searchable
            disabled={!state_coverage_id || lgaLoading}
            leftSection={lgaLoading && <Loader size="xs" />}
            data={
              lgaData?.lga_coverage.map((lga: CoverageEntity) => ({
                value: lga.id,
                label: lga.name,
              })) ?? []
            }
            {...form.getInputProps("lga_coverage_id")}
            onChange={(value) => {
              form.setFieldValue("lga_coverage_id", value);
              form.setFieldValue("ward_coverage_id", null);
              form.setFieldValue("pu_coverage_ids", []);
            }}
          />

          {/* -------- WARD -------- */}
          <Select
            label="Select Ward Covered"
            placeholder={
              lga_coverage_id ? "Select Ward Covered" : "Select an LGA first"
            }
            size="xs"
            searchable
            disabled={!lga_coverage_id || wardLoading}
            leftSection={wardLoading && <Loader size="xs" />}
            data={
              wardData?.ward_coverage.map((ward: CoverageEntity) => ({
                value: ward.id,
                label: ward.name,
              })) ?? []
            }
            {...form.getInputProps("ward_coverage_id")}
            onChange={(value) => {
              form.setFieldValue("ward_coverage_id", value);
              form.setFieldValue("pu_coverage_ids", []);
            }}
          />

          {/* -------- POLLING UNITS -------- */}
          <MultiSelect
            label="Select Polling Units Covered"
            placeholder={
              ward_coverage_id ? "Select Polling Units" : "Select a ward first"
            }
            size="xs"
            searchable
            disabled={!ward_coverage_id || puLoading}
            leftSection={puLoading && <Loader size="xs" />}
            data={
              puData?.pu_coverage.map((pu: CoverageEntity) => ({
                value: pu.id,
                label: pu.name,
              })) ?? []
            }
            {...form.getInputProps("pu_coverage_ids")}
          />

          {/* -------- ACTIONS -------- */}
          <Button
            type="submit"
            size="xs"
            radius="md"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Assign User
          </Button>

          <Button
            size="xs"
            radius="md"
            variant="light"
            fullWidth
            onClick={hideModal}
          >
            Close Form
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AssignPollingUnitsToAgent;
