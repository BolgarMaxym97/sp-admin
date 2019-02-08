import axios from "axios";
import qs from "qs";
import _ from "lodash";
import Cookies from "js-cookie";
import Vue from "vue";
import store from "@/store/index";
import router from "@/router";

const ENDPOINTS = {
    LOGIN: "login",
    REGISTER: "register",
    CUSTOMERS: "customers",
    STATISTIC: "statistic",
    NODES: "nodes",
    NODE_TYPES: "node-types",
};

let api = axios.create({
    baseURL: process.env.VUE_APP_API_HOST,
    transformRequest: [
        (data) => qs.stringify(data)
    ],
});

api.interceptors.request.use((config) => {
    return config;
});

api.interceptors.response.use((response) => {
    return _.get(response, "data", {});
}, error => {
    if (!error.response) {
        Vue.prototype.$toastr("error", "Bad request", "Ошибка выполнения");
    }
    if (error.response.status === 401) {
        store.dispatch("logout").then(() => router.push("/login"));
    } else if (error.response.status === 422) {
        _.each(error.response.data.errors, function (errors) {
            _.each(errors, function (error) {
                Vue.prototype.$toastr("error", error, _.get(error, "response.data.message", "Ошибка выполнения"));
            });
        });
    } else {
        let messages = _.get(error, "response.data.messages", [_.get(error, "response.data.message", "")]);
        _.each(messages, function (message) {
            Vue.prototype.$toastr("error", message, "Ошибка выполнения");
        });
    }

});

let token = Cookies.get("token");
if (token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export {api, ENDPOINTS};