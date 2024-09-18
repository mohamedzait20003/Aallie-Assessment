<script setup lang="ts">
import { ref } from 'vue';
import { useTasksStore } from '../store/tasks';

const task = ref('');
const tasksStore = useTasksStore();

const addTask = async () => {
  if (task.value.trim()) {
    await tasksStore.addTask(task.value);
    task.value = '';
  }
};
</script>

<template>
    <div>
        <form class="flex flex-row items-center justify-center gap-5" @submit.prevent="addTask">
            <input type="text" v-model="task" class="w-1/2 p-2 border border-gray-300 rounded" placeholder="Add a task..." />
            <button type="submit" class="bg-teal-500 text-white p-2 rounded">Add Task</button>
        </form>
    </div>
</template>