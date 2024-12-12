import { createStore } from "vuex";
import signUpmodules from "./modules/SignUpModule.js";

const store = createStore({
  modules: {
    signUp: signUpmodules,
  },
  state() {
    return {
      currentUser: {
        username: "",
      },
      isLoggedIn: false,
    };
  },

  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
  },

  mutations: {
    login(state, payload) {
      state.isLoggedIn = true;
      state.currentUser.username = payload.username;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser.username = "";
    },
  },

  actions: {},
});
export default store;
