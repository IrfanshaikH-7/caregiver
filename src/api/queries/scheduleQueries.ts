// src/api/queries/scheduleQueries.ts
import type { Schedule } from '../../types/schedule';
import api from '../../lib/axios';

export const getSchedule = async (id: string): Promise<Schedule[]> => {
  try {
    const response = await api.get(`/v1/schedules/today/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
};