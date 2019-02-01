<template>
    <b-row>
        <top-icon :key="index" v-for="(topIcon, index) in topIcons" :icon="topIcon"/>
    </b-row>
</template>

<script>
    import TopIcon from "@/components/Dashboard/TopIcon";
    import {ENDPOINTS} from "@/api";

    export default {
        data() {
            return {
                topIcons: {
                    customersCount: {
                        name: "Клиенты",
                        count: 0,
                        bg_class: "bg-primary-color-2",
                        icon: "users",
                        is_percent: false
                    },
                    nodesCount: {
                        name: "Объекты",
                        count: 0,
                        bg_class: "bg-primary-color-5",
                        icon: "network-wired",
                        is_percent: false
                    },
                    sensorsCount: {
                        name: "Сенсоры",
                        count: 0,
                        bg_class: "bg-primary-color-3",
                        icon: "thermometer-half",
                        is_percent: false
                    }
                }
            };
        },
        mounted() {
            this.$http.get(ENDPOINTS.STATISTIC)
                .then(statistic => {
                    this.topIcons.customersCount.count = statistic.customers_count;
                    this.topIcons.nodesCount.count = statistic.objects_count;
                    this.topIcons.sensorsCount.count = statistic.sensors_count;
                });
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

