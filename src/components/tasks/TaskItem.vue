<script setup lang="ts">
import type { Task } from "@/services/tasksService";

const props = defineProps<{
  task: Task;
}>();
</script>

<template>
  <div>
    <label>
      <input type="checkbox" :checked="task.done" class="sr-only peer" />
      <div
        :class="[
          'w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
          task.done
            ? 'bg-rocket-purple-500 border-rocket-purple-500'
            : 'bg-transparent border-rocket-gray-300 dark:border-rocket-gray-600',
          'peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-rocket-purple-500',
        ]"
      ></div>
    </label>
    <div>
      <p>{{ task.title }}</p>
    </div>
  </div>
</template>
