import React from "react";
import { Chip, Group } from "@mantine/core";
import { BsX } from "react-icons/bs";

interface FilterChip {
  type: string;
  label: string;
  value: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onRemove: (type: string) => void;
  className?: string;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  chips,
  onRemove,
  className = "",
}) => {
  if (chips.length === 0) {
    return null;
  }

  return (
    <Group gap="xs" className={className}>
      {chips.map((chip) => (
        <Chip
          key={`${chip.type}-${chip.value}`}
          checked={true}
          variant="light"
          size="sm"
          onClick={() => onRemove(chip.type)}
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
  );
};
