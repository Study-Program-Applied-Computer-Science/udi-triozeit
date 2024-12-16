<template>

    <div v-if="expense && showDetailModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg relative">
            <h1 class="text-2xl font-bold mb-4">Expense Details: {{ expense.title }}</h1>
            <div class="flex mb-2 items-baseline">
                <h2 class="text-xl font-semibold">Date:</h2>
                <p>{{ expense && expense.dateTime ?
                    formatDateTime(expense.dateTime) : '' }}</p>
            </div>
            <div class="flex mb-2 items-baseline">
                <h2 class="text-xl font-semibold">Amount:</h2>
                <p>€ {{ expense.amount }}</p>
            </div>
            <div class="flex mb-2 items-baseline">
                <h2 class="text-xl font-semibold">Category:</h2>
                <p>{{ expense.category }}</p>
            </div>
            <!-- <div class="flex mb-2 items-baseline">
                <h2 class="text-xl font-semibold">Split:</h2>
                <p>{{ expense.split }}</p>
            </div> -->
            <div class=" mb-2 items-baseline">
                <div class="flex mb-2 items-baseline">
                    <h2 class="text-xl font-semibold mr-2">Split:</h2>
                    <div v-if="calculateSplit(expense) > 0" class="flex items-baseline ">
                        <p class="text-red-500">Yet to split: € {{ calculateSplit(expense) }}</p>
                        <button @click="addSplit" class="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2">Add
                            Split</button>
                    </div>
                </div>

                <div>
                    <table class="table-auto w-full" v-if="expense.amount - calculateSplit(expense) !== 0">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">Amount </th>
                                <th class="px-4 py-2">Notes</th>
                                <th class="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(splitItem, index) in expense.split" :key="splitItem.id">
                                <td class="border px-4 py-2">€ {{ splitItem.amount }}</td>
                                <td class="border px-4 py-2">{{ splitItem.notes }}</td>
                                <td class="border px-4 py-2">
                                    <button @click="editSplit(index)" class="text-blue-500">Edit</button>
                                    <button @click="deleteSplit(index)" class="text-red-500 ml-2">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
            <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Close</button>
        </div>
    </div>

</template>
<script>
export default {
    name: "ExpenseDetailComponent",
    mounted() {
        console.log(this.expense);
    },
    props: {
        expense: {
            type: Object,
            required: true,
        },
        showDetailModal: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
        formatDateTime(dateTime) {
            return new Date(dateTime).toLocaleString();
        },
        calculateSplit(expense) {
            return expense.amount - expense?.split?.reduce((acc, splitItem) => acc + splitItem.amount, 0);
        },
    },
    emits: ["close-modal"],
}
</script>
<style scoped></style>