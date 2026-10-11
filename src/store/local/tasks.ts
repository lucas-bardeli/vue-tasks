import { defineStore } from "pinia";
import { ref } from "vue";
import type { Task } from "@/types/task";
import { storage } from "@/utils/storage";
import { useTaskBoard } from "@/composables/useTaskBoard";

const tasksKey = (userId: string) => `local:tasks:${userId}`;

const getCurrentUserId = (): string => {
  const savedUser = storage.get("local:user");
  if (!savedUser) {
    throw new Error("Faça login para acessar suas tarefas.");
  }

  const user: unknown = JSON.parse(savedUser);
  if (
    typeof user !== "object" ||
    user === null ||
    !("id" in user) ||
    typeof user.id !== "string" ||
    !user.id
  ) {
    throw new Error("Os dados do usuário salvo são inválidos.");
  }

  return user.id;
};

const isTask = (value: unknown): value is Task =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  "title" in value &&
  "done" in value &&
  typeof value.id === "number" &&
  typeof value.title === "string" &&
  typeof value.done === "boolean";

const readTasks = (userId: string): Task[] => {
  const savedTasks = storage.get(tasksKey(userId));
  if (!savedTasks) return [];

  const parsed: unknown = JSON.parse(savedTasks);
  if (!Array.isArray(parsed) || !parsed.every(isTask)) {
    throw new Error("Os dados das tarefas salvas são inválidos.");
  }

  return parsed;
};

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const runLocalAction = async <T>(action: () => T): Promise<T> => {
    loading.value = true;
    error.value = null;
    try {
      return action();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Erro ao acessar tarefas locais.";
      console.error("Erro ao acessar tarefas locais:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const loadTasks = async (): Promise<Task[]> => {
    return runLocalAction(() => {
      tasks.value = readTasks(getCurrentUserId());
      return tasks.value;
    });
  };

  const createTask = async (title: string): Promise<Task> => {
    return runLocalAction(() => {
      const userId = getCurrentUserId();
      const newTask: Task = {
        id:
          tasks.value.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1,
        title: title.trim(),
        done: false,
      };
      const updatedTasks = [...tasks.value, newTask];
      storage.set(tasksKey(userId), JSON.stringify(updatedTasks));
      tasks.value = updatedTasks;
      return newTask;
    });
  };

  const updateTask = async (
    id: number,
    title: string,
  ): Promise<Task | void> => {
    if (!title.trim()) return;

    return runLocalAction(() => {
      const userId = getCurrentUserId();
      const task = tasks.value.find((item) => item.id === id);
      if (!task) return;

      const updatedTask = { ...task, title: title.trim() };
      const updatedTasks = tasks.value.map((item) =>
        item.id === id ? updatedTask : item,
      );
      storage.set(tasksKey(userId), JSON.stringify(updatedTasks));
      tasks.value = updatedTasks;
      return updatedTask;
    });
  };

  const deleteTask = async (id: number): Promise<void> => {
    return runLocalAction(() => {
      const userId = getCurrentUserId();
      const updatedTasks = tasks.value.filter((task) => task.id !== id);
      storage.set(tasksKey(userId), JSON.stringify(updatedTasks));
      tasks.value = updatedTasks;
    });
  };

  const toggleTask = async (id: number, done: boolean) => {
    return runLocalAction(() => {
      const userId = getCurrentUserId();
      const task = tasks.value.find((item) => item.id === id);
      if (!task) return;

      const updatedTask = { ...task, done };
      const updatedTasks = tasks.value.map((item) =>
        item.id === id ? updatedTask : item,
      );
      storage.set(tasksKey(userId), JSON.stringify(updatedTasks));
      tasks.value = updatedTasks;
      return updatedTask;
    });
  };

  const {
    editingTaskId,
    setEditingTaskId,
    pendingTasks,
    completedTasks,
    draggedTaskId,
    dragOverTarget,
    setDraggedTask,
    setDragOverTarget,
    clearDraggedTask,
    handleDrop,
  } = useTaskBoard(tasks, toggleTask);

  return {
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    tasks,
    error,
    loading,
    pendingTasks,
    completedTasks,
    editingTaskId,
    setEditingTaskId,
    draggedTaskId,
    dragOverTarget,
    setDraggedTask,
    clearDraggedTask,
    setDragOverTarget,
    handleDrop,
  };
});
