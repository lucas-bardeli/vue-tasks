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
      const newTask = await tasksService.create({
        title: title.trim(),
        done: false,
      });
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

  const updateTask = async (
    id: number,
    title: string,
  ): Promise<Task | void> => {
    if (!title.trim()) return;

    loading.value = true;
    error.value = null;

    try {
      const updatedTask = await tasksService.update(id, {
        title: title.trim(),
      });

      const index = tasks.value.findIndex((task) => task.id === id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
      return updatedTask;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao atualizar tarefa";
      console.log(`Erro ao atualizar tarefa: ${err}`);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await tasksService.delete(id);
      tasks.value = tasks.value.filter((task) => task.id !== id);
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao deletar tarefa";
      console.log(`Erro ao deletar tarefa: ${err}`);
    } finally {
      loading.value = false;
    }
  };

  return {
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    tasks,
    error,
    loading,
  };
});
