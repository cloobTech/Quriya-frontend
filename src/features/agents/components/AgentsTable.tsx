import { useState, useEffect, useMemo } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import {
  TextInput,
  Select,
  Button,
  Table,
  Box,
  Group,
  Badge,
  Menu,
  Pagination,
  Chip,
  Popover,
  Stack,
  Checkbox,
  Divider,
} from "@mantine/core";
import {
  BsSearch,
  BsPlus,
  BsThreeDotsVertical,
  BsFilter,
  BsX,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useModal, timeAgo } from "@features/shared";
import AssignPollingUnitsToAgent from "../forms/AssignPollingUnitsToAgent";
import { useGetAgentsQuery } from "@features/agents";
import {
  useGetStateCoverageQuery,
  useGetLGACoverageQuery,
  useGetWardCoverageQuery,
} from "@features/location_coverage";
import { useAppSelector } from "@features/shared";

interface FilterChip {
  type: "status" | "state" | "lga" | "ward";
  label: string;
  value: string;
}

const AgentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedLga, setSelectedLga] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [filterMenuOpened, setFilterMenuOpened] = useState(false);
  const [tempStatusFilter, setTempStatusFilter] = useState<string | null>(null);
  const [tempStateFilter, setTempStateFilter] = useState<string | null>(null);
  const [tempLgaFilter, setTempLgaFilter] = useState<string | null>(null);
  const [tempWardFilter, setTempWardFilter] = useState<string | null>(null);
  const [activeFilterSection, setActiveFilterSection] = useState<
    "status" | "location" | null
  >(null);

  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );
  const { showModal } = useModal();
  const { projectId } = useParams();

  const [debouncedSearch] = useDebouncedValue(searchQuery, 500);

  // Fetch states coverage
  const { data: statesData } = useGetStateCoverageQuery({
    organizationId: organizationId!,
    projectId: projectId!,
  });

  // Fetch LGAs when a state is selected in the temp filter
  const { data: lgasData } = useGetLGACoverageQuery(
    {
      organizationId: organizationId!,
      projectId: projectId!,
      state_coverage_id: tempStateFilter!,
    },
    { skip: !tempStateFilter },
  );

  // Fetch wards when an LGA is selected in the temp filter
  const { data: wardsData } = useGetWardCoverageQuery(
    {
      organizationId: organizationId!,
      projectId: projectId!,
      lga_coverage_id: tempLgaFilter!,
    },
    { skip: !tempLgaFilter },
  );

  // Fetch agents with current filters
  const { data } = useGetAgentsQuery({
    organizationId: organizationId!,
    projectId: projectId!,
    search: debouncedSearch,
    status: statusFilter,
    state_id: selectedState,
    lga_id: selectedLga,
    ward_id: selectedWard,
    page: currentPage,
    page_size: pageSize,
  });

  const agents = data?.data || [];
  const meta = data?.meta;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    statusFilter,
    selectedState,
    selectedLga,
    selectedWard,
    pageSize,
  ]);

  // Transform states data for filter dropdown
  const stateOptions = useMemo(() => {
    if (!statesData?.state_coverage) return [];
    return statesData?.state_coverage?.map((state: any) => ({
      value: state.id,
      label: state?.name || "Unknown State",
    }));
  }, [statesData]);

  // Transform LGAs data for filter dropdown
  const lgaOptions = useMemo(() => {
    if (!lgasData?.lga_coverage) return [];
    return lgasData.lga_coverage.map((lga: any) => ({
      value: lga.id,
      label: lga?.name || "Unknown LGA",
    }));
  }, [lgasData]);

  // Transform wards data for filter dropdown
  const wardOptions = useMemo(() => {
    if (!wardsData?.ward_coverage) return [];
    return wardsData.ward_coverage.map((ward: any) => ({
      value: ward.id,
      label: ward.name || "Unknown Ward",
    }));
  }, [wardsData]);

  // Prepare filter chips
  const filterChips: FilterChip[] = useMemo(() => {
    const chips: FilterChip[] = [];

    if (statusFilter) {
      chips.push({
        type: "status",
        label: `Status: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`,
        value: statusFilter,
      });
    }

    if (selectedState) {
      const state = stateOptions.find((s: any) => s.value === selectedState);
      if (state) {
        chips.push({
          type: "state",
          label: `State: ${state.label}`,
          value: selectedState,
        });
      }
    }

    if (selectedLga) {
      const lga = lgaOptions.find((l: any) => l.value === selectedLga);
      if (lga) {
        chips.push({
          type: "lga",
          label: `LGA: ${lga.label}`,
          value: selectedLga,
        });
      }
    }

    if (selectedWard) {
      const ward = wardOptions.find((w: any) => w.value === selectedWard);
      if (ward) {
        chips.push({
          type: "ward",
          label: `Ward: ${ward.label}`,
          value: selectedWard,
        });
      }
    }

    return chips;
  }, [
    statusFilter,
    selectedState,
    selectedLga,
    selectedWard,
    stateOptions,
    lgaOptions,
    wardOptions,
  ]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (value: string | null) => {
    if (value) {
      setPageSize(Number(value));
    }
  };

  // Clear specific filter
  const clearFilter = (type: FilterChip["type"]) => {
    switch (type) {
      case "status":
        setStatusFilter(null);
        break;
      case "state":
        setSelectedState(null);
        setSelectedLga(null); // Also clear LGA since it depends on state
        setSelectedWard(null); // Also clear ward since it depends on LGA
        break;
      case "lga":
        setSelectedLga(null);
        setSelectedWard(null); // Also clear ward since it depends on LGA
        break;
      case "ward":
        setSelectedWard(null);
        break;
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setStatusFilter(null);
    setSelectedState(null);
    setSelectedLga(null);
    setSelectedWard(null);
    setCurrentPage(1);
  };

  // Apply filters from filter menu
  const applyFilters = () => {
    setStatusFilter(tempStatusFilter);
    setSelectedState(tempStateFilter);
    setSelectedLga(tempLgaFilter);
    setSelectedWard(tempWardFilter);
    setFilterMenuOpened(false);
    setActiveFilterSection(null);
    setCurrentPage(1);
  };

  // Reset filter menu to current values
  const resetFilterMenu = () => {
    setTempStatusFilter(statusFilter);
    setTempStateFilter(selectedState);
    setTempLgaFilter(selectedLga);
    setTempWardFilter(selectedWard);
  };

  // Handle opening filter menu
  const handleFilterMenuOpen = () => {
    resetFilterMenu();
    setFilterMenuOpened(true);
  };

  const StatusBadgeColor = {
    active: "blue",
    inactive: "red",
    invited: "gray",
  } as const;

  const row = agents.map(
    (agent: {
      id: string;
      status: keyof typeof StatusBadgeColor;
      [key: string]: any;
    }) => (
      <Table.Tr key={agent.id} className="text-xs">
        <Table.Td>{agent.user.name}</Table.Td>
        <Table.Td>{agent.user.email}</Table.Td>
        <Table.Td>{agent?.state_coverage?.name ?? "N/A"}</Table.Td>
        <Table.Td>{agent?.lga_coverage?.name ?? "N/A"}</Table.Td>
        <Table.Td>
          <Menu shadow="sm" width={200}>
            <Menu.Target>
              <Button variant="subtle" size="xs">
                {agent.wards?.length || 0} ward(s)
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {agent.wards?.map((ward: any) => (
                <Menu.Item
                  style={{
                    fontSize: "10px",
                  }}
                  key={ward.ward_coverage_id}
                >
                  {ward.name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
        <Table.Td>
          <Menu shadow="sm" width={200}>
            <Menu.Target>
              <Button variant="subtle" size="xs">
                {agent.polling_units?.length || 0} unit(s)
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {agent.polling_units?.map((pu: any) => (
                <Menu.Item
                  style={{
                    fontSize: "10px",
                  }}
                  key={pu.code}
                >
                  {pu.name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
        <Table.Td>
          <Badge
            tt={"none"}
            variant="light"
            size="xs"
            color={StatusBadgeColor[agent.status]}
          >
            {agent.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          {timeAgo({
            startTime: new Date(agent.updated_at),
          })}
        </Table.Td>

        {/* ACTIONS */}
        <Table.Td>
          <Group justify="flex-end">
            <Menu shadow="sm" width={160}>
              <Menu.Target>
                <Button variant="subtle" size="xs">
                  <BsThreeDotsVertical />
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => console.log("View", agent.id)}>
                  View
                </Menu.Item>
                <Menu.Item onClick={() => console.log("Edit", agent.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  color="red"
                  onClick={() => console.log("Remove", agent.id)}
                >
                  Remove
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Table.Td>
      </Table.Tr>
    ),
  );

  return (
    <div className="bg-white rounded-2xl p-3 grid gap-3">
      {/* Header with Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <TextInput
            radius="xl"
            leftSection={<BsSearch />}
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
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

          {/* Filter Button with Popover */}
          <Popover
            opened={filterMenuOpened}
            onChange={setFilterMenuOpened}
            position="bottom-start"
            width={300}
            shadow="md"
          >
            <Popover.Target>
              <Button
                leftSection={<BsFilter />}
                variant={filterChips.length > 0 ? "filled" : "light"}
                color={filterChips.length > 0 ? "blue" : "gray"}
                radius="xl"
                onClick={handleFilterMenuOpen}
              >
                Filter
                {filterChips.length > 0 && (
                  <Badge ml={5} size="xs" circle>
                    {filterChips.length}
                  </Badge>
                )}
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack gap="md">
                {/* Status Filter Section */}
                <div>
                  <Button
                    variant="subtle"
                    fullWidth
                    justify="space-between"
                    rightSection={
                      activeFilterSection === "status" ? <BsX /> : "›"
                    }
                    onClick={() =>
                      setActiveFilterSection(
                        activeFilterSection === "status" ? null : "status",
                      )
                    }
                  >
                    Status
                    {tempStatusFilter && (
                      <Badge size="xs" variant="light">
                        {tempStatusFilter}
                      </Badge>
                    )}
                  </Button>

                  {activeFilterSection === "status" && (
                    <div className="mt-2 ml-4">
                      {["active", "inactive", "invited"].map((status) => (
                        <Checkbox
                          key={status}
                          label={
                            status.charAt(0).toUpperCase() + status.slice(1)
                          }
                          checked={tempStatusFilter === status}
                          onChange={() =>
                            setTempStatusFilter(
                              tempStatusFilter === status ? null : status,
                            )
                          }
                          className="mb-1"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Filter Section */}
                <div>
                  <Button
                    variant="subtle"
                    fullWidth
                    justify="space-between"
                    rightSection={
                      activeFilterSection === "location" ? <BsX /> : "›"
                    }
                    onClick={() =>
                      setActiveFilterSection(
                        activeFilterSection === "location" ? null : "location",
                      )
                    }
                  >
                    Location
                    {(tempStateFilter || tempLgaFilter || tempWardFilter) && (
                      <Badge size="xs" variant="light">
                        Selected
                      </Badge>
                    )}
                  </Button>

                  {activeFilterSection === "location" && (
                    <Stack gap="sm" className="mt-2 ml-4">
                      {/* State Filter */}
                      <Select
                        label="State"
                        placeholder="Select state"
                        data={stateOptions}
                        value={tempStateFilter}
                        onChange={(value) => {
                          setTempStateFilter(value);
                          setTempLgaFilter(null); // Reset LGA when state changes
                          setTempWardFilter(null); // Reset ward when state changes
                        }}
                        comboboxProps={{ withinPortal: false }}
                        clearable
                      />

                      {/* LGA Filter */}
                      <Select
                        label="Local Government"
                        placeholder="Select LGA"
                        data={lgaOptions}
                        value={tempLgaFilter}
                        onChange={(value) => {
                          setTempLgaFilter(value);
                          setTempWardFilter(null); // Reset ward when LGA changes
                        }}
                        disabled={!tempStateFilter}
                        comboboxProps={{ withinPortal: false }}
                        clearable
                      />

                      {/* Ward Filter */}
                      <Select
                        label="Ward"
                        placeholder="Select ward"
                        data={wardOptions}
                        value={tempWardFilter}
                        onChange={setTempWardFilter}
                        disabled={!tempLgaFilter}
                        comboboxProps={{ withinPortal: false }}
                        clearable
                      />
                    </Stack>
                  )}
                </div>

                <Divider />

                {/* Filter Actions */}
                <Group justify="space-between">
                  <Button
                    variant="subtle"
                    color="red"
                    size="sm"
                    onClick={() => {
                      setTempStatusFilter(null);
                      setTempStateFilter(null);
                      setTempLgaFilter(null);
                      setTempWardFilter(null);
                    }}
                  >
                    Clear All
                  </Button>
                  <Group>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        setFilterMenuOpened(false);
                        setActiveFilterSection(null);
                        resetFilterMenu();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={applyFilters}>
                      Apply
                    </Button>
                  </Group>
                </Group>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          {/* Clear All Filters Button */}
          {filterChips.length > 0 && (
            <Button
              variant="subtle"
              color="red"
              size="sm"
              onClick={clearAllFilters}
              leftSection={<BsX />}
            >
              Clear All
            </Button>
          )}
        </div>

        <Button
          leftSection={<BsPlus className="font-bold" size={24} />}
          radius={"xl"}
          onClick={() =>
            showModal(<AssignPollingUnitsToAgent projectId={projectId!} />, {
              padding: 0,
              radius: "lg",
              closeOnClickOutside: false,
              closeOnEscape: false,
            })
          }
        >
          Add Agent
        </Button>
      </div>

      {/* Filter Chips */}
      {filterChips.length > 0 && (
        <Group gap="xs">
          {filterChips.map((chip) => (
            <Chip
              key={`${chip.type}-${chip.value}`}
              checked={true}
              variant="light"
              size="sm"
              onClick={() => clearFilter(chip.type)}
              styles={{
                root: {
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "var(--mantine-color-red-0)",
                  },
                },
              }}
            >
              <Group gap={4}>
                {chip.label}
                <BsX size={12} />
              </Group>
            </Chip>
          ))}
        </Group>
      )}

      {/* Table section */}
      <Box
        className="border border-[var(--primary-0)]"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {agents.length === 0 ? (
          <div className="p-8 text-center">No agents found</div>
        ) : (
          <Table
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
            })}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>AGENT NAME</Table.Th>
                <Table.Th>EMAIL ADDRESS</Table.Th>
                <Table.Th>STATE</Table.Th>
                <Table.Th>LGA</Table.Th>
                <Table.Th>WARDS</Table.Th>
                <Table.Th>POLLING UNITS</Table.Th>
                <Table.Th>STATUS</Table.Th>
                <Table.Th>LAST ACTIVITY</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{row}</Table.Tbody>
          </Table>
        )}
      </Box>

      {/* Pagination */}
      <div className="items-center justify-between flex mt-4 p-4 relative">
        <p className="text-xs font-semibold">
          {`Total Agents: ${meta?.total || "NA"}`}
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
              { value: "30", label: "30" },
              { value: "40", label: "40" },
              { value: "50", label: "50" },
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

export default AgentsTable;
