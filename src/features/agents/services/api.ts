import { baseApi } from "@src/services/api";
import { TagTypes } from "@features/shared";
import { cleanParams } from "@features/shared";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query({
      query: ({
        organizationId,
        projectId,
        search,
        status,
        state_id,
        lga_id,
        ward_id,
        page,
        page_size,
      }: {
        organizationId: string;
        projectId: string;
        search?: string | null;
        status?: string | null;
        state_id?: string | null;
        lga_id?: string | null;
        ward_id?: string | null;
        page?: number | null;
        page_size?: number | null;
      }) => ({
        url: `organizations/${organizationId}/projects/${projectId}/agents`,
        method: "GET",
        params: cleanParams({
          search,
          status,
          state_id,
          lga_id,
          ward_id,
          page,
          page_size,
        }),
      }),
      providesTags: (_, __, { projectId }) => [
        { type: TagTypes.AGENT, id: `LIST-${projectId}` },
      ],
    }),
  }),
});

export const { useGetAgentsQuery } = agentApi;
