<script setup lang="ts">
import type { Task } from "@/services/tasksService";

const props = defineProps<{
  task: Task;
}>();
</script>

<template>
  <div>
    <label>
      <input type="checkbox" :checked="task.done" />
    </label>
    <div>
      <p>{{ task.title }}</p>
    </div>
  </div>
</template>
