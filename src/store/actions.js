import Vue from "vue";
import axios from "axios";

export default {
    login({commit}, data) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$http.post("login", data)
                .then(resp => {
                    const token = resp.data.token.token;
                    const user = resp.data.user;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                    commit("auth_success", {token, user});
                    resolve(resp);
                })
                .catch(err => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    reject(err);
                });
        });
    },
    register({commit}, data) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$http.post("register", data)
                .then(resp => {
                    const token = resp.data.token.token;
                    const user = resp.data.user;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                    commit("auth_success", {token, user});
                    resolve(resp);
                })
                .catch(err => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    reject(err);
                });
        });
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit("logout");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            delete axios.defaults.headers.common["Authorization"];
            resolve();
        });
    }
};