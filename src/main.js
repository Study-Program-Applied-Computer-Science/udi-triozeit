import { createApp } from "vue";
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

const app = createApp(App);

app.use(LoadingPlugin);
app.use(router);
app.use(store);
app.mount("#app");
