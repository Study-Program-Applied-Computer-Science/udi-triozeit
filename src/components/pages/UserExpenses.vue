<template>
  <div class="container">
    <div class="card">
      <h2 class="title">{{ username }}'s Expenses</h2>

      <form @submit.prevent="addExpense" class="form">
  <input
    v-model="newExpense.title"
    placeholder="Expense Title"
    class="input"
    required
  />
  <input
    v-model.number="newExpense.amount"
    placeholder="Amount"
    type="number"
    class="input"
    required
  />
  <select v-model="newExpense.category" class="input category-select" required>
    <option value="" disabled>Select Category</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Utilities">Utilities</option>
    <option value="Other">Other</option>
  </select>
  <button type="submit" class="btn primary add-btn">
    {{ editingId ? "Update Expense" : "Add Expense" }}
  </button>
</form>


      <div class="expense-list">
        <div v-for="expense in expenses" :key="expense.id" class="expense-card">
          <div class="expense-info">
            <span class="expense-title">{{ expense.title }}</span>
            <span class="expense-tag price-tag">€{{ expense.amount }}</span>
            <span class="expense-tag category-tag">{{ expense.category || "No Category" }}</span>
          </div>
          <div class="expense-actions">
            <button @click="editExpense(expense)" class="btn icon-btn edit">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteExpense(expense.id)" class="btn icon-btn delete">
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
      username: "",
      expenses: [],
      newExpense: { title: "", amount: 0, category: "" },
      editingId: null,
    };
  },
  created() {
    this.username = localStorage.getItem("username") || "test123";
    this.fetchExpenses();
  },
  methods: {
    async fetchExpenses() {
      try {
        const response = await fetch("http://localhost:5001/expenses");
        const data = await response.json();
        this.expenses = data.filter((expense) => expense.username === this.username);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    },
    async addExpense() {
      if (this.editingId) {
        await this.updateExpense();
      } else {
        try {
          const response = await fetch("http://localhost:5001/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...this.newExpense,
              username: this.username,
            }),
          });
          const newExpense = await response.json();
          this.expenses.push(newExpense);
          this.resetForm();
        } catch (error) {
          console.error("Error adding expense:", error);
        }
      }
    },
    async updateExpense() {
      try {
        await fetch(`http://localhost:5001/expenses/${this.editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...this.newExpense, username: this.username }),
        });
        this.fetchExpenses();
        this.resetForm();
      } catch (error) {
        console.error("Error updating expense:", error);
      }
    },
    async deleteExpense(id) {
      try {
        await fetch(`http://localhost:5001/expenses/${id}`, {
          method: "DELETE",
        });
        this.fetchExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    },
    editExpense(expense) {
      this.newExpense = { title: expense.title, amount: expense.amount, category: expense.category };
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

body {
  font-family: "Roboto", sans-serif;
  background-color: #f4f6f9;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1000px; 
  margin: 50px auto;
  padding: 30px; 
}

.card {
  background: #fff;
  padding: 30px; 
  border-radius: 12px; 
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.title {
  text-align: center;
  font-size: 2.2em; 
  margin-bottom: 30px;
  color: #333;
}

.form {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto; 
  gap: 15px; 
  margin-bottom: 30px;
  align-items: center; 
}

.input, .category-select {
  padding: 12px; 
  font-size: 1.1em;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  width: 100%; 
}

.btn.primary {
  padding: 15px 20px; 
  font-size: 1.2em; 
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn.primary:hover {
  background-color: #45a049;
}

.btn.icon-btn {
  padding: 10px;
  font-size: 1.4em; 
}

.btn.edit {
  color: #2196f3;
  background-color: #e3f2fd;
}

.btn.delete {
  color: #f44336;
  background-color: #ffebee;
}

.expense-list {
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

.expense-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px; 
  background: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.expense-info {
  font-size: 1.2em; 
  color: #333;
}

.expense-title {
  font-weight: bold;
  margin-right: 15px;
}

.expense-amount {
  color: #666;
}

.expense-category {
  font-style: italic;
  color: #888;
}
.add-btn {
  padding: 12px 20px; 
  font-size: 1.1em;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #45a049;
}

.expense-tag {
  display: inline-block;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
  color: #fff;
  text-align: center;
}

.price-tag {
  background-color: #4caf50; 
}

.category-tag {
  background-color: #2196f3; 
}
</style>