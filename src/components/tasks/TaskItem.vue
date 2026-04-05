<script setup lang="ts">
import type { Task } from "@/services/tasksService";
import { ref, computed } from "vue";

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
