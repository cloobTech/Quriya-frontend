import { Group, Stack } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import type { DropzoneProps } from "@mantine/dropzone";
import { BsFiletypeCsv, BsX, BsCheck } from "react-icons/bs";

const AddUsersToAnOrganizationViaImport = (props: Partial<DropzoneProps>) => {
  return (
    <div className="bg-white size-80 rounded-2xl p-2 px-4 text-sm grid">
      <p className="font-semibold text-center">Upload CSV / Excel</p>
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={[MIME_TYPES.csv, MIME_TYPES.xlsx, MIME_TYPES.xls]}
        {...props}
      >
        <Group justify="center" align="center" mih={220}>
          <Stack align="center" gap={6}>
            <Dropzone.Accept>
              <BsCheck size={52} color="var(--mantine-color-blue-6)" />
            </Dropzone.Accept>

            <Dropzone.Reject>
              <BsX size={52} color="var(--mantine-color-red-6)" />
            </Dropzone.Reject>

            <Dropzone.Idle>
              <BsFiletypeCsv size={32} color="var(--mantine-color-dimmed)" />
            </Dropzone.Idle>

            <p className="text-center text-sm">
              Drag files here or{" "}
              <span className="text-blue-500">click to select files</span>
            </p>
          </Stack>
        </Group>
      </Dropzone>
    </div>
  );
};

export default AddUsersToAnOrganizationViaImport;
