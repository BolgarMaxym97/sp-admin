<template>
    <b-row>
        <top-icon :key="index" v-for="(topCard, index) in topCards" :card="topCard"/>
    </b-row>
</template>

<script>
    import TopIcon from "@/components/Dashboard/TopIcon";

    export default {
        data() {
            return {
                topCards: [
                    {
                        name: "Test",
                        count: 5,
                        bg_class: "bg-primary-color-6",
                        icon: "sign-in-alt",
                        is_percent: false
                    },
                    {
                        name: "Test",
                        count: 5,
                        bg_class: "bg-primary-color-5",
                        icon: "sign-in-alt",
                        is_percent: true
                    },
                    {
                        name: "Test",
                        count: 5,
                        bg_class: "bg-primary-color-3",
                        icon: "sign-in-alt",
                        is_percent: true
                    },
                    {
                        name: "Test",
                        count: 5,
                        bg_class: "bg-primary-color-7",
                        icon: "sign-in-alt",
                        is_percent: true
                    },
                ]
            };
        },
        components: {
            TopIcon,
        },
    };
</script>

<style scoped>
    .dashboard {
        padding: 2%;
    }
</style>

