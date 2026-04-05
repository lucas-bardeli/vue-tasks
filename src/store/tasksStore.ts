import { defineStore } from "pinia";
import { tasksService, type Task } from "@/services/tasksService";
import { ref } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const loadTasks = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;
      tasks.value = await tasksService.getAll();
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao carregar tarefas";
      console.log(`Erro ao carregar tarefas: ${err}`);
    } finally {
      loading.value = false;
    }
  };

  const createTask = async (title: string): Promise<Task> => {
    loading.value = true;
    error.value = null;
    try {
      const newTask = await tasksService.create({ title, done: false });
      tasks.value.push(newTask);
      return newTask;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao criar tarefa";
      console.log(`Erro ao criar tarefa: ${err}`);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loadTasks,
    createTask,
    tasks,
    error,
    loading,
  };
});
