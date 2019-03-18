<template>
    <div class="dashboard">
        <top-icons :customersCount="customersCount" :nodesCount="nodesCount" :sensorsCount="sensorsCount"/>
        <b-row>
            <b-card class="text-center m-auto chart-card">
                <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
                <highstock v-else :options="chartOptions"></highstock>
            </b-card>
        </b-row>
    </div>
</template>

<script>
    import TopIcons from "@/components/Dashboard/TopIcons";
    import {ENDPOINTS} from "@/api";
    import config from "@/config";

    export default {
        data() {
            return {
                customersCount: 0,
                nodesCount: 0,
                sensorsCount: 0,
                labels: [],
                data: [],
                loading: true,
                chartOptions: Object.assign(config.defaultOptionsForChart, {
                    series: [{
                        name: "Клиенты",
                        showInNavigator: true,
                        color: "#d4821c",
                        type: "spline",
                        marker: {
                            enabled: true,
                            symbol: "circle",
                            lineWidth : 1,
                            radius: 5
                        },
                        data: [],
                    }, {
                        name: "Объекты",
                        showInNavigator: true,
                        color: "#301846",
                        type: "spline",
                        marker: {
                            enabled: true,
                            symbol: "diamond",
                            lineWidth : 1,
                            radius: 5
                        },
                        data: [],
                    }]
                })
            };
        },

        mounted() {
            this.$http.get(ENDPOINTS.STATISTIC)
                .then(statistic => {
                    this.customersCount = statistic.customers_count;
                    this.nodesCount = statistic.nodes_count;
                    this.sensorsCount = statistic.sensors_count;
                    this.chartOptions.series[0].data = statistic.customersCountByDates;
                    this.chartOptions.series[1].data = statistic.nodesCountByDates;
                    this.loading = false;
                });
        },
        components: {
            TopIcons
        },
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .dashboard {
        padding: 2%;
    }

    .chart-card {
        position: relative;
        width: calc(100% - 30px);
        height: 450px;
    }

    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }
</style>

