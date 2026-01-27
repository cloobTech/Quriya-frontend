import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserRoleType } from "@features/shared";

type OrganizationState = {
  organizationId: string;
  userRole: UserRoleType | null;
};

const initialState: OrganizationState = {
  organizationId: "",
  userRole: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization(state, action: PayloadAction<OrganizationState>) {
      return {
        ...state,
        organizationId: action.payload.organizationId,
        userRole: action.payload.userRole,
      };
    },
  },
});

export const { setOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
