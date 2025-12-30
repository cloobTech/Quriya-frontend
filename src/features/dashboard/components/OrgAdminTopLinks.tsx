import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsHouse,
  BsGeoAlt,
  BsPeople,
  BsExclamationTriangle,
  BsFileEarmarkText,
} from "react-icons/bs";
import type { SideLinkProps } from "../types";

const AdminTopSideLinks: React.FC<SideLinkProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  // Classes for active and inactive links
  const activeClass =
    "flex items-center gap-2 p-2 text-accent bg-primary rounded-lg transition-all duration-300 border ";
  const inactiveClass =
    "flex items-center gap-2 p-2 text-dark rounded transition-all duration-300 ";

  // Class names for expanded/collapsed text
  const expandCollapseClass = isExpanded
    ? "max-w-xs opacity-100"
    : "max-w-0 opacity-0";

  return (
    <div className={`pb-8 flex flex-col gap-4 transition-all duration-300`}>
      {/* Links */}
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        end
        title="dashboard"
      >
        <div className="flex items-center gap-2">
          <BsHouse size={12} />
          <span
            className={`text-xs transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Dashboard
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/students"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="students"
      >
        <div className="flex items-center gap-2">
          <BsPeople size={12} />
          <span
            className={`text-xs transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Agents
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/classrooms"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="classrooms"
      >
        <div className="flex items-center gap-2">
          <BsGeoAlt size={12} />
          <span
            className={`text-xs transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Polling Units
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/employees"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="employees"
      >
        <div className="flex items-center gap-2">
          <BsExclamationTriangle size={12} />
          <span
            className={`text-xs transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Incidents
          </span>
        </div>
      </NavLink>

      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/attendance"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="attendance"
      >
        <div className="flex items-center gap-2">
          <BsFileEarmarkText size={12} />
          <span
            className={`text-xs transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
          Results
          </span>
        </div>
      </NavLink>
    </div>
  );
};

export default AdminTopSideLinks;
