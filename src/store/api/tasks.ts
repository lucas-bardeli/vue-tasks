import { defineStore } from "pinia";
import { tasksService } from "@/services/tasksService";
import { ref } from "vue";
import type { Task } from "@/types/task";
import { useTaskBoard } from "@/composables/useTaskBoard";

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
      console.error("Erro ao carregar tarefas:", err);
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
      console.error("Erro ao criar tarefa:", err);
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
      console.error("Erro ao atualizar tarefa:", err);
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
      console.error("Erro ao deletar tarefa:", err);
    } finally {
      loading.value = false;
    }
  };

  const toggleTask = async (id: number, done: boolean): Promise<Task> => {
    try {
      const updatedTask = await tasksService.update(id, { done });
      const index = tasks.value.findIndex((task) => task.id === id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
      return updatedTask;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao atualizar tarefa";
      console.error("Erro ao atualizar tarefa:", err);
      throw err;
    }
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
