<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import TaskForm from "@/components/tasks/TaskForm.vue";
</script>

<template>
  <div>
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-rocket-gray-900 dark:text-white">
          Minhas Tarefas
        </h1>
      </div>

      <TaskForm />

      <div class="p-3 bg-red-200 text-center rounded-lg font-bold">
        <p class="text-red-700">Se tiver erro aqui</p>
      </div>

      <div class="flex items-center justify-center gap-2 text-center py-8">
        <LoaderCircle class="w-8 h-8 animate-spin text-rocket-purple-500" />
        <p class="text-rocket-gray-600 dark:text-rocket-gray-300">
          Carregando tarefas...
        </p>
      </div>

      <div class="text-center py-8">
        <p class="text-rocket-gray-600 dark:text-rocket-gray-300">
          Nenhuma tarefa cadastrada ainda.
        </p>
      </div>

      <div>
        <p>Lista de tarefas aqui</p>
      </div>
    </div>
  </div>
</template>
