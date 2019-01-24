import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Login from "./views/Login.vue";
import store from "./store.js";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "main",
            component: Main,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;
