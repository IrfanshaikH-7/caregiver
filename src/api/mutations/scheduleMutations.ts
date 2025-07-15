// src/api/mutations/scheduleMutations.ts
export const createSchedule = (data: any) => {
  // Placeholder for creating schedule data
  return Promise.resolve(data);
};

export const updateSchedule = (id: string, data: any) => {
  // Placeholder for updating schedule data
  return Promise.resolve({ id, ...data });
};

export const deleteSchedule = (id: string) => {
  // Placeholder for deleting schedule data
  return Promise.resolve({ id, success: true });
};