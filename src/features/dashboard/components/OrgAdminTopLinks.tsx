import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsHouse,
  BsGeoAlt,
  BsPeople,
  BsExclamationTriangle,
  BsFileEarmarkText,
  BsPinMapFill,
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
        to="dashboard"
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
      {/* <NavLink
        onClick={() => setIsExpanded(false)}
        to="location-coverage"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        end
        title="location-coverage"
      >
        <div className="flex items-center gap-2">
          <BsPinMapFill size={12} />
          <span
            className={`text-xs transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Location Coverage
          </span>
        </div>
      </NavLink> */}

      <NavLink
        onClick={() => setIsExpanded(false)}
        to="agents"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="agents"
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
        to="polling-units"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="polling-units"
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
        to="results"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="results"
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
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="incident-report"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="incident-report"
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
    </div>
  );
};

export default AdminTopSideLinks;
