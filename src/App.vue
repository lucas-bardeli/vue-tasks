<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div
    class="min-h-screen bg-rocket-gray-50 dark:bg-rocket-gray-900 transition-colors duration-200"
  >
    <NavBar />

    <main class="container mx-auto px-4 py-8 max-w-7xl">
      <router-view />
    </main>
  </div>
</template>
