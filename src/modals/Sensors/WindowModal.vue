<template>
    <b-modal :visible="true"
             title="Данные о состоянии форточки"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ref="modal"
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
    import Vue from "vue";
    import DatePicker from "@/components/Customer/Charts/DatePicker";
    import {ENDPOINTS} from "@/api";
    import config from "@/config";

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
                        min: -1,
                        max: 1,
                        opposite: false,
                        tickInterval: 1,
                        labels: {
                            enabled: false
                        },
                        title: {
                            align: "middle",
                            text: "Состояние, открыто/закрыто"
                        },
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
                    tooltip: {
                        formatter() {
                            return `${Vue.prototype.$moment.unix(this.x / 1000).format("DD MMMM, dddd - HH:mm")} <br/> <b>${this.y === 1 ? "Форточка закрыта" : "Форточка открыта"}</b>`;
                        }
                    },
                    series: [{
                        name: "Состояние",
                        showInNavigator: true,
                        type: "column",
                        color: "#d4821c",
                        marker: {
                            enabled: true,
                            symbol: "circle",
                            color: "#d4821c",
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
                        this.chartOptions.series[0].data = resp.data.map(item => item[1] === 0 ? [item[0], -1] : [item[0], item[1]]);
                        this.disabledDatepicker = false;
                    });
            },
            afterDateChange(payload) {
                this.date = payload;
                this.fetch();
            }
        },
        computed: {
            dataLength() {
                return !!this.chartOptions.series[0].data.length;
            },
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

    .change-date {
        text-align: left;
        margin: 0 0 15px 20px;

        .loader {
            font-size: 24px;
            margin: 5px 0 0 5px;
            width: 24px !important;
        }

        * {
            display: inline-block;
        }
    }

    .arrow-btn {
        padding: 0.28rem 0.75rem;
        margin: 0 5px;
        background-color: $primary-color-5;
    }
</style>