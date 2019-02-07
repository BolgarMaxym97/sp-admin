import Vue from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import {ENDPOINTS} from "@/api";

export default {
    // Auth
    login({commit}, data) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$http.post(ENDPOINTS.LOGIN, data)
                .then(resp => {
                    const token = resp.token.token;
                    const user = resp.user;
                    const expires = resp.token.expires;
                    Cookies.set("token", token, {expires: expires});
                    localStorage.setItem("user", JSON.stringify(user));
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                    commit("auth_success", {token, user});
                    resolve(resp);
                })
                .catch(err => {
                    Cookies.remove("token");
                    localStorage.removeItem("user");
                    reject(err);
                });
        });
    },
    register(data) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$http.post("register", data)
                .then(resp => {
                    console.log(resp);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit("logout");
            Cookies.remove("token");
            localStorage.removeItem("user");
            delete axios.defaults.headers.common["Authorization"];
            resolve();
        });
    },
    toggleMenu({commit}) {
        commit("menuToggle");
    }
};