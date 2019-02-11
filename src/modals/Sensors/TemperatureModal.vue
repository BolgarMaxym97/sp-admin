<template>
    <b-modal :visible="true"
             title="Данные о температуре"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ref="modal"
             @shown="modalHeight"
             @hidden="onHidden">
        <temperature-chart :chartData="chartData"/>
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
                document.getElementsByTagName("canvas")[0].style.height = "600px";
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

<style scoped>

</style>