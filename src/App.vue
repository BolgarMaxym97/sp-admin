<template>
    <div id="app">
        <top-bar v-if="isLoggedIn"></top-bar>
        <b-container fluid class="h-100">
            <b-row class="h-100">
                <b-col v-if="isLoggedIn" cols="2" class="left-sidebar-col">
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
    import TopBar from "@/components/layout/TopBar";
    import LeftSideBar from "@/components/layout/LeftSideBar";

    export default {
        data() {
            return {};
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }
        },
        components: {
            TopBar,
            LeftSideBar,
        },
    };
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    #app {
        font-family: Roboto, serif;
        height: calc(100% - 56px);
    }
    
    .left-sidebar-col {
        height: 100%;
        background-color: #272c33;
    }
</style>