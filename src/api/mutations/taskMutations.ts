// src/api/mutations/taskMutations.ts
export const createTask = (data: any) => {
  // Placeholder for creating task data
  return Promise.resolve(data);
};

export const updateTask = (id: string, data: any) => {
  // Placeholder for updating task data
  return Promise.resolve({ id, ...data });
};

export const deleteTask = (id: string) => {
  // Placeholder for deleting task data
  return Promise.resolve({ id, success: true });
};