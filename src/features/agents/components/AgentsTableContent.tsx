import React from 'react';
import { Table, Box, Menu, Button, Badge, Group } from '@mantine/core';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Agent {
  id: string;
  user: {
    name: string;
    email: string;
  };
  state_coverage?: {
    name: string;
  };
  lga_coverage?: {
    name: string;
  };
  wards: Array<{
    ward_coverage_id: string;
    name: string;
  }>;
  polling_units: Array<{
    code: string;
    name: string;
  }>;
  status: 'active' | 'inactive' | 'invited';
  updated_at: string;
}

interface AgentsTableContentProps {
  agents: Agent[];
  isLoading?: boolean;
}

const StatusBadgeColor = {
  active: 'blue',
  inactive: 'red',
  invited: 'gray',
} as const;

export const AgentsTableContent: React.FC<AgentsTableContentProps> = ({
  agents,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Box className="border border-[var(--primary-0)]" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="p-8 text-center">Loading agents...</div>
      </Box>
    );
  }

  if (agents.length === 0) {
    return (
      <Box className="border border-[var(--primary-0)]" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="p-8 text-center">No agents found</div>
      </Box>
    );
  }

  const rows = agents.map((agent) => (
    <Table.Tr key={agent.id} className="text-xs">
      <Table.Td>{agent.user.name}</Table.Td>
      <Table.Td>{agent.user.email}</Table.Td>
      <Table.Td>{agent?.state_coverage?.name ?? 'N/A'}</Table.Td>
      <Table.Td>{agent?.lga_coverage?.name ?? 'N/A'}</Table.Td>
      <Table.Td>
        <Menu shadow="sm" width={200}>
          <Menu.Target>
            <Button variant="subtle" size="xs">
              {agent.wards?.length || 0} ward(s)
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {agent.wards?.map((ward) => (
              <Menu.Item
                style={{
                  fontSize: '10px',
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
            {agent.polling_units?.map((pu) => (
              <Menu.Item
                style={{
                  fontSize: '10px',
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
          tt={'none'}
          variant="light"
          size="xs"
          color={StatusBadgeColor[agent.status]}
        >
          {agent.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        {new Date(agent.updated_at).toLocaleString('en-NG', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}
      </Table.Td>
      <Table.Td>
        <Group justify="flex-end">
          <Menu shadow="sm" width={160}>
            <Menu.Target>
              <Button variant="subtle" size="xs">
                <BsThreeDotsVertical />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => console.log('View', agent.id)}>
                View
              </Menu.Item>
              <Menu.Item onClick={() => console.log('Edit', agent.id)}>
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                onClick={() => console.log('Remove', agent.id)}
              >
                Remove
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box
      className="border border-[var(--primary-0)]"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Table
        border={0}
        striped
        withRowBorders={false}
        styles={(theme) => ({
          th: {
            color: theme.colors.primary[4],
            backgroundColor: theme.colors.primary[1],
            borderColor: theme.colors.primary[8],
            padding: '1.25rem 0.75rem',
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
            <Table.Th style={{ textAlign: 'right' }}>ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
};

export default AgentsTableContent;