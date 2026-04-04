<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
import { useTheme } from "@/composables/useTheme";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <header
    class="bg-white dark:bg-rocket-gray-900 border-b border-rocket-gray-200 dark:border-rocket-gray-800 sticky top-0 z-50"
  >
    <div class="flex items-center gap-4">
      <MenuItem title="Login" redirectTo="/login" />
      <MenuItem title="Cadastre-se" redirectTo="/register" />
      <MenuItem title="Tarefas" redirectTo="/tasks" />
      <button
        @click="toggleTheme"
        class="px-4 py-2 rounded-lg text-rocket-gray-600 dark:text-rocket-gray-300 bg-transparent ] border border-rocket-gray-200 dark:border-rocket-gray-800 cursor-pointer transition-all duration-200 font-medium hover:bg-rocket-gray-50 dark:hover:bg-rocket-gray-800 hover:text-rocket-purple-500 dark:hover:text-rocket-purple-400"
      >
        {{ isDark ? "Modo Claro" : "Modo Escuro" }}
      </button>
    </div>
  </header>
</template>
