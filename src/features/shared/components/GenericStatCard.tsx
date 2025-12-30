import React from "react";
import { Badge } from "@mantine/core";

interface BadgeProps {
  text: string;
  color?: string;
}

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  badge?: BadgeProps[];
  iconBgColor?: string;
}

const GenericStatCard: React.FC<StatCardProps> = ({
  title,
  description,
  icon,
  badge,
  iconBgColor,
}) => {
  const iconColor = iconBgColor ? `${iconBgColor}` : "text-dark";
  return (
    <div
      className={`flex flex-col justify-between gap-2 bg-white rounded-xl shadow p-3 card-gradient min-h-[100px] `}
    >
      <div className="flex  justify-between gap-4">
        <div className="leading-none">
          <h3 className="text-gray-600 text-xs">{title}</h3>
          <h1 className=" text-2xl text-primary font-bold">{description}</h1>
        </div>
        <div className={iconColor}>{icon}</div>
      </div>
      <div className="font-bold ">
        {badge &&
          badge.map((item: BadgeProps, index) => (
            <Badge
              key={index}
              className="mr-2"
              tt={"none"}
              radius={"xl"}
              size="sm"
              variant="light"
              color={item.color || "gray"}
            >
              {item.text}
            </Badge>
          ))}
      </div>
    </div>
  );
};

export default GenericStatCard;
