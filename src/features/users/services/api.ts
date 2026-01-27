import { baseApi } from "@src/services/api";
import type { NewUser, NewUserDTO } from "@features/users/types";

const toNewUserDTO = (user: NewUser): NewUserDTO => ({
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email,
  role: user.role,
});

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: ({ organizationId }: { organizationId: string }) =>
        `organizations/${organizationId}/users/me`,
    }),
    getOrganizationUsers: builder.query({
      query: ({
        organizationId,
        include_admins,
      }: {
        organizationId: string;
        include_admins: boolean | undefined;
      }) =>
        `organizations/${organizationId}/users${
          include_admins ? "?include_admins=true" : ""
        }`,
    }),
    addUserToOragnization: builder.mutation({
      query: ({
        organizationId,
        data,
      }: {
        organizationId: string;
        data: NewUser[];
      }) => ({
        url: `organizations/${organizationId}/users`,
        method: "POST",
        body: data.map(toNewUserDTO),
      }),
    }),
  }),
});
export const { useGetCurrentUserQuery, useAddUserToOragnizationMutation, useGetOrganizationUsersQuery } =
  userApi;
