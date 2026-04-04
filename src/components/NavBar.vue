<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
</script>

<template>
  <header>
    <MenuItem title="Login" redirectTo="/login" />
    <MenuItem title="Cadastre-se" redirectTo="/register" />
    <MenuItem title="Tarefas" redirectTo="/tasks" />
  </header>
</template>
