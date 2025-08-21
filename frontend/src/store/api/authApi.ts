import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('access-token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, { email: string; password: string }>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
  register: builder.mutation<{ accessToken: string; user: { email: string } }, { email: string; password: string }>({
  query: (data) => ({ url: '/auth/register', method: 'POST', body: data }),
}),

  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
