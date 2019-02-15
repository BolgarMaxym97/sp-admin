export default {
    isLoggedIn: state => !!state.token,
    userName: state => `${state.user.name_first || "Пользователь"} ${state.user.name_last || ""}`,
    isMenuOpened: state => state.menuOpened,
    customers: state => state.customers
};