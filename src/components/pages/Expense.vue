<template>
    <div @dblclick="handleToggleReminder(task)" v-bind:class="[task.reminder ? 'reminder' : '', 'task']">
        <div v-bind:class="[completed ? 'completed' : '']">
            <div class="header">
                <h3 v-bind:contenteditable="isEditable" ref="task_header">
                    {{ task.text }}
                </h3>
                <div class="icons">
                    <i class="fas fa-trash-alt" v-if="!completed" @click="onDelete(task)"></i>
                    <!-- Edit Section -->
                    <i v-if="!completed && !isEditable" @click="onEdit()" class="fa fa-pencil"></i>
                    <i v-if="!completed && isEditable" @click="onEdit()" class="fa-solid fa-pen-to-square"></i>
                    <!-- Toggle Complete Section -->

                </div>
            </div>
            <p v-bind:contenteditable="isEditable" ref="task_day">
                <i class="fas fa-calendar-day"></i>{{ ' ' + task.day }}
            </p>
            <p v-bind:contenteditable="isEditable" ref="task_amount">
                <i class="fas fa-euro-sign"></i>{{ ' ' + task.amount }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExpenseComponent",
    props: {
        task: Object,
        completed: Boolean,
    },
    data() {
        return {
            isEditable: false,
        };
    },
    methods: {
        handleToggleReminder(task) {
            this.$store.dispatch("toggleReminder", task.id);
        },
        onDelete(task) {
            this.$store.dispatch("deleteTask", task.id);
        },
        onCompleteToggle(task) {
            this.$store.dispatch("completeToggle", task.id);
        },
        onEdit() {
            if (this.isEditable) {
                //Handle Edit
            }
            this.isEditable = !this.isEditable;
        },
    },
};
</script>
<style scoped>
.fas {
    color: red;
}

.fa-check,
.fa-solid {
    color: green;
    margin-left: 13px;
}

.fa-pencil,
.fa-pen-to-square {
    margin-left: 13px;
    font-size: 13px;
}

.task {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.task.reminder {
    border-left: 5px solid green;
}

.task h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.completed {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    text-decoration-color: red;
    opacity: 0.3;
}
</style>