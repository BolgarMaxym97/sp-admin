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
            <b-alert v-if="!loading && !this.data.length" variant="danger" show class="no-data-alert">Нету данных за эту
                дату
            </b-alert>
            <temperature-chart v-else :chartData="chartData" :max-normal-value="maxNormalValue"
                               :min-normal-value="minNormalValue"/>
        </div>
    </b-modal>
</template>

<script>
    import TemperatureChart from "@/components/Customer/Charts/TemperatureChart";
    import DatePicker from "@/components/Customer/Charts/DatePicker";
    import {ENDPOINTS} from "@/api";
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
                labels: [],
                data: [],
                loading: false,
                disabledDatepicker: true,
                maxNormalValue: null,
                minNormalValue: null,
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
                        this.data = resp.data;
                        this.labels = resp.labels;
                        this.disabledDatepicker = false;
                        this.maxNormalValue = _.get(resp, "sensor.settings.max_normal_value");
                        this.minNormalValue = _.get(resp, "sensor.settings.min_normal_value");
                    });
            },
            afterDateChange(payload) {
                this.date = payload;
                this.fetch();
            }
        },
        computed: {
            chartData() {
                return {
                    labels: this.labels,
                    datasets: [
                        {
                            label: "Температура",
                            borderColor: "#d4821c",
                            pointBackgroundColor: "#9a5b1c",
                            backgroundColor: "#d4821c",
                            borderWidth: 2,
                            pointRadius: 2,
                            fill: false,
                            data: this.data
                        }
                    ],
                };
            }
        },
        components: {
            TemperatureChart,
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