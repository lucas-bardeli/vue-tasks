<script setup lang="ts">
import { ref } from "vue";
import VueTasks from "@/components/VueTasks.vue";
import { User, Lock, UserPlus, Eye, EyeOff } from "lucide-vue-next";
import { togglePasswordVisibility, showPassword } from "@/utils/password";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
const loading = ref(false);

const form = ref({
  username: "",
  password: "",
});

const handleRegister = async () => {
  try {
    await authStore.register(form.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    :class="[
      'flex items-center justify-center bg-rocket-gray-50 dark:bg-rocket-gray-900',
      'py-16 px-4 sm:px-6 lg:px-8',
    ]"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <VueTasks />
        <h2 class="text-2xl font-bold text-rocket-gray-900 dark:text-white">
          Crie sua conta
        </h2>
        <p class="mt-2 text-sm text-rocket-gray-600 dark:text-rocket-gray-400">
          Já tem uma conta?
          <router-link
            to="/login"
            :class="[
              'font-medium text-rocket-purple-500 hover:text-rocket-purple-600 hover:underline',
              'dark:text-rocket-purple-400 dark:hover:text-rocket-purple-300 transition-all duration-200',
            ]"
          >
            Faça login
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="username" class="sr-only">Usuário</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              >
                <User
                  class="h-5 w-5 text-rocket-gray-400 dark:text-rocket-gray-300"
                />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                v-model="form.username"
                required
                placeholder="Crie o nome do seu usuário"
                :class="[
                  'relative block w-full pl-10 pr-3 py-3 border border-rocket-gray-300',
                  'dark:border-rocket-gray-700 placeholder-rocket-gray-500 dark:placeholder-rocket-gray-300',
                  'text-rocket-gray-900 dark:text-white rounded-lg bg-white dark:bg-rocket-gray-800',
                  'focus:outline-none focus:ring-rocket-purple-500 focus:border-rocket-purple-500 transition-colors',
                ]"
              />
            </div>
          </div>
          <div>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              >
                <Lock
                  class="h-5 w-5 text-rocket-gray-400 dark:text-rocket-gray-300"
                />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                v-model="form.password"
                placeholder="Crie a sua senha"
                :class="[
                  'relative block w-full pl-10 pr-3 py-3 border border-rocket-gray-300',
                  'dark:border-rocket-gray-700 placeholder-rocket-gray-500 dark:placeholder-rocket-gray-300',
                  'text-rocket-gray-900 dark:text-white rounded-lg bg-white dark:bg-rocket-gray-800',
                  'focus:outline-none focus:ring-rocket-purple-500 focus:border-rocket-purple-500 transition-colors',
                ]"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="togglePasswordVisibility"
              >
                <Eye
                  v-if="showPassword"
                  class="h-5 w-5 text-rocket-gray-400 hover:text-rocket-gray-600 dark:hover:text-rocket-gray-300 hover:cursor-pointer"
                />
                <EyeOff
                  v-else
                  class="h-5 w-5 text-rocket-gray-400 hover:text-rocket-gray-600 dark:hover:text-rocket-gray-300 hover:cursor-pointer"
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :class="[
              'group relative w-full flex justify-center py-3 px-4 border',
              'border-transparent text-sm font-medium rounded-lg text-white',
              'bg-rocket-purple-500 hover:bg-rocket-purple-600 focus:outline-none',
              'focus:ring-2 focus:ring-offset-2 focus:ring-rocket-purple-500',
              'disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
            ]"
          >
            <UserPlus class="w-5 h-5 mr-2" />
            Criar conta
          </button>
        </div>
      </form>

      <div
        v-if="authStore.hasError"
        class="p-3 bg-red-200 text-red-700 text-center rounded-lg font-bold"
      >
        <p>{{ authStore?.error }}</p>
      </div>
    </div>
  </div>
</template>
