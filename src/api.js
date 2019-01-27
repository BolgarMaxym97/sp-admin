import axios from "axios";
import qs from "qs";
import _ from "lodash";
import Cookies from "js-cookie";

/**
 * axios api
 */
let api = axios.create({
    baseURL: process.env.VUE_APP_API_HOST,
    transformRequest: [
        (data) => qs.stringify(data)
    ],
});

// request header
api.interceptors.request.use((config) => {
    return config;
}, error => {
    return Promise.reject(error);
});

// response parse
api.interceptors.response.use((response) => {
    return _.get(response, "data", {});
}, error => {
    console.warn("Error status", error.response.status);
    let messages = _.get(error, "response.data.messages", [_.get(error, "response.data.message", "")]);
    // TODO: toastr add here and test api request
    return Promise.reject({messages: messages});
});

const token = Cookies.get("token");
if (token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default api;