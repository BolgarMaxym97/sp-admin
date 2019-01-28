<template>
    <div class="top-bar">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <router-link to="/">
                <b-navbar-brand>Smart Plants</b-navbar-brand>
            </router-link>
            <b-navbar-nav class="ml-auto">
                <b-nav-item>
                    UserName
                    <span v-if="isLoggedIn">|
                        <a @click="logout">Logout</a>
                    </span>
                </b-nav-item>
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
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch("logout")
                    .then(() => {
                        this.$router.push("/login");
                    });
            }
        }
    };
</script>

<style scoped>
    .top-bar {
        background-color: #2f343c;
    }
</style>