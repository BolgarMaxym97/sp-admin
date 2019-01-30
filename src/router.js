import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Test from "@/views/Test.vue";
import store from "@/store/index";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true,
                title: "Админ-панель"
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                closedForAuthed: true,
                title: "Логин"
            }
        },
        {
            path: "/test",
            name: "test",
            component: Test,
            meta: {
                title: "Тест"
            }
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = (to.meta.title || "") + " - " + process.env.VUE_APP_TITLE;
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
