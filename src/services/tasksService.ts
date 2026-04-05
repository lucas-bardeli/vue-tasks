import { api } from "./api";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface CreateTaskDTO {
  title: string;
  done: boolean;
}

export interface UpdateTaskDTO {
  title?: string;
  done?: boolean;
}

export const tasksService = {
  async getAll(): Promise<Task[]> {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  async create(task: CreateTaskDTO): Promise<Task> {
    const response = await api.post<Task>("/tasks", task);
    return response.data;
  },

  async update(id: number, task: UpdateTaskDTO): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
