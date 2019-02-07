export default {
    isLoggedIn: state => !!state.token,
    userName: state => `${state.user.name_first} ${state.user.name_last}`,
    isMenuOpened: state => state.menuOpened
};