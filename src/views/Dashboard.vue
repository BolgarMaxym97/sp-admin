<template>
    <div class="dashboard">
        <top-icons :customersCount="customersCount" :nodesCount="nodesCount" :sensorsCount="sensorsCount"/>
        <b-row>
            <b-col xl="6" lg="6" md="6">
                <b-card class="text-center m-auto card-item">
                    <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
                    <highstock v-else :options="chartOptions"></highstock>
                </b-card>
            </b-col>
            <b-col xl="6" lg="6" md="6">
                <b-card class="text-center m-auto card-item">
                    <!--TODO: remove hardcode data and make data dynamic-->
                    <highmaps :options="mapOptions"></highmaps>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import TopIcons from "@/components/Dashboard/TopIcons";
    import {ENDPOINTS} from "@/api";
    import config from "@/config";
    import Vue from "vue";
    import dataJson from "@/assets/ukraine";

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
                    ...config.defaultOptionsForChart, ...{
                        series: [{
                            name: "Клиенты",
                            showInNavigator: true,
                            color: "#d4821c",
                            type: "spline",
                            marker: {
                                enabled: true,
                                symbol: "circle",
                                lineWidth: 1,
                                radius: 4
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
                                lineWidth: 1,
                                radius: 5
                            },
                            data: [],
                        }],
                        tooltip: {
                            formatter: function () {
                                let formattedTooltip = `${Vue.prototype.$moment.unix(this.points[0].x / 1000).format("DD MMMM YYYY")}<br>`;

                                this.points.map(point => {
                                    formattedTooltip += `<span style="color: ${point.color}">${point.series.name}: <b>${point.y}</b></span><br>`;
                                });

                                return formattedTooltip;
                            },
                            shared: true
                        },
                    }
                },
                mapOptions: {
                    chart: {
                        borderWidth: 0
                    },
                    title: {
                        text: "Рассположение объектов"
                    },
                    legend: {
                        enabled: false
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: "bottom"
                        }
                    },
                    colorAxis: {
                        min: 0,
                        maxColor: "#301846"
                    },
                    series: [{
                        mapData: dataJson,
                        name: "Объектов в области",
                        data: [
                            ["ua-my", 0],
                            ["ua-ks", 1],
                            ["ua-kc", 0],
                            ["ua-zt", 0],
                            ["ua-sm", 0],
                            ["ua-dt", 0],
                            ["ua-dp", 0],
                            ["ua-kk", 0],
                            ["ua-lh", 0],
                            ["ua-pl", 0],
                            ["ua-zp", 0],
                            ["ua-sc", 0],
                            ["ua-kr", 0],
                            ["ua-ch", 0],
                            ["ua-rv", 0],
                            ["ua-cv", 0],
                            ["ua-if", 0],
                            ["ua-km", 0],
                            ["ua-lv", 0],
                            ["ua-tp", 0],
                            ["ua-zk", 0],
                            ["ua-vo", 0],
                            ["ua-ck", 0],
                            ["ua-kh", 0],
                            ["ua-kv", 0],
                            ["ua-mk", 0],
                            ["ua-vi", 0]
                        ],
                        states: {
                            hover: {
                                color: "#d4821c"
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            format: "{point.name}"
                        },
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

        .card-item {
            width: 100%;
            height: 450px;
        }
    }


    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }
</style>

