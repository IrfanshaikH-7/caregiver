// src/api/queries/scheduleQueries.ts
import type { Schedule } from '../../types/schedule';
import api from '../../lib/axios';

export const getSchedule = (id: string): Promise<Schedule[]> => {
  return api.get(`/v1/schedules/today/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching schedules:', error);
      return [];
    });
};