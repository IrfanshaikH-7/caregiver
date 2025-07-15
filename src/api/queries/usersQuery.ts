// src/api/queries/usersQuery.ts
import api from '../../lib/axios';
import type { User } from '../../types/user';

export const getUserData = (id: string): Promise<User> => {
  return api.get(`/v1/user/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching user data for ID ${id}:`, error);
      throw error;
    });
};