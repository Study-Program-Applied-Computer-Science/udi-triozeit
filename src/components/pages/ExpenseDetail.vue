<template>
    <div v-if="expense && showDetailModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg relative">
            <div>
                <button @click="closeModal"
                    class="absolute top-2 right-2 text-black px-2 py-1 rounded hover:bg-red-600 transition duration-300">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <h1 class="text-2xl font-bold mb-4">Expense Details: {{ expense.title }}</h1>
            <div class="flex mb-2 items-baseline">
                <h2 class="text-xl font-semibold">Date:</h2>
                <p>{{ expense && expense.dateTime ? formatDateTime(expense.dateTime) : '' }}</p>
            </div>
            <div class="flex mb-2 items-baseline">
                <h2 class="text-xl font-semibold">Amount:</h2>
                <p>€ {{ expense.amount }}</p>
            </div>
            <div class="flex mb-2 items-baseline">
                <h2 class="text-xl font-semibold">Category:</h2>
                <p>{{ expense.category }}</p>
            </div>
            <div class="mb-2 items-baseline">
                <div class="flex mb-2 items-baseline">
                    <h2 class="text-xl font-semibold mr-2">Split:</h2>
                    <div v-if="calculateSplit(expense) > 0" class="flex items-baseline">
                        <p class="text-red-500">Yet to split: € {{ calculateSplit(expense) }}</p>
                        <button @click="addSplit"
                            class="text-green-500 ml-2 hover:text-green-600 transition duration-300">Add Split</button>
                    </div>
                </div>

                <div v-if="showSplitForm" class="mb-4">
                    <h3 class="text-lg font-semibold mb-2">Add Split</h3>
                    <div class="mb-2">
                        <label class="block text-md font-medium text-gray-700">Amount</label>
                        <input v-model="newSplit.amount" type="number" placeholder="Enter amount"
                            class="mt-1 w-full border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-2">
                        <label class="block text-md font-medium text-gray-700">Notes</label>
                        <input v-model="newSplit.notes" type="text" placeholder="Enter notes"
                            class="mt-1 w-full border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="flex justify-end">
                        <button @click="saveSplit"
                            class="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition duration-300">Save</button>
                        <button @click="closeSplit"
                            class="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-gray-600 transition duration-300">Cancel</button>
                    </div>

                </div>

                <div>
                    <table class="table-auto w-full" v-if="expense.amount - calculateSplit(expense) !== 0">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">Amount</th>
                                <th class="px-4 py-2">Notes</th>
                                <th class="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(splitItem, index) in expense.split" :key="splitItem.id">
                                <td class="border px-4 py-2">€ {{ splitItem.amount }}</td>
                                <td class="border px-4 py-2">{{ splitItem.notes }}</td>
                                <td class="border px-4 py-2">
                                    <button @click="editSplit(index)"
                                        class="text-blue-500 hover:text-blue-700 transition duration-300">Edit</button>
                                    <button @click="deleteSplit(index)"
                                        class="text-red-500 ml-2 hover:text-red-700 transition duration-300">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button @click="closeModal"
                class="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 transition duration-300">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExpenseDetailComponent",
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
    data() {
        return {
            newSplit: {
                amount: '',
                notes: ''
            },
            showSplitForm: false,
            editIndex: undefined,
        };
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
        addSplit() {
            this.showSplitForm = true;
        },
        editSplit(index) {
            const splitItem = this.expense.split[index];
            this.newSplit = { ...splitItem };
            this.showSplitForm = true;
            this.editIndex = index;
        },
        closeSplit() {
            this.showSplitForm = false;
            this.newSplit.amount = '';
            this.newSplit.notes = '';
            this.editIndex = undefined;
        },
        saveSplit() {
            if (isNaN(this.newSplit.amount) || this.newSplit.amount <= 0) {
                alert("Please enter a valid number for the amount.");
                return;
            }

            if (!this.newSplit.notes.trim()) {
                alert("Notes cannot be empty or consist of only white spaces.");
                return;
            }

            if (this.newSplit.amount && this.newSplit.notes) {
                console.log(this.newSplit.amount, this.calculateSplit(this.expense));
                // validation is pending TO DO
                if (this.editIndex !== undefined) {
                    let updatedSplitValue = this.expense;
                    updatedSplitValue.split.splice(this.editIndex, 1, { ...this.newSplit });
                    this.editIndex = undefined;
                    this.$store.dispatch("updateSplitExpenses", updatedSplitValue);
                } else {
                    if (this.newSplit.amount > this.calculateSplit(this.expense)) {
                        alert("Split amount cannot be more than the remaining amount");
                        return;
                    }
                    let updatedSplitValue = this.expense;
                    updatedSplitValue.split.push({ ...this.newSplit, id: Date.now() });
                    this.$store.dispatch("updateSplitExpenses", updatedSplitValue);
                }
                this.newSplit.amount = '';
                this.newSplit.notes = '';
                this.showSplitForm = false;
            }
        },
        deleteSplit(index) {
            // this.expense.split.splice(index, 1);
            let updatedSplitValue = this.expense;
            updatedSplitValue.split.splice(index, 1);
            this.$store.dispatch("updateSplitExpenses", updatedSplitValue);
        },
    },
    emits: ["close-modal"],
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s;
}
</style>