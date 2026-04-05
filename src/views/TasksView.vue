<script setup lang="ts">
import { Info, LoaderCircle } from "lucide-vue-next";
import TaskForm from "@/components/tasks/TaskForm.vue";
import TaskList from "@/components/tasks/TaskList.vue";
import { useTasksStore } from "@/store/tasksStore";
import { onMounted } from "vue";

const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.loadTasks();
});

const handleCreateTask = async (title: string) => {
  try {
    await tasksStore.createTask(title);
  } catch (err) {
    console.error("Erro ao criar tarefa: ", err);
  }
};
</script>

<template>
  <div>
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <h1
          class="text-2xl font-bold text-rocket-gray-900 dark:text-white flex items-center gap-2"
        >
          Minhas Tarefas
          <p
            title="Você pode editar uma tarefa clicando duas vezes nela, pressione enter para salvar e esc para cancelar"
          >
            <Info class="w-5 h-5 text-rocket-purple-500" />
          </p>
        </h1>
      </div>

      <TaskForm :loading="tasksStore.loading" @submit="handleCreateTask" />

      <div
        v-if="tasksStore.error"
        class="p-2 bg-red-200 text-center rounded-lg font-bold"
      >
        <p class="text-red-700">{{ tasksStore.error }}</p>
      </div>

      <div
        v-if="tasksStore.loading && tasksStore.tasks.length === 0"
        class="flex items-center justify-center gap-2 text-center py-8"
      >
        <LoaderCircle class="w-8 h-8 animate-spin text-rocket-purple-500" />
        <p class="text-rocket-gray-600 dark:text-rocket-gray-300">
          Carregando tarefas...
        </p>
      </div>

      <div v-else-if="tasksStore.tasks.length === 0" class="text-center py-8">
        <p class="text-rocket-gray-600 dark:text-rocket-gray-300">
          Nenhuma tarefa cadastrada ainda.
        </p>
      </div>

      <div v-else class="space-y-8">
        <TaskList title="Pendentes" :tasks="tasksStore.pendingTasks" />
        <TaskList title="Concluídas" :tasks="tasksStore.completedTasks" />
      </div>
    </div>
  </div>
</template>
