import { defineStore } from "pinia";
import { tasksService, type Task } from "@/services/tasksService";
import { ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const editingTaskId = ref<number | null>(null);

  // const loadTasks = async (): Promise<void> => {
  //   try {
  //     loading.value = true;
  //     error.value = null;
  //     tasks.value = await tasksService.getAll();
  //   } catch (err) {
  //     const axiosError = err as { response?: { data?: { message?: string } } };
  //     error.value =
  //       axiosError.response?.data?.message || "Erro ao carregar tarefas";
  //     console.log(`Erro ao carregar tarefas: ${err}`);
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  // Lógica local sem api
  const loadTasks = async (): Promise<Task[]> => {
    return tasks.value;
  };

  // const createTask = async (title: string): Promise<Task> => {
  //   loading.value = true;
  //   error.value = null;
  //   try {
  //     const newTask = await tasksService.create({
  //       title: title.trim(),
  //       done: false,
  //     });
  //     tasks.value.push(newTask);
  //     return newTask;
  //   } catch (err) {
  //     const axiosError = err as { response?: { data?: { message?: string } } };
  //     error.value =
  //       axiosError.response?.data?.message || "Erro ao criar tarefa";
  //     console.log(`Erro ao criar tarefa: ${err}`);
  //     throw err;
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  // Lógica local sem api
  const createTask = async (title: string): Promise<Task> => {
    const newTask = { id: Date.now(), title, done: false };
    tasks.value.push(newTask);
    return newTask;
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

  const pendingTasks = computed(() => {
    return tasks.value.filter((task) => !task.done);
  });

  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.done);
  });

  // const toggleTask = async (id: number, done: boolean): Promise<Task> => {
  //   try {
  //     const updatedTask = await tasksService.update(id, { done });
  //     const index = tasks.value.findIndex((task) => task.id === id);
  //     if (index !== -1) {
  //       tasks.value[index] = updatedTask;
  //     }
  //     return updatedTask;
  //   } catch (err) {
  //     const axiosError = err as { response?: { data?: { message?: string } } };
  //     error.value =
  //       axiosError.response?.data?.message || "Erro ao atualizar tarefa";
  //     console.log(`Erro ao atualizar tarefa: ${err}`);
  //     throw err;
  //   }
  // };

  // Lógica local sem api
  const toggleTask = async (id: number, done: boolean) => {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) tasks.value[index].done = done;
  };

  const setEditingTaskId = (task: Task | null): void => {
    editingTaskId.value = null;
    if (task) editingTaskId.value = task.id;
  };

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
  };
});
