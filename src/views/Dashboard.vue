<template>
    <div class="dashboard">
        <top-icons :customersCount="customersCount" :nodesCount="nodesCount" :sensorsCount="sensorsCount"/>
        <b-row>
            <b-card class="text-center m-auto chart-card">
                <chart :chartData="chartData"/>
            </b-card>
        </b-row>
    </div>
</template>

<script>
    import TopIcons from "@/components/Dashboard/TopIcons";
    import Chart from "@/components/Dashboard/Chart";
    import {ENDPOINTS} from "@/api";

    export default {
        data() {
            return {
                customersCount: 0,
                nodesCount: 0,
                sensorsCount: 0,
                labels: [],
                data: [],
            };
        },

        mounted() {
            this.$http.get(ENDPOINTS.STATISTIC)
                .then(statistic => {
                    this.customersCount = statistic.customers_count;
                    this.nodesCount = statistic.objects_count;
                    this.sensorsCount = statistic.sensors_count;
                    this.labels = statistic.chartData.labels;
                    this.data = statistic.chartData.data;
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
                            data: this.data.customersDataByDates
                        }
                    ],
                };
            }
        },
        components: {
            TopIcons,
            Chart
        },
    };
</script>

<style scoped>
    .dashboard {
        padding: 2%;
    }

    .chart-card {
        position: relative;
        width: calc(100% - 30px);
        height: 450px;
    }
</style>

