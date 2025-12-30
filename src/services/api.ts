import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@src/constants";
import type { RootState } from "@src/context/store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).authentication.token;

      // ❌ auth endpoints do NOT need token
      if (token && !endpoint.startsWith("login")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // tagTypes: ["Grades", "Verification", "Student", "Calendar"],
  endpoints: () => ({}),
});
