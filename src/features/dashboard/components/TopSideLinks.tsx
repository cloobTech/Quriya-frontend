import React from "react";
// import AdminTopSideLinks from "./AdminTopSideLinks";
import OrgAdminTopLinks from "./OrgAdminTopLinks";
// import ParentTopSideLinks from "./ParentTopSideLinks";
import type { SideLinkProps } from "../types";
// import { useGetCurrentUserRole } from "@features/shared";
// import { ROLES } from "@src/constants/roles";

const TopSideLinks: React.FC<SideLinkProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  //   const { userRole } = useGetCurrentUserRole();

  return (
    <>
      <OrgAdminTopLinks isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </>
  );
};

export default TopSideLinks;
