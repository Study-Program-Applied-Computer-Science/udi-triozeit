<template>
  <div class="max-w-5xl mx-auto mt-12 p-6">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">User's Expenses</h2>
      <form @submit.prevent="addExpense" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 items-center">
        <input
          v-model="newExpense.title"
          placeholder="Expense Title"
          class="p-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
          required
        />
        <input
          v-model.number="newExpense.amount"
          placeholder="Amount"
          type="number"
          class="p-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
          required
        />
        <select
          v-model="newExpense.category"
          class="p-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          {{ editingId ? "Update Expense" : "Add Expense" }}
        </button>
      </form>      
      <div class="flex flex-col gap-4">
        <div
          v-for="expense in expenses"
          :key="expense.id"
          class="flex justify-between items-center bg-gray-50 p-6 rounded-lg border-2 border-gray-200 shadow-md"
        >
          <div class="text-lg text-gray-800">
            <span class="font-bold mr-4">{{ expense.title }}</span>
            <span class="inline-block bg-green-500 text-white rounded-full px-4 py-1 text-sm font-semibold">
              €{{ expense.amount }}
            </span>
            <span
              class="inline-block bg-blue-500 text-white rounded-full px-4 py-1 ml-4 text-sm font-semibold"
            >
              {{ expense.category || "No Category" }}
            </span>
          </div>
          <div class="flex gap-2">
            <button
              @click="editExpense(expense)"
              class="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-lg transition duration-300"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="deleteExpense(expense.id)"
              class="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-lg transition duration-300"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newExpense: { title: "", amount: 0, category: "" },
      editingId: null,
    };
  },
  computed: {
    username() {
      
      return this.$store.getters.getUsername; 
    },
    expenses() {
      
      return this.$store.getters.filteredExpenses;
    },
  },
  created() {
    
    this.$store.dispatch("initializeUser").then(() => {
      this.$store.dispatch("fetchUsername"); 
      this.$store.dispatch("fetchExpenses");
    });
  },
  methods: {
    async addExpense() {
      if (this.editingId) {
        const updatedExpense = { ...this.newExpense, id: this.editingId };
        await this.$store.dispatch("updateExpense", updatedExpense);
      } else {
        await this.$store.dispatch("addExpense", this.newExpense);
      }
      this.resetForm();
    },
    async deleteExpense(id) { 
      await this.$store.dispatch("deleteExpense", id);
    },
    editExpense(expense) {
      this.newExpense = { title: expense.title, amount: expense.amount, category: expense.category,email: expense.email, };
      this.editingId = expense.id;
    },
    resetForm() { 
      this.newExpense = { title: "", amount: 0, category: "" };
      this.editingId = null;
    },
  },
};

</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
</style>
