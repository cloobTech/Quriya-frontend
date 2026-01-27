import { baseApi } from "@src/services/api";

export const locationCoverageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStateCoverage: builder.query({
      query: ({
        organizationId,
        projectId,
      }: {
        organizationId: string;
        projectId: string;
      }) =>
        `organizations/${organizationId}/projects/${projectId}/coverage/states`,
    }),
    getLGACoverage: builder.query({
      query: ({
        organizationId,
        projectId,
        state_coverage_id,
      }: {
        organizationId: string;
        projectId: string;
        state_coverage_id: string;
      }) =>
        `organizations/${organizationId}/projects/${projectId}/coverage/lgas?state_coverage_id=${state_coverage_id}`,
    }),
    getWardCoverage: builder.query({
      query: ({
        organizationId,
        projectId,
        lga_coverage_id,
      }: {
        organizationId: string;
        projectId: string;
        lga_coverage_id: string;
      }) =>
        `organizations/${organizationId}/projects/${projectId}/coverage/wards?lga_coverage_id=${lga_coverage_id}`,
    }),
    getPuCoverage: builder.query({
      query: ({
        organizationId,
        projectId,
        ward_coverage_id,
        assigned_status = null,
      }: {
        organizationId: string;
        projectId: string;
        ward_coverage_id: string;
        assigned_status: boolean | null;
      }) =>
        `organizations/${organizationId}/projects/${projectId}/coverage/polling-units?ward_coverage_id=${ward_coverage_id}&assigned_status=${assigned_status}`,
    }),
  }),
});

export const {
  useGetStateCoverageQuery,
  useGetLGACoverageQuery,
  useGetWardCoverageQuery,
  useGetPuCoverageQuery,
} = locationCoverageApi;
