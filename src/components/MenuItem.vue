<script setup lang="ts">
const props = defineProps({
  redirectTo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <router-link
    :class="[
      'px-6 py-3 text-rocket-purple-500 dark:text-rocket-purple-400 font-medium rounded-lg',
      'border border-transparent transition-all duration-200 hover:bg-rocket-purple-500 dark:hover:bg-rocket-purple-600',
      'hover:text-white hover:no-underline hover:border-rocket-purple-500 dark:hover:border-rocket-purple-400',
    ]"
    :to="redirectTo"
    >{{ title }}</router-link
  >
</template>
