<template>
  <div class="max-w-7xl mx-auto mt-12 p-6">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">
        {{ username }}'s Expenses
      </h2>
      <div class="flex">

        <div class="w-full flex flex-col gap-4 justify-around">
          <div class="flex items-center gap-4">
            <label for="searchExpense" class="block text-sm font-medium text-gray-700">Search Expense</label>
            <input type="text" id="searchExpense" v-model="searchExpense" placeholder="Enter the title"
              class="ml-1.5  w-full border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" />

            <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="Date" id="startDate" v-model="startDate"
              class="ml-1.5 w-full border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" />

            <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
            <input type="Date" id="endDate" v-model="endDate"
              class="ml-1.5 w-full border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" />

            <label for="selectedCategory" class="block text-sm font-medium text-gray-700">Select Category</label>
            <select id="selectedCategory" v-model="selectedCategory"
              class="ml-1.5 w-full border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Catgories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            <button @click="openModal()"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md shadow transition duration-300 whitespace-nowrap"
              style="height: 40px;">
              Add Expense
            </button>
          </div>
          <div v-for="expense in searchAndFilter" :key="expense.id" @dblclick="handleToggleDetailView(expense)"
            class="flex items-center justify-between bg-gray-50 p-6 rounded-lg border-2 border-gray-200 shadow-md">
            <div class="flex items-center gap-4 w-full cursor-pointer" @click="handleToggleDetailView(expense)">
              <span class="font-bold text-lg flex-shrink-0 w-1/4">{{ expense.title }}</span>
              <span
                class="bg-green-500 text-white rounded-full px-4 py-1 text-sm font-semibold flex-shrink-0 w-1/5 text-center">
                €{{ expense.amount }}
              </span>
              <span
                class="bg-blue-500 text-white rounded-full px-4 py-1 text-sm font-semibold flex-shrink-0 w-1/5 text-center">
                {{ expense.category || "No Category" }}
              </span>
              <span class="text-gray-600 text-sm w-1/4 text-right flex-shrink-0">
                {{ formatDateTime(expense.dateTime) }}
              </span>
            </div>

            <div class="flex gap-2">
              <button @click="editExpense(expense)"
                class="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-lg transition duration-300">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteExpense(expense.id)"
                class="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-lg transition duration-300">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>


          <div class="flex justify-center mt-4 w-full">
            <div>
              <h3 class="text-2xl font-bold">Streak Information</h3>
              <p class="text-4xl font-semibold mt-2">{{ streak }} days</p>
              <p class="text-gray-600 mt-2" v-if="streakMessage">{{ streakMessage }}</p>
              <h3 class="text-2xl font-bold mt-4">Daily Add Limit</h3>
              <p class="text-4xl font-semibold mt-2">{{ addLimit }} expenses</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <ExpenseDetail :expense="selectedExpense" :showDetailModal="showDetailModal" @close-modal="closeDetailModal" />


    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg w-full max-w-md shadow-lg relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">
          &times;
        </button>
        <h3 class="text-2xl font-bold mb-2 text-center">
          {{ editingId ? "Update Expense" : "Add Expense" }}
        </h3>
        <p v-if="errorMessage" class="text-red-500 text-sm font-semibold text-center mb-2">
          {{ errorMessage }}
        </p>
        <form @submit.prevent="addExpense" class="flex flex-col gap-4">
          <input v-model="newExpense.title" placeholder="Expense Title"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500" required />
          <input v-model.number="newExpense.amount" placeholder="Amount" type="number"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500" required />
          <select v-model="newExpense.category"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500" required>
            <option value="" disabled>Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
          <input v-model="newExpense.dateTime" type="datetime-local"
            class="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500" required />
          <div class="flex justify-end gap-2">
            <button @click="closeModal" type="button"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg">
              Cancel
            </button>
            <button type="submit" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
              {{ editingId ? "Update" : "Add" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import ExpenseDetail from "./ExpenseDetail.vue";

export default {
  data() {
    return {
      streak: 0,
      addLimit: 5,
      streakMessage: "",
      user: {},
      showModal: false,
      showDetailModal: false,
      selectedExpense: null,
      newExpense: { title: "", amount: 0, category: "", dateTime: "", split: [] },
      editingId: null,
      errorMessage: "",
      searchExpense: "",
      selectedCategory: "",
      startDate: "",
      endDate: "",
      sortOrder: "asc",
    };
  },
  components: { ExpenseDetail },
  computed: {
    searchAndFilter() {
      let filterData = this.$store.getters.filteredExpenses;
      if (this.searchExpense) {
        filterData = filterData.filter((expense) => {
          return expense.title
            .toLowerCase()
            .includes(this.searchExpense?.toLowerCase());
        });
      }

      if (this.selectedCategory) {
        console.log("Category Filter");
        filterData = filterData.filter((expense) => {
          return expense.category === this.selectedCategory;
        })
      }

      if (this.startDate || this.endDate) {
        if (this.startDate && this.endDate) {
          filterData = filterData.filter((expense) => {
            return expense.day >= this.startDate && expense.day <= this.endDate;
          })
        }

        else if (this.startDate) {
          filterData = filterData.filter((expense) => {
            return expense.day >= this.startDate;
          })
        }
        else {
          filterData = filterData.filter((expense) => {
            return expense.day <= this.endDate;
          })

        }
      }

      if (this.sortOrder) {
        filterData.sort((a, b) => {
          if (this.sortOrder === "asc") {
            return a.amount - b.amount
          }
          else {
            return b.amount - a.amount
          }
        })
      }
      return filterData;
    },
    username() {
      return this.$store.getters.getUsername || "User";
    },
  },
  created() {
    this.$store.dispatch("fetchExpenses");
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch("http://localhost:5001/users");
        const data = await response.json();
        this.user = data.find((user) => user.email === this.$store.getters.getUserEmail) || {};
        this.updateStreak();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    updateStreak() {
      const today = new Date();
      const lastLogin = new Date(this.user.lastLogin);
      const isConsecutive = (today - lastLogin) / (1000 * 60 * 60 * 24) === 1;

      if (today.toDateString() === lastLogin.toDateString()) {
        this.streakMessage = "You have already logged in today.";
      } else if (isConsecutive) {
        this.user.streak += 1;
        this.streakMessage = "Your streak continues!";
      } else {
        this.user.streak = 0;
        this.streakMessage = "Your streak has been reset.";
      }
      this.streak = this.user.streak;
      this.addLimit = 5 + this.user.streak;
    },
    handleToggleDetailView(expense) {
      this.selectedExpense = expense;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
    },
    openModal(expense = null) {
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
    },
    async addExpense() {
      if (!this.newExpense.title.trim()) {
        this.errorMessage = "Expense Title cannot be empty!";
        return;
      }
      this.newExpense = { ...this.newExpense, split: [] };
      if (this.editingId) {
        await this.$store.dispatch("updateExpense", { ...this.newExpense, id: this.editingId });
      } else {
        await this.$store.dispatch("addExpense", this.newExpense);
      }
      this.closeModal();
    },
    async deleteExpense(id) {
      await this.$store.dispatch("deleteExpense", id);
    },
    resetForm() {
      this.newExpense = { title: "", amount: 0, category: "", dateTime: "" };
      this.editingId = null;
    },
    formatDateTime(dateTime) {
      return new Date(dateTime).toLocaleString();
    },
    editExpense(expense) {
      this.openModal(expense);
    },
  },
};
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
</style>