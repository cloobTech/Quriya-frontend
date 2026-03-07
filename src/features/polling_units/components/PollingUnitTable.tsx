import { useState } from "react";
import {
  Table,
  Box,
  Select,
  Button,
  TextInput,
  Pagination,
  Text,
  Badge,
} from "@mantine/core";
import { BsSearch, BsPlus, BsExclamationTriangle } from "react-icons/bs";
import { useGetDetailedPollingUnitsQuery } from "../services/api";
import {
  useAppSelector,
  timeAgo,
  PU_STATUS_META,
  RESULT_STATUS_META,
} from "@features/shared";
import type { PuStatus, ResultStatusType } from "@features/shared";
import { useParams, useNavigate } from "react-router-dom";

const PollingUnitTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );
  const { projectId } = useParams();
  const { data: pollingUnitsData } = useGetDetailedPollingUnitsQuery({
    organizationId: organizationId!,
    projectId: projectId!,
    page: currentPage,
    page_size: pageSize,
  });

  const meta = pollingUnitsData?.meta;
  const pollingUnits = pollingUnitsData?.data;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (value: string | null) => {
    if (value) {
      setPageSize(Number(value));
    }
  };

  const row = pollingUnits?.map(
    (unit: {
      id: string;
      code: string;
      name: string;
      state: { id: string; name: string };
      lga: { id: string; name: string };
      ward: { id: string; name: string };
      agent: string | null;
      status: PuStatus;
      result_status: ResultStatusType;
      [key: string]: any;
    }) => (
      <Table.Tr
        key={unit.id}
        style={{ textTransform: "capitalize" }}
        onDoubleClick={() => navigate(`${unit.id}`)}
      >
        <Table.Td>
          <Text size="xs" tt="revert" style={{ textTransform: "capitalize" }}>
            {`${unit.code} / ${unit.name}`}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="xs">{unit.state.name}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="xs">{unit.lga.name}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="xs">{unit.ward.name} </Text>
        </Table.Td>

        <Table.Td>
          <Badge
            color={PU_STATUS_META[unit.status].color}
            size="sm"
            variant="light"
            tt={"capitalize"}
          >
            {PU_STATUS_META[unit.status].label}
          </Badge>
        </Table.Td>
        <Table.Td>
          {unit.agent ? (
            <Text size="xs"> {unit.agent} </Text>
          ) : (
            <Text size="xs"> {"----"} </Text>
          )}
        </Table.Td>
        <Table.Td>
          <Badge
            color={RESULT_STATUS_META[unit.result_status]?.color || "gray"}
            tt={"capitalize"}
            size="sm"
            variant="light"
          >
            {RESULT_STATUS_META[unit.result_status]?.label || "not submitted"}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Badge
            tt={"none"}
            className="flex items-center"
            size="xs"
            variant="light"
            color={unit.incident ? "red" : "gray"}
            leftSection={unit.incident && <BsExclamationTriangle size={10} />}
            rightSection={unit.incident && <BsExclamationTriangle size={10} />}
          >
            <Text size="xs">{unit.incident ? "reported" : "...."}</Text>
          </Badge>
        </Table.Td>
        <Table.Td>
          <Text size="xs" c="dimmed">
            {timeAgo({ startTime: new Date(unit.last_activity_at) })}
          </Text>
        </Table.Td>
        <Table.Td style={{ textAlign: "right" }}>
          {/* Actions can be added here */}
          <Button
            variant="subtle"
            size="xs"
            onClick={() => navigate(`${unit.id}`)}
          >
            View
          </Button>
        </Table.Td>
      </Table.Tr>
    ),
  );

  return (
    <div className="bg-white rounded-2xl p-3 grid gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TextInput
            radius="xl"
            leftSection={<BsSearch />}
            placeholder="Search"
            styles={{
              input: {
                backgroundColor: "#f0f0f0",
                border: "none",

                "::placeholder": {
                  color: "#909296",
                },
              },
            }}
          />

          <Select
            radius={"xl"}
            placeholder="Filter By"
            data={["hello", "world"]}
            styles={{
              input: {
                backgroundColor: "#f0f0f0",
                border: "none",

                "::placeholder": {
                  color: "#909296",
                },
              },
            }}
          />
        </div>
        <Button
          leftSection={<BsPlus className="font-bold" size={24} />}
          radius={"xl"}
          //   onClick={() =>
          //     showModal(<AssignPollingUnitsToAgent projectId={projectId!} />, {
          //       padding: 0,
          //       radius: "lg",
          //       closeOnClickOutside: false,
          //       closeOnEscape: false,
          //     })
          //   }
        >
          Add Agent
        </Button>
      </div>
      {/* Table section */}
      <Box
        className="border border-[var(--primary-0)]"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {pollingUnits?.length === 0 ? (
          <p className="text-center p-4 text-gray-500 text-sm">
            No Polling Units Found
          </p>
        ) : (
          <Table
            highlightOnHover
            tt="capitalize"
            border={0}
            striped
            withRowBorders={false}
            styles={(theme) => ({
              th: {
                color: theme.colors.primary[4],
                backgroundColor: theme.colors.primary[1],
                borderColor: theme.colors.primary[8],
                padding: "1.25rem 0.75rem",
                fontSize: theme.fontSizes.xs,
              },
              // tr: {
              //   // fontSize: "10px",
              //   textTransform: theme.other.textTransform,
              // },
            })}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>CODE / PU NAME</Table.Th>

                <Table.Th>STATE</Table.Th>
                <Table.Th>LGA</Table.Th>
                <Table.Th>WARD</Table.Th>
                <Table.Th>STATUS</Table.Th>
                <Table.Th>AGENT</Table.Th>
                <Table.Th>RESULT STATUS</Table.Th>
                <Table.Th>INCIDENT</Table.Th>
                <Table.Th>LAST ACTIVITY</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{row}</Table.Tbody>
          </Table>
        )}
      </Box>
      <div className="items-center justify-between flex mt-4 p-4 relative">
        <p className="text-xs font-semibold">
          {`Total Polling Units: ${meta?.total || "NA"}`}
        </p>
        <Pagination
          total={meta ? meta.total_pages : 1}
          value={currentPage}
          onChange={handlePageChange}
          variant="light"
          radius="md"
          size="sm"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold">show per page: </p>
          <Select
            data={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "40", label: "40" },
              { value: "60", label: "60" },
              { value: "80", label: "80" },
              { value: "100", label: "100" },
            ]}
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            className="w-18"
            size="xs"
            allowDeselect={false}
            searchable={false}
            clearable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PollingUnitTable;
