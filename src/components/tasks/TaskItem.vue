<script setup lang="ts">
import type { Task } from "@/services/tasksService";
import { Check, Trash2, Pencil } from "lucide-vue-next";
import { useTasksStore } from "@/store/tasksStore";
import { computed, ref } from "vue";
import Swal from "sweetalert2";

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

const editingTitle = ref("");
const editingTask = () => {
  editingTitle.value = props.task.title;
  tasksStore.setEditingTaskId(props.task);
};
const isEditing = computed(() => tasksStore.editingTaskId === props.task.id);

const cancelTaskEdit = () => {
  editingTitle.value = "";
  tasksStore.setEditingTaskId(null);
};

const saveTaskEdit = async () => {
  try {
    if (!editingTitle.value.trim()) {
      cancelTaskEdit();
      return;
    }
    await tasksStore.updateTask(props.task.id, editingTitle.value);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Tarefa atualizada com sucesso!",
      showConfirmButton: false,
      timer: 2000,
      theme: "auto",
    });
  } catch (err) {
    console.error("Erro ao atualizar tarefa: ", err);
  } finally {
    cancelTaskEdit();
  }
};

const handleDeleteTask = async () => {
  try {
    await Swal.fire({
      title: "Excluir tarefa?",
      theme: "auto",
      text: "Esta ação não pode ser desfeita!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        tasksStore.deleteTask(props.task.id);
        Swal.fire({
          title: "Excluída!",
          text: "Tarefa excluída com sucesso!",
          icon: "success",
          theme: "auto",
        });
      }
    });
  } catch (err) {
    Swal.fire({
      title: "Erro!",
      text: "Erro ao excluir tarefa!",
      icon: "error",
      theme: "auto",
    });
  }
};

const handleDragStart = (event: DragEvent) => {
  tasksStore.setDraggedTask(props.task);
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", props.task.id.toString());
  }
};
</script>

<template>
  <div
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="tasksStore.clearDraggedTask"
    :class="[
      'bg-white dark:bg-rocket-gray-800 p-3 rounded-lg border border-rocket-gray-200 dark:border-rocket-gray-700',
      task.done ? 'opacity-70' : '',
      'flex items-center gap-4 transition-all',
      tasksStore.draggedTaskId === task.id ? 'opacity-50' : 'hover:shadow-md',
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
      <input
        v-if="isEditing"
        v-model="editingTitle"
        @keyup.esc="cancelTaskEdit"
        @keyup.enter="saveTaskEdit"
        :class="[
          'w-full px-3 py-2 border border-rocket-gray-300 dark:border-rocket-gray-700',
          'rounded-lg bg-white dark:bg-rocket-gray-800 text-rocket-gray-900 dark:text-white',
          'focus:outline-none focus:ring-1 focus:ring-rocket-purple-500 focus:border-rocket-purple-500 transition-colors',
        ]"
      />
      <p
        v-else
        @dblclick="editingTask"
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
    <div class="flex gap-2">
      <button
        v-if="!isEditing"
        @click="editingTask"
        :class="[
          'p-2 bg-rocket-gray-100 dark:bg-rocket-gray-700 text-rocket-purple-600 hover:bg-rocket-purple-400',
          'dark:hover:bg-rocket-purple-900/30 rounded-lg transition-colors cursor-pointer',
        ]"
      >
        <Pencil class="w-5 h-5" />
      </button>
      <button
        @click="handleDeleteTask"
        :class="[
          'p-2 bg-rocket-gray-100 dark:bg-rocket-gray-700 text-red-500 hover:bg-red-300',
          'dark:hover:bg-red-700/30 rounded-lg transition-colors cursor-pointer',
        ]"
      >
        <Trash2 class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
