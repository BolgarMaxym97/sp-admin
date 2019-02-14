<script>
    import {Line, mixins} from "vue-chartjs";
    import config from "@/config";

    export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: {
            chartData: {
                type: Object,
                required: true
            },
            maxNormalValue: {
                type: String,
                required: true
            },
            minNormalValue: {
                type: String,
                required: true
            }
        },
        mounted() {
            const options = Object.assign(config.defaultOptionsForChartModal, {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Влажность, %"
                        },
                        ticks: {
                            max: 110,
                            min: 0
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Время"
                        }
                    }]
                },
                annotation: {
                    drawTime: "afterDraw",
                    annotations: [
                        ...config.minMaxLines(this.minNormalValue, this.maxNormalValue)
                    ]
                }
            });

            this.renderChart(this.chartData, options);
        }
    };
</script>