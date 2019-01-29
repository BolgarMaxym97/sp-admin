<template>
    <div id="app">
        <top-bar v-if="isLoggedIn"></top-bar>
        <b-container fluid>
            <b-row>
                <VuePerfectScrollbar class="left-sidebar-col" v-once :settings="scrollBarrSetting">
                    <b-col v-if="isLoggedIn" cols="2" style="max-width: 100%;">
                        <left-side-bar></left-side-bar>
                    </b-col>
                </VuePerfectScrollbar>
                <b-col>
                    <router-view/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TopBar from "@/components/layout/TopBar";
    import LeftSideBar from "@/components/layout/LeftSideBar";
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    import config from "@/config";

    export default {
        data() {
            return {
                scrollBarrSetting: config.vueScrollOptions
            };
        },
        components: {
            TopBar,
            LeftSideBar,
            VuePerfectScrollbar
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }
        },
    };
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto");

    #app {
        font-family: Roboto, serif;
        height: calc(100% - 56px);
    }

    .left-sidebar-col {
        min-height: calc(100vh - 56px);
        max-height: calc(100vh - 56px);
        overflow-y: auto;
        background-color: #272c33;
        padding: 0;
        width: 300px;
    }
</style>