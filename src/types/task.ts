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
