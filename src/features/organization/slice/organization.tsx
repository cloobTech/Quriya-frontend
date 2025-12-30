import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Remember to use an enum instead for userRole
// and should be fetched from the backend

type OrganizationState = {
  organizationId: string;
  userRole: string;
};

const initialState: OrganizationState = {
  organizationId: "",
  userRole: "",
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
