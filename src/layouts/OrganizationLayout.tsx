import { Outlet } from "react-router-dom";
import { useAppSelector } from "@features/shared";
import { Loader } from "@mantine/core";
import { useGetCurrentUserQuery } from "@features/users";

const OrganizationLayout = () => {
  const { organizationId } = useAppSelector((state) => state.organization);

  const {} = useGetCurrentUserQuery({
    organizationId: organizationId || "",
  });

  if (!organizationId) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizationLayout;
