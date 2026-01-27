import { Outlet, Navigate, ScrollRestoration } from "react-router-dom";
import { useAppSelector, UserRole } from "@features/shared";
import { Loader } from "@mantine/core";

// const AUTHORIZED_ROLES = ["super_admin", "org_admin", "organization_owner"];

const AUTHORIZED_ROLES = Object.values(UserRole);

const ProtectedLayout = () => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );
  const userRole = useAppSelector((state) => state.organization.userRole);

  if (!organizationId || !userRole) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!AUTHORIZED_ROLES.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

export default ProtectedLayout;
