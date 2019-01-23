import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Login from "./views/Login.vue";

Vue.use(Router);
console.log(process.env);
export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "main",
            component: Main,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
    ],
});
