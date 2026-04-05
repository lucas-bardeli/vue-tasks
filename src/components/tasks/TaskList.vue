<script setup lang="ts">
import type { Task } from "@/services/tasksService";
import TaskItem from "./TaskItem.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array<Task>,
    required: true,
  },
});
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold text-rocket-gray-900 dark:text-white mb-4">
      {{ title }}
    </h2>
    <div
      class="space-y-3 min-h-25 text-rocket-gray-600 dark:text-rocket-gray-300"
    >
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>
