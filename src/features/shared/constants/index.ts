import type { MantineColor } from "@mantine/core";

export const ElectionType = {
  PRESIDENTIAL: "presidential",
  GUBERNATORIAL: "gubernatorial",
  SENATORIAL: "senatorial",
  FEDERAL_HOUSE_OF_ASSEMBLY: "federal_house_of_assembly",
  STATE_HOUSE_OF_ASSEMBLY: "state_house_of_assembly",
  LOCAL_GOVERNMENT: "local_government",
  WARD: "ward",
  COUNCILLORSHIP: "councillorship",
  OTHERS: "others",
} as const;

export const TagTypes = {
  PROJECT: "project",
  MEMBER: "member",
  AGENT: "agent",
  POLLING_UNIT: "polling_unit",
} as const;

export const UserRole = {
  SUPER_ADMIN: "super_admin",
  ORG_ADMIN: "org_admin",
  STAFF: "staff",
  ORG_OWNER: "organization_owner",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export const PU_STATUS = {
  DRAFT: "draft",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  SUSPENDED: "suspended",
  CANCELLED: "cancelled",
} as const;

export type PuStatus = (typeof PU_STATUS)[keyof typeof PU_STATUS];

export const PU_STATUS_META: Record<
  PuStatus,
  {
    label: string;
    color: MantineColor;
  }
> = {
  draft: { label: "Draft", color: "gray" },
  ongoing: { label: "Ongoing", color: "blue" },
  completed: { label: "Completed", color: "green" },
  suspended: { label: "Suspended", color: "yellow" },
  cancelled: { label: "Cancelled", color: "red" },
};

export const RESULT_STATUS = {
  PENDING_REVIEW: "pending_review",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;

export type ResultStatusType =
  (typeof RESULT_STATUS)[keyof typeof RESULT_STATUS];

export const RESULT_STATUS_META: Record<
  ResultStatusType,
  {
    label: string;
    color: MantineColor;
  }
> = {
  pending_review: { label: "Pending Review", color: "yellow" },
  verified: { label: "Verified", color: "green" },
  rejected: { label: "Rejected", color: "red" },
};

export const ElectionStatus = {
  COMPLETED: "completed",
  ONGOING: "ongoing",
  CANCELLED: "cancelled",
  SCHEDULED: "scheduled",
  DRAFT: "draft", //BACKWARD COMPATIBILITY
} as const;

export type ElectionStatusType =
  (typeof ElectionStatus)[keyof typeof ElectionStatus];

export const ElectionStatusMeta: Record<
  ElectionStatusType,
  {
    label: string;
    color: MantineColor;
  }
> = {
  completed: { label: "Completed", color: "green" },
  ongoing: { label: "Ongoing", color: "blue" },
  cancelled: { label: "Cancelled", color: "red" },
  scheduled: { label: "Scheduled", color: "yellow" },
  draft: { label: "draft", color: "yellow" },
};
