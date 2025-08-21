
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Habit } from '../slices/habitsSlice';

export const habitsApi = createApi({
  reducerPath: 'habitsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllHabits: builder.query<Habit[], { limit?: number; offset?: number }>({
      query: (params) => ({ url: '/habits', params }),
    }),
    getHabit: builder.query<Habit, { id: string; limit?: number; offset?: number }>({
      query: (params) => ({
        url: `/habits/${params.id}`, 
        params: {
          limit: params.limit,
          offset: params.offset,
        },
      }),
    }),
    
    createHabit: builder.mutation<Habit, { title: string; description?: string }>({
      query: (data) => ({ url: '/habits', method: 'POST', body: data }),
    }),
    updateHabit: builder.mutation<Habit, { id: string; title?: string; description?: string }>({
      query: ({ id, ...data }) => ({ url: `/habits/${id}`, method: 'PATCH', body: data }),
    }),
    deleteHabit: builder.mutation<void, string>({
      query: (id) => ({ url: `/habits/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetAllHabitsQuery,
  useCreateHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
} = habitsApi;
