import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Axios from "axios";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import qs from "qs";
import Cookies from "js-cookie";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faUser, faSignInAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.prototype.$http = Axios.create({
    baseURL: process.env.VUE_APP_API_HOST,
    transformRequest: [
        (data) => qs.stringify(data)
    ],
});
const token = Cookies.get("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
