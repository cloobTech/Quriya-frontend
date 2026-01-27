import { createBrowserRouter } from "react-router-dom";
import { Login } from "@features/auth";
import ProtectedLayout from "@src/layouts/ProtectedLayout";
import OrganizationLayout from "@src/layouts/OrganizationLayout";
import DashbordLayout from "@src/layouts/DashboardLayout";
import { ElectionProjectPage } from "@features/projects";
import { Dashboard } from "@features/dashboard";
import { AddUsersToOrganization } from "@features/organization";
import {
  LocationCoverage,
  LocationCoverageMock,
} from "@features/location_coverage";
import { Agents } from "@features/agents";
import { PollingUnit, PollingUnitDetails } from "@features/polling_units";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/organization",
    element: <ProtectedLayout />,
    children: [
      {
        element: <OrganizationLayout />,
        children: [
          {
            path: "add-users",
            element: <AddUsersToOrganization />,
          },
          {
            path: "projects",
            element: <ElectionProjectPage />,
          },
        ],
      },
      {
        path: "projects/:projectId",
        element: <DashbordLayout />, // includes sidebar & project nav
        children: [
          { index: true, path: "dashboard", element: <Dashboard /> },
          {
            path: "location-coverage",
            element: <LocationCoverage />,
          },

          {
            path: "agents",
            element: <Agents />,
          },
          {
            path: "polling-units",
            element: <PollingUnit />,
          },
          {
            path: "polling-units/:pollingUnitId/details",
            element: <PollingUnitDetails />,
          },
        ],
      },
    ],
  },

  // development

  {
    path: "dashboard",
    element: <DashbordLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "location-coverage",
        element: <LocationCoverage />,
      },
      {
        path: "location-coverage-mock",
        element: <LocationCoverageMock />,
      },
      {
        path: "agents",
        element: <Agents />,
      },
    ],
  },
]);
