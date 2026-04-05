<script setup lang="ts">
import { Moon, Sun, Rocket } from "lucide-vue-next";
import MenuItem from "./MenuItem.vue";
import { useTheme } from "@/composables/useTheme";
import { useAuthStore } from "@/store/authStore";
import { computed } from "vue";

const { isDark, toggleTheme } = useTheme();
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const username = computed(() => authStore.userName);
</script>

<template>
  <header
    :class="[
      'bg-white dark:bg-rocket-gray-900 border-b border-rocket-gray-200 dark:border-rocket-gray-800',
      'sticky top-0 z-50 py-1',
      'flex items-center justify-center gap-16',
    ]"
  >
    <div class="flex items-center gap-2">
      <Rocket class="w-8 h-8 text-rocket-purple-500" />
      <span
        v-if="isAuthenticated"
        class="text-rocket-gray-700 dark:text-rocket-gray-200 text-lg"
        >Olá, {{ username }}!</span
      >
    </div>
    <MenuItem v-if="!isAuthenticated" title="Login" redirectTo="/login" />
    <MenuItem
      v-if="!isAuthenticated"
      title="Cadastre-se"
      redirectTo="/register"
    />
    <MenuItem v-if="isAuthenticated" title="Tarefas" redirectTo="/tasks" />
    <button
      @click="toggleTheme"
      :class="[
        'p-2 rounded-lg text-rocket-gray-600 dark:text-rocket-gray-300 bg-transparent border border-rocket-gray-200',
        'dark:border-rocket-gray-800 cursor-pointer transition-all duration-200 font-medium',
        'hover:bg-rocket-gray-50 dark:hover:bg-rocket-gray-800 hover:text-rocket-purple-500 dark:hover:text-rocket-purple-400',
      ]"
    >
      <Moon v-if="isDark" />
      <Sun v-else />
    </button>
  </header>
</template>
