import { baseApi } from "@src/services/api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; message: string; token_type: string }, // response type
      { email: string; password: string }
    >({
      query: ({ email, password }) => {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);

        return {
          url: "/auth/login",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
