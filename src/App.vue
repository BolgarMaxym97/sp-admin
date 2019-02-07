<template>
    <div id="app">
        <top-bar v-if="isLoggedIn"></top-bar>
        <b-container fluid>
            <b-row>
                <VuePerfectScrollbar v-if="isLoggedIn" class="left-sidebar-col p-0" :class="{show: isMenuOpened}" v-once
                                     :settings="scrollBarrSetting">
                    <b-col cols="2" class="left-sidebar-col-placeholder p-0">
                        <left-side-bar></left-side-bar>
                    </b-col>
                </VuePerfectScrollbar>
                <b-col class="main-content">
                    {{isMenuOpened}}
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
    import { mapGetters } from "vuex";

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
            ...mapGetters([
                "isMenuOpened",
                "isLoggedIn",
            ])
        },
    };
</script>

<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    @import "/assets/scss/colors";

    #app {
        font-family: Roboto, serif;
        height: calc(100% - 56px);
    }

    .left-sidebar-col {
        height: calc(100% - 56px);
        overflow-y: auto;
        background-color: $sidebar-bg-color;
        width: 250px;
        position: fixed;
        margin-top: 56px;
        z-index: 999;
    }

    .left-sidebar-col-placeholder {
        max-width: 100%;
    }

    .main-content {
        margin: 56px 0 0 250px
    }

    .show {
        display: block !important;
    }

    @media screen and (max-width: 1280px) {
        .main-content {
            margin-left: 0;
        }
        .left-sidebar-col {
            display: none;
        }
    }
</style>