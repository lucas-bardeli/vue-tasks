<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <p>itens</p>
    </div>
  </div>
</template>
