export default {
    auth_success(state, {token, user}) {
        state.token = token;
        state.user = user;
    },
    logout(state) {
        state.token = "";
        state.user = {};
    }
};