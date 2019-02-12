<script>
    import {Line, mixins} from "vue-chartjs";
    import config from "@/config";

    export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: ["chartData"],
        mounted() {
            const options = Object.assign(config.defaultOptionsForChartModal, {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Влажность, %"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Время"
                        }
                    }]
                }
            });

            this.renderChart(this.chartData, options);
        }
    };
</script>