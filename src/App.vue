<script setup lang="ts"></script>

<template>
  <div>
    <header>
      <nav>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Cadastre-se</router-link>
        <router-link to="/tasks">Tarefas</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
