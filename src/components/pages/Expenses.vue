<template>
    <div class="container">
        <div class="search-filter-container">
            <label>
                Search
                <input type="text" v-model="searchQuery" placeholder="Search expenses..." @input="handleSearch"
                    class="search-input" />
            </label>
            <label>
                From:
                <input type="date" v-model="startDate" class="date-input" />
            </label>
            <label>
                To:
                <input type="date" v-model="endDate" class="date-input" />
            </label>
            <label>
                Min Price:
                <input type="number" v-model.number="minPrice" placeholder="Min" class="price-input" />
            </label>
            <label>
                Max Price:
                <input type="number" v-model.number="maxPrice" placeholder="Max" class="price-input" />
            </label>
        </div>

        <div>

            <h3 v-if="inCompleteTasks?.length > 0" class="status_info">Expenses</h3>
            <div class="tasks" v-for="task in inCompleteTasks" v-bind:key="task.id">
                <Expense v-bind:task="task" v-bind:completed="false" />
            </div>
        </div>
    </div>
</template>

<script>

import Expense from "./Expense.vue";
export default {
    name: "ExpensesComponent",
    props: {
        completedTasks: Array,
        // inCompleteTasks: Array,
    },
    methods: {
        handleSearch() {
            console.log("Search Query: ", this.searchQuery);
            const onSearch = this.dataArray.filter((task) => {
                return task.text.toLowerCase().includes(this.searchQuery.toLowerCase());
            });

            this.inCompleteTasks = onSearch;
        },
    },
    mounted() {
        this.inCompleteTasks = this.dataArray;
    },
    data() {
        return {
            dataArray: [
                {
                    "text": "Learn Angular",
                    "day": "March 29th at 1.30",
                    "reminder": false,
                    "completed": false,
                    "createdBy": "test1@gmail.com",
                    "id": 1
                },
                {
                    "text": "Learn React",
                    "day": "April 25th at 13.00",
                    "reminder": false,
                    "completed": false,
                    "createdBy": "test2@gmail.com",
                    "id": 2
                },
                {
                    "text": "Learn test",
                    "day": "March 29th at 1.30",
                    "reminder": false,
                    "completed": false,
                    "createdBy": "test1@gmail.com",
                    "id": 3
                },
                {
                    "text": "new expense",
                    "day": "thursday",
                    "amount": "7456456",
                    "reminder": false,
                    "completed": false,
                    "userName": null,
                    "createdBy": "abcd@gmail.com",
                    "id": 10
                },
                {
                    "text": "new expense",
                    "day": "thursday",
                    "amount": "4511",
                    "reminder": false,
                    "completed": false,
                    "userName": null,
                    "createdBy": "abcd@gmail.com",
                    "id": 11
                }
            ],
            inCompleteTasks: [],
        };
    },
    components: {
        Expense,
    },
};
</script>

<style scoped>
.status_info {
    text-align: center;
    margin-top: 25px;
    color: #111111;
}

.completed {
    border-top: 2px solid grey;
    opacity: 0.3;
}

.container {
    margin: 0 auto;
    padding: 20px;
}

.search-filter-container {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    /* Allow elements to wrap if needed */
    gap: 10px;
    /* Add spacing between elements */
    margin-bottom: 20px;
    /* Add spacing below the filter section */
    align-items: center;
    /* Vertically align items */
    justify-content: space-between;
    /* Spread items across the container */
}

.search-input,
.price-input,
.date-input {
    padding: 6px;
    font-size: 0.9rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1 0 150px;
    /* Flexible width with a minimum */
    max-width: 200px;
    /* Maximum width for inputs */
}

.search-input {
    flex-grow: 2;
    /* Make search input slightly larger */
}

label {
    font-size: 0.9rem;
    margin-right: 5px;
}

button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>