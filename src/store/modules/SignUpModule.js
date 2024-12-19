export default {
  namespaced: true,
  state() {
    return {
      userdetails: [],
    };
  },

  actions: {},

  mutations: {
    setSignUpDetails(state, payload) {
      const user = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      };
      state.userdetails.push(user);
    },
  },

  getters: {
    getUserDetails(state) {
      return state.userdetails;
    },
  },
};
