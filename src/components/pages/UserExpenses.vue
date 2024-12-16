<template>
  <div class="max-w-7xl mx-auto mt-12 p-6">
    <div class="bg-white p-8 rounded-lg shadow-md">
      
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">
        {{ username }}'s Expenses
      </h2>
      <div class="flex gap-8">
        
        <div class="w-2/3 flex flex-col gap-4">
          <div
            v-for="expense in expenses"
            :key="expense.id"
            class="flex items-center justify-between bg-gray-50 p-6 rounded-lg border-2 border-gray-200 shadow-md"
          >
            <div class="flex items-center gap-4 w-full">
              
              <span class="font-bold text-lg flex-shrink-0 w-1/4">{{ expense.title }}</span>             
              <span
                class="bg-green-500 text-white rounded-full px-4 py-1 text-sm font-semibold flex-shrink-0 w-1/5 text-center"
              >
                €{{ expense.amount }}
              </span>
              
              <span
                class="bg-blue-500 text-white rounded-full px-4 py-1 text-sm font-semibold flex-shrink-0 w-1/5 text-center"
              >
                {{ expense.category || "No Category" }}
              </span>

              <span class="text-gray-600 text-sm w-1/4 text-right flex-shrink-0">
                {{ formatDateTime(expense.dateTime) }}
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

          <div class="flex justify-center mt-4">
            <button
              @click="openModal()"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 text-lg rounded-lg shadow-md transition duration-300"
            >
              Add Expense
            </button>
          </div>
        </div>
        
        <div class="w-1/3 space-y-6">
          
          <div class="bg-green-100 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-green-700">Total Expenses</h3>
            <p class="text-4xl font-semibold text-gray-800 mt-2">€{{ totalExpenses }}</p>
          </div>

          <div class="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-blue-700">Category Breakdown</h3>
            <ul class="mt-4 space-y-3">
              <li
                v-for="(amount, category) in categoryBreakdown"
                :key="category"
                class="flex justify-between text-lg text-gray-700 font-medium"
              >
                <span>{{ category }}</span>
                <span>€{{ amount }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-yellow-100 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-yellow-700">Today's Expenses</h3>
            <div v-if="todayExpenses.length > 0" class="mt-4 space-y-2">
              <div
                v-for="expense in todayExpenses"
                :key="expense.id"
                class="flex justify-between text-lg text-gray-700 font-medium"
              >
                <span>{{ expense.title }} - €{{ expense.amount }}</span>
                <span class="text-gray-500 text-sm">{{ formatDateTime(expense.dateTime) }}</span>
              </div>
            </div>
            <p v-else class="text-gray-600 mt-2">No expenses recorded for today.</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg w-full max-w-md shadow-lg relative">
        
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h3 class="text-2xl font-bold mb-2 text-center">
          {{ editingId ? "Update Expense" : "Add Expense" }}
        </h3>

        <p v-if="errorMessage" class="text-red-500 text-sm font-semibold text-center mb-2">
          {{ errorMessage }}
        </p>
        <form @submit.prevent="addExpense" class="flex flex-col gap-4">
          <input
            v-model="newExpense.title"
            @input="validateInput"
            placeholder="Expense Title"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            v-model.number="newExpense.amount"
            placeholder="Amount"
            type="number"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <select
            v-model="newExpense.category"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>

          <input
            v-model="newExpense.dateTime"
            type="datetime-local"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            required
          />

          <div class="flex justify-end gap-2">
            <button
              @click="closeModal"
              type="button"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              {{ editingId ? "Update" : "Add" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showModal: false,
      newExpense: { title: "", amount: 0, category: "", dateTime: "" }, 
      editingId: null,
      errorMessage: "",
    };
  },
  computed: {
    username() {
      return this.$store.getters.getUsername || "User";
    },
    expenses() {
      return this.$store.getters.filteredExpenses;
    },
    totalExpenses() {
      return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    },
    categoryBreakdown() {
      return this.expenses.reduce((breakdown, expense) => {
        if (!breakdown[expense.category]) {
          breakdown[expense.category] = 0;
        }
        breakdown[expense.category] += expense.amount;
        return breakdown;
      }, {});
    },
    todayExpenses() {
    
    const today = new Date().toISOString().split("T")[0]; 
    return this.expenses.filter(expense => {
      return expense.dateTime && expense.dateTime.startsWith(today);
    });
  },
  },
  created() {
    this.$store.dispatch("initializeUser");
    this.$store.dispatch("fetchExpenses");
  },
  methods: {
    openModal(expense = null) {
      this.errorMessage = "";
      if (expense) {
        
        this.editingId = expense.id;
        this.newExpense = { ...expense };
      } else {
        
        this.resetForm();
        this.newExpense.dateTime = new Date().toISOString().slice(0, 16); 
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
      this.errorMessage = "";
    },
    async addExpense() {
      const title = this.newExpense.title.trim(); 
      if (!title) {
        this.errorMessage = "Expense Title cannot be empty or contain only spaces!";
        return;
      }

      this.newExpense.title = title; 

      if (!this.newExpense.dateTime) {
        
        this.newExpense.dateTime = new Date().toISOString();
      }

      if (this.editingId) {
        
        const updatedExpense = { ...this.newExpense, id: this.editingId };
        await this.$store.dispatch("updateExpense", updatedExpense);
      } else {
        
        await this.$store.dispatch("addExpense", this.newExpense);
      }

      this.closeModal(); 
    },
    async deleteExpense(id) {
      await this.$store.dispatch("deleteExpense", id);
    },
    editExpense(expense) {
      this.openModal(expense);
    },
    resetForm() {
      this.newExpense = { title: "", amount: 0, category: "", dateTime: "" };
      this.editingId = null;
    },
    formatDateTime(dateTime) {
      
      return new Date(dateTime).toLocaleString();
    },
  },
};

</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
</style>
