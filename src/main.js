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
import VueMoment from "vue-moment";
import moment from "moment";
import "moment/locale/ru";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser, faSignInAlt, faArrowRight, faArrowLeft, faSpinner, faUsers, faNetworkWired, faThermometerHalf, faPlus, faTint, faGripLinesVertical, faBars, faTrash, faSlidersH, faTable, faChartBar, faSave, faCode, faStar, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VueToastr from "@deveodk/vue-toastr";
import "@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css";
import {api} from "@/api";
import config from "@/config";
import VueHighcharts from "vue-highcharts";
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";
import mapInit from "highcharts/modules/map";

library.add(faUser, faSignInAlt, faArrowRight, faArrowLeft, faSpinner, faUsers, faNetworkWired, faThermometerHalf, faPlus, faTint, faGripLinesVertical, faBars, faTrash, faSlidersH, faTable, faChartBar, faSave, faCode, faStar, faEdit);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueToastr, config.toastrDefaultOptions);
Vue.use(VueMoment, {moment});
Highcharts.setOptions({
    lang: {
        loading: "Загрузка...",
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        shortMonths: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
        exportButtonTitle: "Экспорт",
        printButtonTitle: "Печать",
        rangeSelectorFrom: "С",
        rangeSelectorTo: "По",
        rangeSelectorZoom: "Период",
        downloadPNG: "Скачать PNG",
        downloadJPEG: "Скачать JPEG",
        downloadPDF: "Скачать PDF",
        downloadSVG: "Скачать SVG",
        printChart: "Напечатать график"
    }
});
stockInit(Highcharts);
mapInit(Highcharts);
Vue.use(VueHighcharts);
Vue.prototype.$http = api;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
