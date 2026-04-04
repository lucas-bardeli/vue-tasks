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
  <router-link class="text-purple-600 p-2 hover:underline" :to="redirectTo">{{
    title
  }}</router-link>
</template>
