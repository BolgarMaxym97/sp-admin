<template>
    <div class="top-bar">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <router-link to="/">
                <b-navbar-brand>Smart Plants</b-navbar-brand>
            </router-link>
            <b-navbar-nav class="ml-auto">
                <b-nav-item>UserName</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
    };
</script>