import { createStore } from "vuex";
import signUpmodules from "./store/modules/SignUpModule.js";

const store = createStore({
  modules: {
    signUp: signUpmodules,
  },
  state() {
    return {
      currentUser: null,
      isLoggedIn: false,
    };
  },

  getters: {
    checkLoginStatus(state) {
      return state.isLoggedIn;
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
      state.isLoggedIn = true;
      state.currentUser = null;
      sessionStorage.removeItem("user");
    },
  },

  actions: {},
});
export default store;
