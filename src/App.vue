<template>
    <div id="app">
        <top-bar v-if="isLoggedIn"></top-bar>
        <b-container fluid>
            <b-row>
                <VuePerfectScrollbar  v-if="isLoggedIn" class="left-sidebar-col p-0" v-once :settings="scrollBarrSetting">
                    <b-col cols="2" class="left-sidebar-col-placeholder p-0">
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

<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    @import "/assets/scss/colors";

    #app {
        font-family: Roboto, serif;
        height: calc(100% - 56px);
    }

    .left-sidebar-col {
        min-height: calc(100vh - 56px);
        max-height: calc(100vh - 56px);
        overflow-y: auto;
        background-color: $sidebar-bg-color;
        width: 250px;
    }

    .left-sidebar-col-placeholder {
        max-width: 100%;
    }
</style>