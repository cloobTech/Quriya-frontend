import React from "react";
import { theme } from "@src/theme";
import { Button, Badge } from "@mantine/core";
import { BsArrowRepeat, BsDot } from "react-icons/bs";

const PageHeader = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <div>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Dashboard Overview</p>
          <Badge
            tt={"none"}
            leftSection={<BsDot size={24} />}
            radius={"xl"}
            size="sm"
            variant="light"
            color="rgba(68, 190, 23, 1)"
            styles={{
              root: {
                padding: "0 ",
                paddingRight: "8px",
              },
            }}
          >
            Live Data
          </Badge>
        </div>
        <small className="text-gray-500">
          Real-time election monitoring and management
        </small>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-500 text-xs">
          Last Updated :{" "}
          <span className="font-bold text-gray-800"> 6:17:45 PM</span>
        </p>
        <Button
          radius="xl"
          size="xs"
          color={"white"}
          c={theme.colors?.primary?.[5]}
          leftSection={<BsArrowRepeat size={16} />}
          style={
            {
              "--button-hover": "#fafafa",
              "--button-hover-color": "black",
            } as React.CSSProperties
          }
        >
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
