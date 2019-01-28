<template>
    <div id="app">
        <top-bar v-if="isLoggedIn"></top-bar>
        <b-container fluid>
            <b-row>
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
    }
    
    .left-sidebar-col {
        min-height: 100vh;
        background-color: #272c33;
    }
</style>