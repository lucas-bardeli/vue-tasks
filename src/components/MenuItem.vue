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
      'my-3 text-gray-900 dark:text-white font-medium rounded-lg',
      'border border-transparent transition-all duration-200',
      'hover:text-rocket-purple-500 hover:underline',
    ]"
    :to="redirectTo"
    >{{ title }}</router-link
  >
</template>
