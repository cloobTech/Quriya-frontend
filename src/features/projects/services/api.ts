import { baseApi } from "@src/services/api";
import { toNewProjectDTO, type NewProject } from "@features/projects/types";
import { TagTypes } from "@features/shared";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<
      {
        message: string;
        projects: any[];
      },
      { organizationId: string }
    >({
      query: ({ organizationId }) => ({
        url: `organizations/${organizationId}/projects`,
        method: "GET",
      }),
      providesTags: (_, __, { organizationId }) => [
        { type: TagTypes.PROJECT, id: `LIST-${organizationId}` },
      ],
    }),
    getProject: builder.query<
      {
        message: string;
        project: any;
      },
      { organizationId: string; projectId: string }
    >({
      query: ({ organizationId, projectId }) => ({
        url: `organizations/${organizationId}/projects/${projectId}`,
        method: "GET",
      }),
    }),
    createProject: builder.mutation<
      {
        message: string;
        project: any;
      },
      { organizationId: string; data: NewProject }
    >({
      query: ({ organizationId, data }) => ({
        url: `organizations/${organizationId}/projects`,
        method: "POST",
        body: toNewProjectDTO(data),
      }),
      invalidatesTags: (_, __, { organizationId }) => [
        { type: TagTypes.PROJECT, id: `LIST-${organizationId}` },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
} = projectApi;
