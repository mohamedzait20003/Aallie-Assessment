<script setup lang="ts">
// Components
import AddTask from './components/AddTask.vue';
import ShowTasks from './components/ShowTasks.vue';
</script>

<template>
  <header class="w-full py-8 bg-teal-900">
    <div class="flex flex-row items-center justify-center gap-5">
      <h1 class="text-3xl font-bold text-white">ToDoList</h1>
    </div>
  </header>
  <section class="container mx-auto py-5">
    <AddTask />
  </section>
  <main class="w-full px-10 py-3">
    <ShowTasks />
  </main>
</template>