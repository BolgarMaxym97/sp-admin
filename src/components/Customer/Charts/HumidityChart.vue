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
            this.addPlugin({
                afterDraw(chart) {
                    const dataSet =chart.getDatasetMeta(0);
                    const data = dataSet.controller._data;
                    data.forEach((item, i) => {
                        if (item > chart.annotation.options.annotations[0].value) {
                            dataSet.data[i]._model.pointStyle = "rect";
                            dataSet.data[i]._model.radius = 3;
                            dataSet.data[i]._model.backgroundColor = "#dd4b39";
                            dataSet.data[i]._model.borderColor = "#dd4b39";
                        }
                        if (item < chart.annotation.options.annotations[1].value) {
                            dataSet.data[i]._model.pointStyle = "rect";
                            dataSet.data[i]._model.radius = 3;
                            dataSet.data[i]._model.backgroundColor = "#004181";
                            dataSet.data[i]._model.borderColor = "#004181";
                        }
                    });
                },
            });
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