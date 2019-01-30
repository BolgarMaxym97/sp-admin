<template>
    <b-row>
        <top-icon :key="index" v-for="(topCard, index) in topCards" :card="topCard"/>
    </b-row>
</template>

<script>
    import TopIcon from "@/components/Dashboard/TopIcon";

    export default {
        data() {
            return {};
        },
        computed:{
            topCards: function () {
                return [
                    {
                        name: "Customers",
                        count: this.$store.getters.customersCount,
                        bg_class: "bg-primary-color-6",
                        icon: "users",
                        is_percent: false
                    },
                    {
                        name: "Test",
                        count: 0,
                        bg_class: "bg-primary-color-5",
                        icon: "spinner",
                        is_percent: false
                    },
                    {
                        name: "Test",
                        count: 0,
                        bg_class: "bg-primary-color-3",
                        icon: "spinner",
                        is_percent: false
                    },
                    {
                        name: "Test",
                        count: 0,
                        bg_class: "bg-primary-color-7",
                        icon: "spinner",
                        is_percent: false
                    },
                ];
            }
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

