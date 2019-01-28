import axios from "axios";
import qs from "qs";
import _ from "lodash";
import Cookies from "js-cookie";
import Vue from "vue";

const ENDPOINTS = {
    LOGIN: "login",
    REGISTER: "register",
};

let api = axios.create({
    baseURL: process.env.VUE_APP_API_HOST,
    transformRequest: [
        (data) => qs.stringify(data)
    ],
});

api.interceptors.request.use((config) => {
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return _.get(response, "data", {});
}, error => {
    let messages = _.get(error, "response.data.messages", [_.get(error, "response.data.message", "")]);
    _.each(messages, function (message) {
        Vue.prototype.$toastr("error", message, "Ошибка выполнения");
    });
    return Promise.reject({messages: messages});
});

let token = Cookies.get("token");
if (token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export {api, ENDPOINTS};