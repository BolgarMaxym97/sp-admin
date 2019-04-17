export default {
    auth_success(state, {token, user}) {
        state.token = token;
        state.user = user;
    },
    logout(state) {
        state.token = "";
        state.user = {};
    },
    menuToggle(state) {
        state.menuOpened = !state.menuOpened;
    },
    customers(state, {customers}) {
        state.customers = customers;
    },
    customersAfterEdit(state, {customer}) {
        state.customers.map((c, index) => {
            if (c.id === customer.id) {
                state.customers[index] = customer;
                return true;
            }
        });
    },
};