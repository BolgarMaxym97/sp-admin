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
        <p v-else-if="!loading && !this.data.length">Нету данных за эту дату</p>
        <temperature-chart v-else :chartData="chartData"/>
    </b-modal>
</template>

<script>
    import TemperatureChart from "@/components/Customer/Charts/TemperatureChart";
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
                labels: [],
                data: [],
                loading: false,
            };
        },
        mounted() {
            this.loading = true;
            this.$http.get(ENDPOINTS.SENSORS + "/" + this.sensorId)
                .then(resp => {
                    this.data = resp.data;
                    this.labels = resp.labels;
                    this.loading = false;
                });
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
            TemperatureChart
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