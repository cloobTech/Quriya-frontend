import { baseApi } from "@src/services/api";
import { TagTypes } from "@features/shared";

type AssignPollingUnits = {
  user_id: string;
  pu_coverage_ids: string[];
};

export const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<
      {
        message: string;
        members: any[];
      },
      { organizationId: string }
    >({
      query: ({ organizationId }) => ({
        url: `organizations/${organizationId}/members`,
        method: "GET",
      }),
      providesTags: (_, __, { organizationId }) => [
        { type: TagTypes.MEMBER, id: `LIST-${organizationId}` },
      ],
    }),
    getMember: builder.query<
      {
        message: string;
        member: any;
      },
      { organizationId: string; memberId: string }
    >({
      query: ({ organizationId, memberId }) => ({
        url: `organizations/${organizationId}/members/${memberId}`,
        method: "GET",
      }),
    }),
    assignPollingUnitsToAgent: builder.mutation({
      query: ({
        organizationId,
        projectId,
        data,
      }: {
        organizationId: string;
        projectId: string;
        data: AssignPollingUnits;
      }) => ({
        url: `organizations/${organizationId}/projects/${projectId}/assignments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, { projectId }) => [
        { type: TagTypes.AGENT, id: `LIST-${projectId}` },
      ],
    }),
    agentStats: builder.query({
      query: ({
        organizationId,
        projectId,
      }: {
        organizationId: string;
        projectId: string;
      }) => ({
        url: `organizations/${organizationId}/projects/${projectId}/agents/statistics`,
      }),
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberQuery,
  useAssignPollingUnitsToAgentMutation,
  useAgentStatsQuery,
} = memberApi;
