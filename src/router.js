import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Customer from "@/views/Customer.vue";
import Admins from "@/views/Admins.vue";
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
            path: "/customer/:id",
            name: "customer_page",
            component: Customer,
            meta: {
                title: "Объекты клиента"
            }
        },
        {
            path: "/admins",
            name: "admins_page",
            component: Admins,
            meta: {
                title: "Управление администраторами"
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
