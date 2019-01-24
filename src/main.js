import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_HOST;
const token = localStorage.getItem("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
