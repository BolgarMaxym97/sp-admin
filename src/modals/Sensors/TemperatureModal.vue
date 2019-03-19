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
                chartOptions: Object.assign(config.defaultOptionsForChart, {
                    yAxis: {
                        type: "logarithmic",
                        opposite: false,
                        tickInterval: 1,
                        title: {
                            align: "middle",
                            text: ""
                        },
                        plotLines: [{
                            value: this.maxNormalValue,
                            color: "#dd4b39",
                            dashStyle: "shortdash",
                            width: 2,
                            label: {
                                text: "Максимальное нормальное значение" + this.maxNormalValue
                            }
                        }, {
                            value: this.minNormalValue,
                            color: "#004181",
                            dashStyle: "shortdash",
                            width: 2,
                            label: {
                                text: "Минимальное нормальное значение" + this.minNormalValue
                            }
                        }]
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
                        color: "#d4821c",
                        type: "spline",
                        marker: {
                            enabled: true,
                            symbol: "circle",
                            lineWidth: 1,
                            radius: 3
                        },
                        data: [],
                    }]
                })
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
                        this.chartOptions.yAxis.plotLines[0].value = _.get(resp, "sensor.settings.max_normal_value");
                        this.chartOptions.yAxis.plotLines[0].label.text = _.get(resp, "sensor.settings.max_normal_value");
                        this.chartOptions.yAxis.plotLines[1].value = _.get(resp, "sensor.settings.min_normal_value");
                        this.chartOptions.yAxis.plotLines[1].label.text = _.get(resp, "sensor.settings.min_normal_value");
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