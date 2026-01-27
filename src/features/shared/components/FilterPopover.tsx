// import { useState, useEffect } from "react";
// import {
//   Button,
//   Badge,
//   Popover,
//   Stack,
//   Checkbox,
//   Divider,
//   Group,
//   Select,
//   TextInput,
//   MultiSelect,
// } from "@mantine/core";
// import { DatePicker } from "@mantine/dates";
// import { BsFilter, BsX, BsChevronDown } from "react-icons/bs";

// type FilterType =
//   | "text"
//   | "select"
//   | "multiselect"
//   | "checkbox"
//   | "date"
//   | "daterange";

// interface FilterOption {
//   value: string;
//   label: string;
//   group?: string;
// }

// interface FilterField<T = any> {
//   key: keyof T;
//   label: string;
//   type: FilterType;
//   options?: FilterOption[];
//   placeholder?: string;
//   clearable?: boolean;
//   searchable?: boolean;
//   multiple?: boolean;
//   // For dependent filters
//   dependsOn?: string;
//   filterData?: (
//     options: FilterOption[],
//     dependencies: Record<string, any>,
//   ) => FilterOption[];
// }

// interface FilterPopoverProps<T extends Record<string, any>> {
//   // Configuration
//   filterFields: FilterField<T>[];

//   // Current values
//   currentFilters: T;

//   // Callbacks
//   onApplyFilters: (filters: T) => void;
//   onClearAllFilters?: () => void;

//   // UI
//   buttonLabel?: string;
//   isLoading?: boolean;

//   // For dependent filters
//   dependencies?: Record<string, any>;
// }

// export function FilterPopover<T extends Record<string, any>>({
//   filterFields,
//   currentFilters,
//   onApplyFilters,
//   onClearAllFilters,
//   buttonLabel = "Filter",
//   isLoading = false,
//   dependencies = {},
// }: FilterPopoverProps<T>) {
//   const [opened, setOpened] = useState(false);
//   const [tempFilters, setTempFilters] = useState<T>(currentFilters);
//   const [activeSections, setActiveSections] = useState<Set<string>>(new Set());

//   // Reset temp filters when opened
//   useEffect(() => {
//     if (opened) {
//       setTempFilters(currentFilters);
//     }
//   }, [opened, currentFilters]);

//   // Toggle section
//   const toggleSection = (key: string) => {
//     const newSections = new Set(activeSections);
//     if (newSections.has(key)) {
//       newSections.delete(key);
//     } else {
//       newSections.add(key);
//     }
//     setActiveSections(newSections);
//   };

//   // Handle filter change
//   const handleFilterChange = (key: keyof T, value: any) => {
//     setTempFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   // Handle apply
//   const handleApply = () => {
//     onApplyFilters(tempFilters);
//     setOpened(false);
//   };

//   // Handle clear all
//   const handleClearAll = () => {
//     const resetFilters = { ...currentFilters };
//     filterFields.forEach((field) => {
//       resetFilters[field.key] =
//         field.type === "multiselect"
//           ? ([] as T[keyof T])
//           : (null as T[keyof T]);
//     });
//     setTempFilters(resetFilters);
//     if (onClearAllFilters) {
//       onClearAllFilters();
//     }
//   };

//   // Group filter fields by section
//   const groupedFilters = filterFields.reduce(
//     (acc, field) => {
//       const group =
//         field.type === "checkbox" ? field.key.toString() : "general";
//       if (!acc[group]) acc[group] = [];
//       acc[group].push(field);
//       return acc;
//     },
//     {} as Record<string, FilterField<T>[]>,
//   );

//   // Get filter options with dependencies
//   const getFilterOptions = (field: FilterField<T>) => {
//     if (!field.options) return [];

//     if (field.filterData && field.dependsOn) {
//       return field.filterData(field.options, dependencies);
//     }

//     return field.options;
//   };

//   // Render filter input based on type
//   const renderFilterInput = (field: FilterField<T>) => {
//     const value = tempFilters[field.key];
//     const options = getFilterOptions(field);

//     switch (field.type) {
//       case "text":
//         return (
//           <TextInput
//             label={field.label}
//             placeholder={field.placeholder}
//             value={value || ""}
//             onChange={(e) => handleFilterChange(field.key, e.target.value)}
//           />
//         );

//       case "select":
//         return (
//           <Select
//             label={field.label}
//             placeholder={field.placeholder}
//             data={options}
//             value={value as string}
//             onChange={(val) => handleFilterChange(field.key, val)}
//             clearable={field.clearable}
//             searchable={field.searchable}
//             disabled={
//               field.dependsOn &&
//               (dependencies[field.dependsOn] === undefined ||
//                 dependencies[field.dependsOn] === null)
//             }
//           />
//         );

//       case "multiselect":
//         return (
//           <MultiSelect
//             label={field.label}
//             placeholder={field.placeholder}
//             data={options}
//             value={(value as string[]) || []}
//             onChange={(val) => handleFilterChange(field.key, val)}
//             clearable={field.clearable}
//             searchable={field.searchable}
//           />
//         );

//       case "checkbox":
//         return (
//           <div className="mt-2 ml-4">
//             {options.map((option) => (
//               <Checkbox
//                 key={option.value}
//                 label={option.label}
//                 checked={value === option.value}
//                 onChange={() =>
//                   handleFilterChange(
//                     field.key,
//                     value === option.value ? null : option.value,
//                   )
//                 }
//                 className="mb-1"
//               />
//             ))}
//           </div>
//         );

//       case "date":
//         return (
//           <DatePicker
//             label={field.label}
//             placeholder={field.placeholder}
//             value={value ? new Date(value) : null}
//             onChange={(date) =>
//               handleFilterChange(
//                 field.key,
//                 date instanceof Date ? date.toISOString() : null,
//               )
//             }
//             clearable={field.clearable}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   // Count active filters
//   const activeFilterCount = filterFields.filter((field) => {
//     const value = currentFilters[field.key];
//     if (field.type === "multiselect") {
//       return Array.isArray(value) && value?.length > 0;
//     }
//     return value !== null && value !== undefined && value !== "";
//   })?.length;

//   return (
//     <Popover
//       opened={opened}
//       onChange={setOpened}
//       position="bottom-start"
//       width={400}
//       shadow="md"
//       closeOnClickOutside={false}
//     >
//       <Popover.Target>
//         <Button
//           leftSection={<BsFilter />}
//           variant={activeFilterCount > 0 ? "filled" : "light"}
//           color={activeFilterCount > 0 ? "blue" : "gray"}
//           radius="xl"
//           loading={isLoading}
//           onClick={() => setOpened(true)}
//         >
//           {buttonLabel}
//           {activeFilterCount > 0 && (
//             <Badge ml={5} size="xs" circle>
//               {activeFilterCount}
//             </Badge>
//           )}
//         </Button>
//       </Popover.Target>
//       <Popover.Dropdown>
//         <Stack gap="md">
//           {Object.entries(groupedFilters).map(([group, fields]) => {
//             if (group === "general") {
//               return fields.map((field) => (
//                 <div key={field.key as string}>{renderFilterInput(field)}</div>
//               ));
//             }

//             // For grouped filters (like checkbox groups)
//             const field = fields[0]; // Checkbox groups have one field per group
//             return (
//               <div key={group}>
//                 <Button
//                   variant="subtle"
//                   fullWidth
//                   justify="space-between"
//                   rightSection={
//                     activeSections.has(group) ? <BsX /> : <BsChevronDown />
//                   }
//                   onClick={() => toggleSection(group)}
//                 >
//                   {field.label}
//                   {tempFilters[field.key] && (
//                     <Badge size="xs" variant="light">
//                       {tempFilters[field.key]}
//                     </Badge>
//                   )}
//                 </Button>
//                 {activeSections.has(group) && renderFilterInput(field)}
//               </div>
//             );
//           })}

//           <Divider />

//           <Group justify="space-between">
//             <Button
//               variant="subtle"
//               color="red"
//               size="sm"
//               onClick={handleClearAll}
//             >
//               Clear All
//             </Button>
//             <Group>
//               <Button
//                 variant="light"
//                 size="sm"
//                 onClick={() => setOpened(false)}
//               >
//                 Cancel
//               </Button>
//               <Button size="sm" onClick={handleApply}>
//                 Apply
//               </Button>
//             </Group>
//           </Group>
//         </Stack>
//       </Popover.Dropdown>
//     </Popover>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Popover,
  Stack,
  Checkbox,
  Divider,
  Group,
  Select,
} from "@mantine/core";
import { BsFilter, BsX, BsChevronDown } from "react-icons/bs";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPopoverProps {
  activeFilters: Array<{
    type: string;
    label: string;
    value: string;
  }>;
  onApplyFilters: (filters: {
    status: string | null;
    state: string | null;
    lga: string | null;
    ward: string | null;
  }) => void;
  onClearAllFilters?: () => void;
  buttonLabel?: string;
  isLoading?: boolean;
  stateOptions?: FilterOption[];
  lgaOptions?: FilterOption[];
  wardOptions?: FilterOption[];
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({
  activeFilters,
  onApplyFilters,
  onClearAllFilters,
  buttonLabel = "Filter",
  isLoading = false,
  stateOptions = [],
  lgaOptions = [],
  wardOptions = [],
}) => {
  const [opened, setOpened] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "status" | "location" | null
  >(null);
  const [tempStatus, setTempStatus] = useState<string | null>(null);
  const [tempState, setTempState] = useState<string | null>(null);
  const [tempLga, setTempLga] = useState<string | null>(null);
  const [tempWard, setTempWard] = useState<string | null>(null);

  useEffect(() => {
    if (opened) {
      // Reset temp values when opening
      setTempStatus(null);
      setTempState(null);
      setTempLga(null);
      setTempWard(null);
    }
  }, [opened]);

  const handleApply = () => {
    onApplyFilters({
      status: tempStatus,
      state: tempState,
      lga: tempLga,
      ward: tempWard,
    });
    setOpened(false);
  };

  const handleClearAll = () => {
    setTempStatus(null);
    setTempState(null);
    setTempLga(null);
    setTempWard(null);
    if (onClearAllFilters) {
      onClearAllFilters();
    }
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      width={350}
      shadow="md"
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Button
          leftSection={<BsFilter />}
          variant={activeFilters?.length > 0 ? "filled" : "light"}
          color={activeFilters?.length > 0 ? "blue" : "gray"}
          radius="xl"
          loading={isLoading}
          onClick={() => setOpened(true)}
        >
          {buttonLabel}
          {activeFilters?.length > 0 && (
            <Badge ml={5} size="xs" circle>
              {activeFilters?.length}
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
                activeSection === "status" ? <BsX /> : <BsChevronDown />
              }
              onClick={() =>
                setActiveSection(activeSection === "status" ? null : "status")
              }
            >
              Status
              {tempStatus && (
                <Badge size="xs" variant="light">
                  {tempStatus}
                </Badge>
              )}
            </Button>

            {activeSection === "status" && (
              <div className="mt-2 ml-4">
                {["active", "inactive", "invited"].map((status) => (
                  <Checkbox
                    key={status}
                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                    checked={tempStatus === status}
                    onChange={() =>
                      setTempStatus(tempStatus === status ? null : status)
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
                activeSection === "location" ? <BsX /> : <BsChevronDown />
              }
              onClick={() =>
                setActiveSection(
                  activeSection === "location" ? null : "location",
                )
              }
            >
              Location
              {(tempState || tempLga || tempWard) && (
                <Badge size="xs" variant="light">
                  Selected
                </Badge>
              )}
            </Button>

            {activeSection === "location" && (
              <Stack gap="sm" className="mt-2 ml-4">
                {/* State Filter */}
                <Select
                  label="State"
                  placeholder="Select state"
                  data={stateOptions}
                  value={tempState}
                  onChange={(value) => {
                    setTempState(value);
                    setTempLga(null);
                    setTempWard(null);
                  }}
                  comboboxProps={{ withinPortal: false }}
                  clearable
                />

                {/* LGA Filter */}
                <Select
                  label="Local Government"
                  placeholder="Select LGA"
                  data={lgaOptions}
                  value={tempLga}
                  onChange={(value) => {
                    setTempLga(value);
                    setTempWard(null);
                  }}
                  disabled={!tempState}
                  comboboxProps={{ withinPortal: false }}
                  clearable
                />

                {/* Ward Filter */}
                <Select
                  label="Ward"
                  placeholder="Select ward"
                  data={wardOptions}
                  value={tempWard}
                  onChange={setTempWard}
                  disabled={!tempLga}
                  comboboxProps={{ withinPortal: false }}
                  clearable
                />
              </Stack>
            )}
          </div>

          <Divider />

          <Group justify="space-between">
            <Button
              variant="subtle"
              color="red"
              size="sm"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
            <Group>
              <Button
                variant="light"
                size="sm"
                onClick={() => setOpened(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleApply}>
                Apply
              </Button>
            </Group>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
