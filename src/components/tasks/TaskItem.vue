<script setup lang="ts">
import type { Task } from "@/services/tasksService";
import { Check } from "lucide-vue-next";
import { useTasksStore } from "@/store/tasksStore";

const props = defineProps<{
  task: Task;
}>();

const tasksStore = useTasksStore();

const handleToggleTask = async () => {
  try {
    await tasksStore.toggleTask(props.task.id, !props.task.done);
  } catch (err) {
    console.error("Erro ao atualizar tarefa: ", err);
  }
};
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-rocket-gray-800 p-3 rounded-lg border border-rocket-gray-200 dark:border-rocket-gray-700',
      task.done ? 'opacity-70' : '',
      'flex items-center gap-4 transition-all',
    ]"
  >
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        :checked="task.done"
        class="sr-only peer"
        @change="handleToggleTask"
      />
      <div
        :class="[
          'w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
          task.done
            ? 'bg-rocket-purple-500 border-rocket-purple-500'
            : 'bg-transparent border-rocket-gray-300 dark:border-rocket-gray-600',
          'peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-rocket-purple-500',
        ]"
      >
        <Check v-if="task.done" class="w-5 h-5 text-white" />
      </div>
    </label>
    <div class="flex-1">
      <p
        :class="[
          'cursor-pointer select-none',
          task.done
            ? 'line-through text-rocket-gray-500 dark:text-rocket-gray-300'
            : 'text-rocket-gray-900 dark:text-white',
        ]"
      >
        {{ task.title }}
      </p>
    </div>
  </div>
</template>
