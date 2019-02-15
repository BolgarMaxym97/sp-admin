import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/index";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/scss/main.scss";
import "@/assets/css/AdminLTE.min.css";
import vSelect from "vue-select";
import moment from "vue-moment";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser, faSignInAlt, faArrowRight, faArrowLeft, faSpinner, faUsers, faNetworkWired, faThermometerHalf, faPlus, faTint, faGripLinesVertical, faBars, faTrash, faSlidersH, faTable, faChartBar, faSave, faCode} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VueToastr from "@deveodk/vue-toastr";
import "@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css";
import {api} from "@/api";
import config from "@/config";

library.add(faUser, faSignInAlt, faArrowRight, faArrowLeft, faSpinner, faUsers, faNetworkWired, faThermometerHalf, faPlus, faTint, faGripLinesVertical, faBars, faTrash, faSlidersH, faTable, faChartBar, faSave, faCode);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueToastr, config.toastrDefaultOptions);
Vue.use(moment);
Vue.prototype.$http = api;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
