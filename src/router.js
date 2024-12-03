import { createRouter, createWebHistory } from "vue-router";
import Report from "./components/Report.vue";
import Dashboard from "./components/Dashboard.vue";
import Expenses from "./components/Expenses.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Dashboard },
        { path: "/report", component: Report },
        { path: "/expenses", component: Expenses },
    ],
});



export default router;