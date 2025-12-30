import { baseApi } from "@src/services/api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: ({ organizationId }: { organizationId: string }) =>
        `organizations/${organizationId}/users/me`,
    }),
  }),
});
export const { useGetCurrentUserQuery } = userApi;
