<script setup lang="ts">
import type { Task } from "@/services/tasksService";
import TaskItem from "./TaskItem.vue";
import { useTasksStore } from "@/store/tasksStore";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array<Task>,
    required: true,
  },
  dropZone: {
    type: String,
    required: true,
  },
});

const tasksStore = useTasksStore();

const handleDragOver = () => {
  tasksStore.setDragOverTarget(props.title);
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  const taskId = parseInt(event.dataTransfer?.getData("text/plain") || "");
  const targetDone = props.dropZone === "completed";
  await tasksStore.handleDrop(taskId, targetDone);
};

const handleDragLeave = () => {
  tasksStore.setDragOverTarget(null);
};
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold text-rocket-gray-900 dark:text-white mb-4">
      {{ title }}
    </h2>
    <div
      :data-drop-zone="dropZone"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
      @dragleave="handleDragLeave"
      class="space-y-3 min-h-25 text-rocket-gray-600 dark:text-rocket-gray-300"
    >
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>
