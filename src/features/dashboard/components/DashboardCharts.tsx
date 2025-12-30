import React from "react";
import { BarChart } from "@mantine/charts";
import { BsArrowRepeat, BsBarChart } from "react-icons/bs";
import { Button } from "@mantine/core";

// const data = [
//   {
//     label: "Votes",
//     LP: 4000,
//     PDP: 3000,
//     APC: 2000,
//     Other: 2780,
//   },
// ];

export const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

const DashboardCharts: React.FC = () => {
  return (
    <div className="grid gap-4 p-3 bg-white rounded-2xl ">
      <div className="flex justify-between items-center">
        <p className="text-dark text-lg font-bold flex items-center gap-2">
          <BsBarChart size={20} /> Highest Vote count
        </p>
        <Button
          radius="xl"
          size="xs"
          variant="light"
          leftSection={<BsArrowRepeat size={16} />}
        >
          Refresh Data
        </Button>
      </div>
      <div className="relative">
        <BarChart
          h={400}
          data={data}
          dataKey="month"
          tooltipAnimationDuration={200}
          valueFormatter={(value) =>
            new Intl.NumberFormat("en-US").format(value)
          }
          withBarValueLabel
          withLegend
          tooltipProps={{
            cursor: { fill: "#f0f0f0" },
          }}
          styles={{
            legend: {
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            },
            legendItem: {
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
              gap: "4px",
            },
            tooltipBody: {
              backgroundColor: "#fcfcfc",
              border: "2px solid #f0f0f0",
              minWidth: "auto",
              padding: "8px",
              borderRadius: "8px",
            },
            tooltipItem: {
              display: "flex",
              gap: "10px",
            },
            tooltipItemBody: {
              display: "flex",
              height: "20px",
              width: "130px",
            },

            tooltipItemColor: {
              width: "20px",
              marginTop: "3px",
            },
          }}
          valueLabelProps={{ position: "inside", fill: "white" }}
          legendProps={{ verticalAlign: "bottom", height: 50 }}
          series={[
            { name: "Smartphones", color: "violet.6" },
            { name: "Laptops", color: "blue.6" },
            { name: "Tablets", color: "teal.6" },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
