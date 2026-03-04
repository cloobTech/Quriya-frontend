import { baseApi } from "@src/services/api";
import { TagTypes } from "@features/shared";
import { cleanParams } from "@features/shared";

export const pollingUnitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDetailedPollingUnits: builder.query({
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
        url: `organizations/${organizationId}/projects/${projectId}/coverage/polling-units/detailed`,
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
      providesTags: [TagTypes.POLLING_UNIT],
    }),
    getSinglePollingUnit: builder.query({
      query: ({
        organizationId,
        projectId,
        pollingUnitId,
      }: {
        organizationId: string;
        projectId: string;
        pollingUnitId: string;
      }) => ({
        url: `organizations/${organizationId}/projects/${projectId}/coverage/polling-units/${pollingUnitId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.POLLING_UNIT],
    }),
  }),
});

export const { useGetDetailedPollingUnitsQuery, useGetSinglePollingUnitQuery } =
  pollingUnitApi;
