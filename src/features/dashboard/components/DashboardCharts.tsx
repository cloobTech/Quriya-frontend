import React from "react";
import { BarChart } from "@mantine/charts";
import { BsBarChart, BsArrowRepeat, BsTrophy } from "react-icons/bs";
import { Button, Box, Text, Badge, Paper, Group, Stack } from "@mantine/core";
import { theme } from "@src/theme";

// Restructured data for proper bar chart format
const chartData = [
  { party: "APC", votes: 12450, color: "#4CAF50" },
  { party: "PDP", votes: 11820, color: "#F44336" },
  { party: "LP", votes: 9620, color: "#009688" },
  { party: "NNPP", votes: 3840, color: "#9C27B0" },
  { party: "Others", votes: 620, color: "#757575" },
];

const DashboardElectionChart: React.FC = () => {
  // Find leading party
  const leadingParty = chartData.reduce((max, party) =>
    party.votes > max.votes ? party : max,
  );

  // Calculate total votes for percentages
  const totalVotes = chartData.reduce((sum, party) => sum + party.votes, 0);

  return (
    <Paper
      p="lg"
      radius="xl"
      shadow="sm"
      bg="white"
      withBorder
      style={{ borderColor: "var(--mantine-color-gray-2)" }}
    >
      {/* Header with improved design */}
      <Group justify="space-between" mb="lg">
        <Group gap="xs">
          <Box p={10} bg="blue.0" style={{ borderRadius: "12px" }}>
            <BsBarChart size={22} color="var(--mantine-color-blue-7)" />
          </Box>
          <div>
            <Text fw={700} size="lg">
              Election Results
            </Text>
            <Text size="sm" c="dimmed">
              Total votes by political party
            </Text>
          </div>
        </Group>
        <Button
          radius="lg"
          variant="light"
          leftSection={<BsArrowRepeat size={16} />}
          size="sm"
          style={{ fontWeight: 500 }}
        >
          Refresh Data
        </Button>
      </Group>

      {/* Leading party highlight */}
      <Paper p="md" radius="lg" mb="lg" withBorder className="bg-gray-100/50!">
        <Group gap="sm" align="center">
          <Box
            p={8}
            bg={theme?.colors?.primary?.[1] ?? "gray"}
            style={{ borderRadius: "50%" }}
          >
            <BsTrophy size={18} color={theme?.colors?.primary?.[5] ?? "gray"} />
          </Box>
          <Stack gap={2}>
            <Text fw={600} size="sm">
              Current Leader
            </Text>
            <Group gap="xs" align="center">
              <Badge
                size="lg"
                radius="md"
                color={theme?.colors?.primary?.[5] ?? "gray"}
                variant="filled"
                leftSection={
                  <Box
                    w={10}
                    h={10}
                    bg="white"
                    style={{ borderRadius: "50%" }}
                  />
                }
              >
                {leadingParty.party}
              </Badge>
              <Text fw={700} size="xl">
                {leadingParty.votes.toLocaleString()}
              </Text>
              <Text c="dimmed" size="sm">
                ({((leadingParty.votes / totalVotes) * 100).toFixed(1)}%)
              </Text>
            </Group>
          </Stack>
        </Group>
      </Paper>

      {/* Bar Chart with improved styling */}
      <Box h={320}>
        <BarChart
          h="100%"
          data={chartData}
          dataKey="party"
          xAxisProps={{
            tickMargin: 10,
            tick: {
              fontSize: 14,
              fontWeight: 600,
            },
          }}
          yAxisProps={{
            tickMargin: 10,
            tick: { fontSize: 12 },
            domain: [0, Math.max(...chartData.map((d) => d.votes)) * 1.1],
          }}
          withBarValueLabel
          valueFormatter={(value) =>
            new Intl.NumberFormat("en-NG").format(value)
          }
          barProps={{
            radius: [8, 8, 0, 0],
            strokeWidth: 1,
            stroke: "white",
          }}
          barChartProps={{
            barSize: 65,
          }}
          tooltipAnimationDuration={200}
          valueLabelProps={{
            position: "top",
            fill: "var(--mantine-color-gray-8)",
            fontSize: 13,
            fontWeight: 600,
          }}
          tooltipProps={{
            cursor: { fill: "#d1d5db", opacity: 0.3 },
            content: ({ payload }) => {
              const data = payload?.[0]?.payload;
              if (!data) return null;
              const percentage = ((data.votes / totalVotes) * 100).toFixed(1);
              return (
                <Paper p="md" shadow="md" radius="md" withBorder>
                  <Group>
                    <Box
                      w={12}
                      h={12}
                      style={{
                        borderRadius: "4px",
                        backgroundColor: data.color,
                      }}
                    />
                    <div>
                      <Text fw={700}>{data.party}</Text>
                      <Text fw={600} size="lg">
                        {data.votes.toLocaleString()} votes
                      </Text>
                      <Text size="sm" c="dimmed">
                        {percentage}% of total
                      </Text>
                    </div>
                  </Group>
                </Paper>
              );
            },
          }}
          series={[
            {
              name: "votes",
              color: "blue.6",
              label: "Votes",
            },
          ]}
          styles={{
            root: {
              padding: "10px 0",
            },
            tooltipBody: {
              backgroundColor: "#fcfcfc",
              border: "2px solid #f0f0f0",
              minWidth: "auto",
              padding: "8px",
              borderRadius: "8px",
            },
            bar: {
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                filter: "brightness(1.1)",
              },
            },
            legend: {
              justifyContent: "center",
              marginTop: "20px",
              gap: "20px",
            },
            legendItem: {
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              padding: "6px 12px",
              backgroundColor: "var(--mantine-color-gray-0)",
              borderRadius: "8px",
            },
          }}
        />
      </Box>

      {/* Legend */}
      <Group justify="center" mt="lg" gap="xs">
        {chartData.map((item) => (
          <Badge
            key={item.party}
            variant="light"
            radius="lg"
            size="md"
            style={{
              border: `1px solid var(--mantine-color-gray-3)`,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            leftSection={
              <Box
                w={10}
                h={10}
                style={{
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
            }
          >
            <Text size="xs" fw={600} style={{ lineHeight: 1 }}>
              {item.party}{" "}
              <Text
                component="span"
                size="xs"
                c="dimmed"
                style={{ marginLeft: 4 }}
              >
                {((item.votes / totalVotes) * 100).toFixed(1)}%
              </Text>
            </Text>
          </Badge>
        ))}
      </Group>
    </Paper>
  );
};

export default DashboardElectionChart;
