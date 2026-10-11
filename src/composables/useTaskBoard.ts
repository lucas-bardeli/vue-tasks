import { computed, ref, type Ref } from "vue";
import type { Task } from "@/types/task";

export const useTaskBoard = (
  tasks: Ref<Task[]>,
  toggleTask: (id: number, done: boolean) => Promise<unknown>,
) => {
  const editingTaskId = ref<number | null>(null);
  const pendingTasks = computed(() => tasks.value.filter((task) => !task.done));
  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.done),
  );
  const draggedTaskId = ref<number | null>(null);
  const dragOverTarget = ref<string | null>(null);

  const setEditingTaskId = (task: Task | null): void => {
    editingTaskId.value = task?.id ?? null;
  };

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
    const task = tasks.value.find((item) => item.id === taskId);
    if (!task || task.done === targetDone) {
      clearDraggedTask();
      return;
    }

    try {
      await toggleTask(taskId, targetDone);
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    } finally {
      clearDraggedTask();
    }
  };

  return {
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
  };
};
