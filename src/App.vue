<template>
    <div id="app" class="max-w-[800px] mx-auto p-6 bg-gray-800 shadow-lg rounded-lg mt-10">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-200">{{ message }}</h1>
        
        <div class="flex mb-4">
            <input 
                v-model="newTaskTitle" 
                placeholder="Ajouter une nouvelle tâche" 
                class="flex-1 border border-gray-600 bg-gray-700 text-gray-200 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                @click="addTask" 
                class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-200"
            >
                Ajouter
            </button>
        </div>
        
        <div class="mb-4">
            <input 
                v-model="searchQuery" 
                placeholder="Rechercher une tâche" 
                class="border border-gray-600 bg-gray-700 text-gray-200 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <TaskList 
            :tasks="filteredTasks" 
            @remove-task="removeTask" 
            @complete-task="completeTask" 
        />
    </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import { getTasks } from './services/taskService';

export default {
    components: {
        TaskList
    },
    data() {
        return {
            message: 'Bienvenue dans Vue.js !',
            newTaskTitle: '',
            tasks: [],
            searchQuery: '' // Assure-toi d'avoir cette propriété pour le filtrage
        };
    },
    methods: {
        async fetchTasks() {
            try {
                this.tasks = await getTasks(); // Appel à l'API pour récupérer les tâches
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches:', error);
            }
        },
        async addTask() {
            if (this.newTaskTitle.trim() !== '') {
                // Ajout de l'objet tâche
                const newTask = {
                    userId: 1, // Assurez-vous de définir un userId, ici par exemple
                    id: this.tasks.length + 1, // Créez un ID unique, bien que ce soit pour une simulation
                    title: this.newTaskTitle, // Utilisez newTaskTitle
                    completed: false // Définissez le statut par défaut
                };
                
                this.tasks.push(newTask); // Ajoutez la nouvelle tâche au tableau
                this.newTaskTitle = '';
                this.saveTasks(); // Sauvegarde les tâches
            }
        },
        async removeTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId); // Supprime par ID
            this.saveTasks();
        },
        completeTask(taskId) {
            const task = this.tasks.find(t => t.id === taskId); // Trouve la tâche par ID
            if (task) {
                task.completed = !task.completed; // Bascule l'état complété
                this.saveTasks(); // Sauvegarde les tâches après modification
            }
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Sauvegarde dans localStorage
        }
    },
    computed: {
        filteredTasks() {
            return this.tasks.filter(task => task.title.toLowerCase().includes(this.searchQuery.toLowerCase())); // Filtrage des tâches
        }
    },
    async mounted() {
        await this.fetchTasks(); // Récupère les tâches lors du montage du composant
    }
}
</script>
