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