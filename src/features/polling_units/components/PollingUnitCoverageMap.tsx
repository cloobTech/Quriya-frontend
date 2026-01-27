import React from "react";
import {
  BsGeoAlt,
  BsGeoAltFill,
  BsCheckCircle,
  BsXCircle,
} from "react-icons/bs";
import { CustomMap } from "@features/shared";

// Sample Kano polling units
const pollingUnits = [
  { id: 1, name: "PU 101", lat: 12.0022, lon: 8.5919, status: "active" },
  { id: 2, name: "PU 102", lat: 12.004, lon: 8.5935, status: "completed" },
  { id: 3, name: "PU 103", lat: 12.001, lon: 8.589, status: "inactive" },
  { id: 4, name: "PU 104", lat: 12.002, lon: 8.59, status: "active" },
  { id: 5, name: "PU 105", lat: 12.003, lon: 8.592, status: "inactive" },
];

// Status configuration with icons
const statusConfig = {
  active: {
    color: "#10B981", // green-500
    icon: BsGeoAltFill,
    label: "Active",
  },
  completed: {
    color: "#3B82F6", // blue-500
    icon: BsCheckCircle,
    label: "Completed",
  },
  inactive: {
    color: "#EF4444", // red-500
    icon: BsXCircle,
    label: "Inactive",
  },
};

const PollingUnitCoverageMap: React.FC = () => {
  return (
    <div className="grid gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Polling Unit Coverage (Kano)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time monitoring of polling unit status
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-700">
              {pollingUnits.filter((pu) => pu.status === "active").length}{" "}
              Active
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            <BsGeoAlt size={14} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {pollingUnits.length} Total
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-[500px] w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
        <CustomMap pollingUnits={pollingUnits} />
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mt-2">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = pollingUnits.filter(
            (pu) => pu.status === status,
          ).length;
          const percentage = (count / pollingUnits.length) * 100;

          return (
            <div
              key={status}
              className="p-4 rounded-lg border border-gray-100 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <config.icon size={18} style={{ color: config.color }} />
                  </div>
                  <span className="font-semibold text-gray-700">
                    {config.label}
                  </span>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: config.color }}
                >
                  {count}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: config.color,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {percentage.toFixed(1)}% of total polling units
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollingUnitCoverageMap;
