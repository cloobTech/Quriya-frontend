import React from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@mantine/core";
import { BsPower, BsGear, BsBell } from "react-icons/bs";
import type { SideLinkProps } from "../types";

const BottomSideLinks: React.FC<SideLinkProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  // Classes for active and inactive links
  const activeClass =
    "flex items-center gap-2 p-2 text-white bg-primary rounded transition-all duration-300 text-accent text-xs";
  const inactiveClass =
    "flex items-center gap-2 p-2 rounded transition-all duration-300 text-xs text-dark";

  // Class names for expanded/collapsed text
  const expandCollapseClass = isExpanded
    ? "max-w-xs opacity-100"
    : "max-w-0 opacity-0";

  return (
    <div
      className={`pb-2 flex flex-col gap-4 transition-all duration-300 mt-6`}
    >
      {/* Links */}
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/settings"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        <div className="flex items-center gap-2">
          <BsGear />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Settings
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/supports"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        <div className="flex space-between gap-6">
          <div className="flex items-center gap-2">
            <BsBell />
            <span
              className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
            >
              Notifications
            </span>
          </div>
          <Badge
            size="xs"
            radius="sm"
            style={{
              background: "#a3e452",
              color: "#333"
            }}
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            21
          </Badge>
        </div>
      </NavLink>
      <div
        // onClick={() => showModal(<LogoutUser />, {})}
        className={`${inactiveClass} cursor-pointer`}
        role="button"
      >
        <div className="flex items-center gap-2">
          <BsPower />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default BottomSideLinks;
