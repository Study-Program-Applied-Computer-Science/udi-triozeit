import { createRouter, createWebHistory } from "vue-router";
import Report from "./components/pages/Report.vue";
import Dashboard from "./components/pages/Dashboard.vue";
import Expenses from "./components/pages/Expenses.vue";
import SignUp from "./components/pages/SignUp.vue";
import Login from "./components/pages/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/report", component: Report },
    { path: "/expenses", component: Expenses },
    { path: "/signup", component: SignUp },
    { path: "/login", component: Login },
  ],
});

export default router;
