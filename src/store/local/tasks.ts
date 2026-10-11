import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Task } from "@/types/task";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const editingTaskId = ref<number | null>(null);
  const draggedTaskId = ref<number | null>(null);
  const dragOverTarget = ref<string | null>(null);

  const loadTasks = async (): Promise<Task[]> => {
    return tasks.value;
  };

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

    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      task.title = title.trim();
      return task;
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

  const pendingTasks = computed(() => {
    return tasks.value.filter((task) => !task.done);
  });

  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.done);
  });

  const toggleTask = async (id: number, done: boolean) => {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) tasks.value[index].done = done;
  };

  const setEditingTaskId = (task: Task | null): void => {
    editingTaskId.value = null;
    if (task) editingTaskId.value = task.id;
  };

  // Drag and Drop
  const setDraggedTask = (task: Task) => {
    draggedTaskId.value = task.id;
  };
  const setDragOverTarget = (target: string | null): void => {
    dragOverTarget.value = target;
  };
  const clearDraggedTask = (): void => {
    draggedTaskId.value = null;
    dragOverTarget.value = null;
  };

  const handleDrop = async (
    taskId: number,
    targetDone: boolean,
  ): Promise<void> => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (!task || task.done === targetDone) {
      clearDraggedTask();
      return;
    }

    try {
      await toggleTask(taskId, targetDone);
    } catch (err) {
      console.error("Erro ao atualizar tarefa: ", err);
    } finally {
      clearDraggedTask();
    }
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
    draggedTaskId,
    dragOverTarget,
    setDraggedTask,
    clearDraggedTask,
    setDragOverTarget,
    handleDrop,
  };
});
