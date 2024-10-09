<template>
    <div>
        <h2 class="text-xl font-semibold mb-4 text-gray-200">Liste des tâches</h2>
        <ul class="">
            <li v-for="(task, index) in tasks" :key="index" class="flex items-center justify-between mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-150">
                <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }" class="flex-1 p-3">
                    {{ task.title }}
                </span>
                <div>
                    <button 
                        @click="completeTask(task.id)" 
                        :class="task.completed ? 'bg-orange-600' : 'bg-green-600'" 
                        class="text-white px-2 py-1 rounded hover:transition duration-200"
                    >
                        <i :class="task.completed ? 'fas fa-rotate-left' : 'fas fa-check'" class="mr-1"></i>
                    </button>
                    <button @click="removeTask(task.id)" class="bg-red-600 text-white px-2 py-1 rounded ml-2 hover:bg-red-700 transition duration-200">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        tasks: {
            type: Array,
            required: true,
        },
    },
    methods: {
        removeTask(taskId) {
            this.$emit('remove-task', taskId);
        },
        completeTask(taskId) {
            this.$emit('complete-task', taskId); // Émet l'événement pour marquer une tâche comme terminée
        },
    },
}
</script>