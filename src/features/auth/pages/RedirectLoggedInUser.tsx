import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "@features/users";
import { useAppSelector } from "@features/shared";

const RedirectLoggedInUser = () => {
  const navigate = useNavigate();
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );
  const userRole = useAppSelector((state) => state.organization.userRole);

  // Please remember to centralize the roles and pull from a backend
  const authorizedRoles = ["super_admin", "org_admin", "organization_owner"];

  const { isLoading } = useGetCurrentUserQuery({
    organizationId: organizationId,
  });

  useEffect(() => {
    if (!isLoading && userRole) {
      console.log("1");

      if (userRole in authorizedRoles) console.log("2");
      navigate(`/organization/${organizationId}/election-projects`, {
        replace: true,
      });
    }
  }, [isLoading, userRole, navigate]);

  return (
    <div>
      RedirectLoggedInUser
      <p>Please add loading animation</p>
      <p className="text-gray-300">we are setting up your dashboard...</p>
    </div>
  );
};

export default RedirectLoggedInUser;
