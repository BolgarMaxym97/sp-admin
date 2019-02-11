<template>
    <b-modal :visible="true"
             title="Данные о температуре"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ref="modal"
             @shown="modalHeight"
             @hidden="onHidden">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else>
            <date-picker value-type="format" v-model="date" lang="ru" :not-after="new Date()"/>
            <p v-if="!loading && !this.data.length">Нету данных за эту дату</p>
            <temperature-chart v-else :chartData="chartData"/>
        </div>
    </b-modal>
</template>

<script>
    import TemperatureChart from "@/components/Customer/Charts/TemperatureChart";
    import DatePicker from "vue2-datepicker";
    import {ENDPOINTS} from "@/api";

    export default {
        props: {
            sensorId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                date: this.$moment().format("YYYY-MM-DD"),
                labels: [],
                data: [],
                loading: false,
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
                return this.$http.get(ENDPOINTS.SENSORS + "/" + this.sensorId, {params: {date: this.date}})
                    .then(resp => {
                        this.data = resp.data;
                        this.labels = resp.labels;
                    });
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
                            borderWidth: 1,
                            pointRadius: 1.5,
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
</style>