import { createStore } from "vuex";
import * as util from "./utils.js";

const store = createStore({
  modules: {},
  state() {
    return {
      currentUser: null,
      username: null,
      isLoggedIn: false,
      lastLogin: null,
      expenses: [],
    };
  },

  getters: {
    checkLoginStatus(state) {
      return state.isLoggedIn;
    },
    filteredExpenses(state) {
      return state.expenses.filter(
        (expense) => expense.email === state.currentUser
      );
    },
    getUsername(state) {
      return state.username || "User";
    },
    getUserEmail(state) {
      return state.currentUser;
    },
    // getUserDetail(state) {
    //   return state.userDetail;
    // },
    getLastLogin(state) {
      return state.lastLogin;
    },
  },

  mutations: {
    login(state, email, username, lastLogin) {
      state.isLoggedIn = true;
      state.currentUser = email;
      state.username = username;
      state.lastLogin = lastLogin;
      const encodeemail = window.btoa(email);
      sessionStorage.setItem("user", encodeemail);

    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.username = null;
      state.lastLogin = null;
      sessionStorage.removeItem("user");
    },
    // setUserDeatil(state, user) {
    //   state.userDetail = user;
    // },
    setUsername(state, username) {
      state.username = username;
    },
    setLastLogin(state, lastLogin) {
      state.lastLogin = lastLogin;
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

    initializeUser({ dispatch }) {
      dispatch("initializeUserSession");
    },

    async initializeUserSession(state) {
      const users = await util.fetchUsers();
      const encodedUser = sessionStorage.getItem("user");
      if (encodedUser) {
        const email = window.atob(encodedUser);
        const user = users.find((user) => user.email === email);
        console.log("user", user);
        if (user) {
          state.commit("login", user.email);
          state.commit("setLastLogin", user.lastLogin);
          state.commit("setUsername", user.username);
        }
      }
    },

    async updateUser(user, updatedUser) {
      await util.updateUser(user, updatedUser);
    },

    async updateSplitExpenses(state, updatedSplitValue) {
      await util.updateSplitExpenses(updatedSplitValue);
    },


    async fetchExpenses(state) {
      const expenses = await util.fetchExpenses(state.state.currentUser);
      state.commit("setExpenses", expenses);
    },


    async addExpense(state, newExpense) {
      const expense = await util.addExpense({
        ...newExpense,
        email: state.state.currentUser,
      });
      state.commit("addExpense", expense);
    },


    async updateExpense(state, updatedExpense) {
      const expense = await util.updateExpense({
        ...updatedExpense,
        email: state.state.currentUser,
      });
      state.commit("updateExpense", expense);
    },


    async deleteExpense(state, id) {
      const success = await util.deleteExpense(id);
      if (success) {
        state.commit("deleteExpense", id);
      } else {
        console.error("Failed to delete expense with ID:", id);
      }
    },
  },
});

export default store;