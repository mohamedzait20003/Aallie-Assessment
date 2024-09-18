<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTasksStore } from '../store/tasks';

const tasksStore = useTasksStore();
const editedTaskNames = ref<string[]>([]);

const toggleFinish = async (id: number) => {
    try {
        await tasksStore.toggleFinished(id);
    } catch (error) {
        console.error('Failed to update task:', error);
    }
};

const EditTask = async (id: number, index: number) => {
    try {
        await tasksStore.EditTask(id, editedTaskNames.value[index]);
    } catch (error) {
        console.error('Failed to update task:', error);
    }
};

const deleteTask = async (id: number) => {
    try {
        await tasksStore.deleteTask(id);
    } catch (error) {
        console.error('Failed to delete task:', error);
    }
};

onMounted(() => {
    tasksStore.fetchTasks();
});
</script>

<template>
    <div class="flex items-center justify-center relative">
        <div class="max-h-[500px] w-full overflow-y-auto">
            <table class="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-2 px-4 border-b border-gray-200 text-center">Task Name</th>
                        <th scope="col" class="py-2 px-4 border-b border-gray-200 text-center">Status</th>
                        <th scope="col" class="py-2 px-4 border-b border-gray-200 text-center">Finished</th>
                        <th scope="col" class="py-2 px-4 border-b border-gray-200 text-center">Edit</th>
                        <th scope="col" class="py-2 px-4 border-b border-gray-200 text-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasksStore.tasks" :key="task.id" class="hover:bg-gray-50">
                        <td class="text-left py-2 px-2 border-2 border-gray-200">{{ task.name }}</td>
                        <td :class="{
                            'text-center py-2 px-2 border-2 border-gray-200': true,
                            'text-green-500': task.completed,
                            'text-red-500': !task.completed
                        }">
                            {{ task.completed ? 'Completed' : 'Pending' }}
                        </td>
                        <td class="text-center py-2 px-2 border-2 border-gray-200">
                            <button @click="toggleFinish(task.id)" class="bg-green-500 text-white px-2 py-1 rounded" v-if="!task.completed">Finish</button>
                        </td>
                        <td class="text-center py-2 px-2 border-2 border-gray-200">
                            <div class="flex flex-row items-center justify-center gap-5">
                                <input type="text" v-model="editedTaskNames[index]" class="w-1/2 p-2 border border-gray-300 rounded" placeholder="Edit task..." />
                                <button @click="EditTask(task.id, index)" class="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                            </div>
                        </td>
                        <td class="text-center py-2 px-2 border-2 border-gray-200">
                            <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>