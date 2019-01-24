import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        token: localStorage.getItem("token") || "",
        user: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, token, user) {
            state.status = "success";
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
        },
    },
    actions: {
        login({commit}, data) {
            console.log(data);
            return new Promise((resolve, reject) => {
                commit("auth_request");
                Vue.prototype.$http.post("login", data)
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                        commit("auth_success", token, user);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        register({commit}, data) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                Vue.prototype.$http.post("register", data)
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                        commit("auth_success", token, user);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("auth_error", err);
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit("logout")
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        }
    },
});
