import { useState } from "react";
import {
  Table,
  Button,
  Drawer,
  Checkbox,
  Group,
  Stack,
  Title,
  Text,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { BsCassette as IconSettings } from "react-icons/bs";

// ---- Mock data (replace with API calls) ----
const states = [
  { id: "lagos", name: "Lagos" },
  { id: "abuja", name: "FCT Abuja" },
  { id: "oyo", name: "Oyo" },
];

const lgasByState: Record<string, { id: string; name: string }[]> = {
  lagos: [
    { id: "ikeja", name: "Ikeja" },
    { id: "surulere", name: "Surulere" },
  ],
  abuja: [
    { id: "amc", name: "AMAC" },
    { id: "bwari", name: "Bwari" },
  ],
  oyo: [{ id: "ibadan", name: "Ibadan North" }],
};

export default function CoverageConfigurator() {
  const [opened, setOpened] = useState(false);
  const [activeState, setActiveState] = useState<
    { id: string; name: string } | undefined
  >(undefined);
  const [selectedLgas, setSelectedLgas] = useState<string[]>([]);

  const openDrawer = (state: { id: string; name: string }) => {
    setActiveState(state);
    setSelectedLgas([]);
    setOpened(true);
  };

  return (
    <Stack gap="lg">
      <Title order={3}>Coverage: States</Title>
      <Text size="sm" c="dimmed">
        Select a state, then configure which Local Governments, Wards, or Polling Units are covered.
      </Text>

      {/* ---- STATES TABLE ---- */}
      <Table withTableBorder highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>State</Table.Th>
            <Table.Th w={120}>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {states.map((state) => (
            <Table.Tr key={state.id}>
              <Table.Td>{state.name}</Table.Td>
              <Table.Td>
                <ActionIcon
                  variant="light"
                  onClick={() => openDrawer(state)}
                >
                  <IconSettings size={18} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* ---- DRAWER: LGAs ---- */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Configure coverage: ${activeState?.name}`}
        position="right"
        size="md"
      >
        <Stack>
          <Title order={4}>Local Governments</Title>
          <Text size="sm" c="dimmed">
            Select the LGAs under this state that should be included.
          </Text>

          <Divider />

          {activeState &&
            lgasByState[activeState.id]?.map((lga) => (
              <Checkbox
                key={lga.id}
                label={lga.name}
                checked={selectedLgas.includes(lga.id)}
                onChange={(e) =>
                  setSelectedLgas((prev) =>
                    e.currentTarget.checked
                      ? [...prev, lga.id]
                      : prev.filter((id) => id !== lga.id)
                  )
                }
              />
            ))}

          <Divider />

          <Group justify="space-between" mt="md">
            <Button variant="default" onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button>
              Save & Continue
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </Stack>
  );
}
