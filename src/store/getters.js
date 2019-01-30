export default {
    isLoggedIn: state => !!state.token,
    userName: state => `${state.user.name_first} ${state.user.name_last}`,
    customers: state => state.customers,
    customersCount: state => state.customers.length,
};