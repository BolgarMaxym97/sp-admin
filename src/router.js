import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Test from "@/views/Test.vue";
import store from "@/store/index";

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
            meta: {
                closedForAuthed: true
            }
        },
        {
            path: "/test",
            name: "test",
            component: Test,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        return next("/login");
    } else if (to.matched.some(record => record.meta.closedForAuthed) && store.getters.isLoggedIn) {
        return next("/");
    }
    return next();
});

export default router;
