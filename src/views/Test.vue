<template>
    <div class="test">
        {{!!isLoggedIn}}
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
    };
</script>
