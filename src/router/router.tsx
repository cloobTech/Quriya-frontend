import { createBrowserRouter } from "react-router-dom";

import { Login, RedirectUser } from "@features/auth";
import { ElectionProjectPage } from "@features/projects";
import { DashbordLayout, Dashboard } from "@features/dashboard";
import { AddUsersToOrganization } from "@features/organization";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/redirect",
    element: <RedirectUser />,
  },
  {
    path: "/organization/:organizationId/add-users",
    element: <AddUsersToOrganization />,
  },
  {
    path: "/organization/:organizationId/election-projects",
    element: <ElectionProjectPage />,
  },

  {
    path: "/dashboard/",
    element: <DashbordLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
