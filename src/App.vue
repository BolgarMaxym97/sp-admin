<template>
    <div id="app">
        <top-bar></top-bar>
        <b-container fluid>
            <b-row>
                <b-col cols="2" class="left-sidebar-col">
                    <left-side-bar></left-side-bar>
                </b-col>
                <b-col>
                    <router-view/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TopBar from "./components/layout/TopBar";
    import LeftSideBar from "./components/layout/LeftSideBar";

    export default {
        data() {
            return {};
        },
        created: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function () {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch("logout");
                    }
                    throw err;
                });
            });
        },
        components: {
            TopBar,
            LeftSideBar,
        },
    };
</script>

<style scoped>
    .left-sidebar-col {
        min-height: 100vh;
        background-color: #343a40 !important;
    }

    #app {
        min-height: 100vh;
    }
</style>