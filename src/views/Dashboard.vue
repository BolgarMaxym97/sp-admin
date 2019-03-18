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

    export default {
        data() {
            return {
                customersCount: 0,
                nodesCount: 0,
                sensorsCount: 0,
                labels: [],
                data: [],
                loading: true,
                chartOptions: {
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: 'AAPL Stock Price'
                    },
                    series: [{
                        name: 'AAPL',
                        data: [10, 20, 10, 23, 65, 121, 44, 66, 98, 30, 32, 56, 25, 12, 53],
                        pointStart: Date.UTC(2018, 1, 1),
                        pointInterval: 1000 * 3600 * 24,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                }
            };
        },

        mounted() {
            this.$http.get(ENDPOINTS.STATISTIC)
                .then(statistic => {
                    this.customersCount = statistic.customers_count;
                    this.nodesCount = statistic.nodes_count;
                    this.sensorsCount = statistic.sensors_count;
                    this.labels = statistic.chartData.labels;
                    this.data = statistic.chartData.data;
                    this.loading = false;
                });
        },
        computed: {
            chartData() {
                return {
                    labels: this.labels,
                    datasets: [
                        {
                            label: "Клиенты",
                            borderColor: "#d4821c",
                            pointBackgroundColor: "#9a5b1c",
                            backgroundColor: "#d4821c",
                            fill: false,
                            data: this.data[0]
                        },
                        {
                            label: "Объекты",
                            borderColor: "#301846",
                            pointBackgroundColor: "#221130",
                            backgroundColor: "#301846",
                            fill: false,
                            data: this.data[1]
                        }
                    ],
                };
            }
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

