import { createStore } from "vuex";
import signUpmodules from "./store/modules/SignUpModule.js";

const store = createStore({
  modules: {
    signUp: signUpmodules,
  },
  state() {
    return {
      currentUser: null, 
      username: null,    
      isLoggedIn: false,
      expenses: [], 
    };
  },

  getters: {
    checkLoginStatus(state) {
      return state.isLoggedIn;
    },
    filteredExpenses(state) {
      return state.expenses.filter((expense) => expense.email === state.currentUser);
    },
    getUsername(state) {
      return state.username || "User"; 
    },
  },

  mutations: {
    login(state, email) {
      state.isLoggedIn = true;
      state.currentUser = email;
      const encodeemail = window.btoa(email);
      sessionStorage.setItem("user", encodeemail);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.username = null;
      sessionStorage.removeItem("user");
    },
    setUsername(state, username) {
      state.username = username;
    },
    setExpenses(state, expenses) {
      state.expenses = expenses;
    },
    addExpense(state, expense) {
      state.expenses.push(expense);
    },
    updateExpense(state, updatedExpense) {
      const index = state.expenses.findIndex((exp) => exp.id === updatedExpense.id);
      if (index !== -1) {
        state.expenses.splice(index, 1, updatedExpense);
      }
    },
    deleteExpense(state, id) {
      state.expenses = state.expenses.filter((exp) => exp.id !== id);
    },
  },

  actions: {
    initializeUser({ commit, dispatch }) {
      const encodedUser = sessionStorage.getItem("user");
      if (encodedUser) {
        const email = window.atob(encodedUser);
        commit("login", email);
        dispatch("fetchUsername"); 
      }
    },

    async fetchUsername({ commit, state }) {
      try {
        const response = await fetch("http://localhost:5001/users"); 
        const users = await response.json();

        const user = users.find((user) => user.email === state.currentUser);
        if (user) {
          commit("setUsername", user.username);
        } else {
          commit("setUsername", "User"); 
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        commit("setUsername", "User"); 
      }
    },

    async fetchExpenses({ commit, state }) {
      try {
        const response = await fetch("http://localhost:5001/expenses");
        const data = await response.json();

        const userExpenses = data.filter((expense) => expense.email === state.currentUser);
        commit("setExpenses", userExpenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    },
    async addExpense({ commit, state }, newExpense) {
      try {
        const response = await fetch("http://localhost:5001/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newExpense, email: state.currentUser }),
        });
        const createdExpense = await response.json();
        commit("addExpense", createdExpense);
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    },
    async updateExpense({ commit, state }, updatedExpense) {
      try {
        const payload = {
          ...updatedExpense,
          email: state.currentUser, 
        };
  
        const response = await fetch(`http://localhost:5001/expenses/${updatedExpense.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update expense");
        }
  
        const data = await response.json();
        commit("updateExpense", data);
      } catch (error) {
        console.error("Error updating expense:", error);
      }
    },
    async deleteExpense({ commit }, id) {
      try {
        await fetch(`http://localhost:5001/expenses/${id}`, {
          method: "DELETE",
        });
        commit("deleteExpense", id);
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    },
  },
});

export default store;
