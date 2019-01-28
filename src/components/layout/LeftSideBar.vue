<template>
    <div class="left-side-bar">
        <user
                v-for="(user, index) in users"
                :key="index"
                :user="user">
        </user>
    </div>
</template>

<script>
    import User from "@/components/Sidebar/User";
    import {ENDPOINTS} from "@/api";

    export default {
        data() {
            return {
                users: [
                    {
                        name_first: "First 1",
                        name_last: "Last 1",
                    },
                    {
                        name_first: "First 2",
                        name_last: "Last 2",
                    },
                ]
            };
        },
        mounted() {
            console.log(this.$http.defaults.headers.common);
            this.$http.get(ENDPOINTS.CUSTOMERS)
                .then(resp => {
                    console.log(resp);
                });
        },
        components: {
            User,
        },
    };
</script>