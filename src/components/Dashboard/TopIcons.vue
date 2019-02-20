<template>
    <b-row>
        <top-icon :key="index" v-for="(topIcon, index) in topIcons" :icon="topIcon"/>
    </b-row>
</template>

<script>
    import TopIcon from "@/components/Dashboard/TopIcon";

    export default {
        props: {
            customersCount: {
                type: Number,
                required: true
            },
            nodesCount: {
                type: Number,
                required: true
            },
            sensorsCount: {
                type: Number,
                required: true
            },
        },
        computed: {
            topIcons() {
                return {
                    customersCount: {
                        name: "Клиенты",
                        count: this.customersCount,
                        bg_class: "bg-primary-color-2",
                        icon: "users",
                        is_percent: false
                    },
                    nodesCount: {
                        name: "Объекты",
                        count: this.nodesCount,
                        bg_class: "bg-primary-color-5",
                        icon: "network-wired",
                        is_percent: false
                    },
                    sensorsCount: {
                        name: "Датчики",
                        count: this.sensorsCount,
                        bg_class: "bg-primary-color-3",
                        icon: "thermometer-half",
                        is_percent: false
                    }
                };
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

