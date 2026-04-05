<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { ref } from "vue";

const taskTitle = ref("");
const emit = defineEmits(["submit"]);
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const handleSubmit = () => {
  if (!taskTitle.value.trim()) return;
  emit("submit", taskTitle.value);
  taskTitle.value = "";
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    :class="[
      'bg-white dark:bg-rocket-gray-800 p-6 rounded-lg border border-rocket-gray-200 dark:border-rocket-gray-700',
    ]"
  >
    <div class="flex gap-4">
      <input
        v-model="taskTitle"
        type="text"
        placeholder="Digite o título da tarefa"
        required
        :class="[
          'flex-1 px-4 py-3 border border-rocket-gray-300 dark:border-rocket-gray-700 rounded-lg',
          'bg-white dark:bg-rocket-gray-800 text-rocket-gray-900 dark:text-white',
          'focus:outline-none focus:ring-rocket-purple-500 focus:border-rocket-purple-500 transition-colors',
        ]"
      />
      <button
        type="submit"
        :disabled="loading"
        :class="[
          'px-6 py-3 bg-rocket-purple-500 hover:bg-rocket-purple-600 rounded-lg',
          'text-white font-medium cursor-pointer transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center gap-2',
        ]"
      >
        <Plus class="w-5 h-5" />
        Adicionar
      </button>
    </div>
  </form>
</template>
