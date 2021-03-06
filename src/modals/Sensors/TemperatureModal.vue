<template>
    <b-modal :visible="true"
             :title="`Данные о температуре за ${date}`"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ref="modal"
             @shown="modalHeight"
             @hidden="onHidden">
        <date-picker @after-change="afterDateChange" :date="date" :disabledDatepicker="disabledDatepicker"/>
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else>
            <b-alert v-if="!loading && !dataLength" variant="danger" show class="no-data-alert">Нету данных за эту
                дату
            </b-alert>
            <highstock v-else :options="chartOptions"></highstock>
        </div>
    </b-modal>
</template>

<script>
    import DatePicker from "@/components/Customer/Charts/DatePicker";
    import {ENDPOINTS} from "@/api";
    import config from "@/config";
    import _ from "lodash";
    import Vue from "vue";

    export default {
        props: {
            sensorId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                date: this.$moment().format("DD.MM.YYYY"),
                loading: false,
                disabledDatepicker: true,
                chartOptions: {
                    ...config.defaultOptionsForChart, ...{
                        yAxis: {
                            opposite: false,
                            tickInterval: 1,
                            title: {
                                align: "middle",
                                text: "Температура, °C"
                            },
                            plotLines: [{
                                value: null,
                                color: "#dd4b39",
                                dashStyle: "shortdash",
                                width: 2,
                                zIndex: 5,
                                label: {
                                    text: "Максимальное нормальное значение"
                                }
                            }, {
                                value: null,
                                color: "#004181",
                                dashStyle: "shortdash",
                                width: 2,
                                zIndex: 5,
                                label: {
                                    text: "Минимальное нормальное значение"
                                }
                            }],
                        },
                        xAxis: {
                            title: {
                                align: "middle",
                                text: "Время"
                            },
                        },
                        title: {
                            text: ""
                        },
                        legend: {
                            enabled: false,
                        },
                        series: [{
                            name: "Температура",
                            showInNavigator: true,
                            color: "#dd4b39",
                            type: "spline",
                            marker: {
                                enabled: true,
                                symbol: "circle",
                                color: "#dd4b39",
                                lineWidth: 1,
                                radius: 0
                            },
                            data: [],
                            zones: [{
                                value: null,
                                color: "#004181"
                            }, {
                                value: null,
                                color: "#d4821c"
                            }]
                        }, {
                            name: "Goal",
                            type: "scatter",
                            enableMouseTracking: false,
                            marker: {
                                enabled: false
                            },
                            data: []
                        }],
                        tooltip: {
                            formatter() {
                                return `${Vue.prototype.$moment.unix(this.x / 1000).format("DD MMMM, dddd - HH:mm")} <br> <b>Температура - ${this.y}, °C</b>`;
                            }
                        }
                    }
                }
            };
        },
        mounted() {
            this.loading = true;
            this.fetch().then(() => this.loading = false);
        },
        computed: {
            dataLength() {
                return !!this.chartOptions.series[0].data.length;
            },
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            modalHeight() {
                let canvasElement = document.getElementsByTagName("canvas")[0];
                if (canvasElement) {
                    canvasElement.style.height = "600px";
                }
            },
            fetch() {
                if (!this.date.length) {
                    return false;
                }
                this.disabledDatepicker = true;
                return this.$http.get(ENDPOINTS.SENSORS + "/" + this.sensorId, {params: {date: this.date}})
                    .then(resp => {
                        this.chartOptions.series[0].data = resp.data;
                        this.disabledDatepicker = false;
                        let max = parseFloat(_.get(resp, "sensor.settings.max_normal_value"));
                        let min = parseFloat(_.get(resp, "sensor.settings.min_normal_value"));
                        this.chartOptions.yAxis.plotLines[0].value = max;
                        this.chartOptions.yAxis.plotLines[1].value = min;
                        this.chartOptions.series[0].zones[0].value = min;
                        this.chartOptions.series[0].zones[1].value = max;
                        this.chartOptions.series[1].data = [[this.$moment().unix() * 1000, max + 1], [this.$moment().unix() * 1000, min - 1]];
                    });
            },
            afterDateChange(payload) {
                this.date = payload;
                this.fetch();
            }
        },
        components: {
            DatePicker
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        font-size: 72px;
    }

    .no-data-alert {
        margin-top: 20px;
    }
</style>