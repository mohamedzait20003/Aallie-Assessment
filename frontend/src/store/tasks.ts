// Libraries import
import { defineStore } from "pinia";
import axios from "axios";

// Store definition
export const useTasksStore = defineStore('tasks',{
  state: () => ({
    tasks: [] as Array<{ id: number; name: string; completed: boolean }>,
  }),
  actions: {
    async fetchTasks() {
      axios.get("http://localhost:8000/api/tasks").then((response) => {
        this.tasks = response.data;
      }).catch((error) => {
        console.log(error);
        throw error;
      });
    },
    async addTask(taskName: string) {
        axios.post("http://localhost:8000/api/tasks", { name: taskName }).then(async (response) => {
          if(response.status === 201) {
            await this.fetchTasks();
          }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    },
    async deleteTask(taskId: number) {
      axios.delete(`http://localhost:8000/api/tasks/${taskId}`).then(async (response) => {
        if(response.status === 204) {
          await this.fetchTasks();
        }
      }).catch((error) => {
        console.log(error);
        throw error;
      });
    },
    async toggleFinished(taskId: number) {
      axios.put(`http://localhost:8000/api/tasks/${taskId}`, {completed: true}).then(async (response) => {
        if(response.status === 200) {
          await this.fetchTasks();
        }
      }).catch((error) => {
        console.log(error);
        throw error;
      });
    },
    async EditTask(taskId: number, newName: string) {
      axios.put(`http://localhost:8000/api/tasks/${taskId}`, {name: newName}).then(async (response) => {
        if(response.status === 200) {
          await this.fetchTasks();
        }
      }).catch((error) => {
        console.log(error);
        throw error;
      });
    },
  },
});