<template>
    <div class="top-bar">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <font-awesome-icon icon="bars" @click="menuToggle" class="burger-icon"/>
            <router-link to="/">
                <b-navbar-brand>
                    {{title}}
                </b-navbar-brand>
            </router-link>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown :text="userName || 'Пользователь'" right>
                    <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            userName() {
                return this.$store.getters.userName;
            },
            title() {
                return process.env.VUE_APP_TITLE;
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("logout")
                    .then(() => {
                        this.$router.push("/login");
                    });
            },
            menuToggle() {
                this.$store.dispatch("toggleMenu");
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .top-bar {
        background-color: $topbar-bg-color;
        position: fixed;
        width: 100%;
        z-index: 999;
    }

    .burger-icon {
        display: none;
        margin-right: 20px;
        font-size: 22px;
        color: $primary-app-bg-color;
        cursor: pointer;
    }

    @media screen and (max-width: 1280px) {
        .burger-icon {
            display: block;
        }
    }
</style>