import { createRouter, createWebHistory } from "vue-router";
import Report from "./components/pages/Report.vue";
import Dashboard from "./components/pages/Dashboard.vue";
import Expenses from "./components/pages/UserExpenses.vue";
import SignUp from "./components/pages/SignUp.vue";
import Login from "./components/pages/Login.vue";
import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/report", component: Report, meta: { requiresAuth: true } },
    { path: "/expenses", component: Expenses, meta: { requiresAuth: true } },
    { path: "/signup", component: SignUp },
    { path: "/login", component: Login },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticatedStatus = store.getters.checkLoginStatus;
    console.log(isAuthenticatedStatus);
    if (isAuthenticatedStatus) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
