<script>
    import {Bar, mixins} from "vue-chartjs";
    import config from "@/config";
    import constants from "@/constants";

    export default {
        extends: Bar,
        mixins: [mixins.reactiveProp],
        props: {
            chartData: {
                type: Object,
                required: true
            }
        },
        mounted() {
            const options = Object.assign(config.defaultOptionsForChartModal, {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Состояние, открыто/закрыто"
                        },
                        ticks: {
                            max: 1.5,
                            min: -1.5,
                            display: false
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Время"
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel === constants.WINDOW_IS_OPENED ? "Форточка открыта" : "Форточка закрыта";
                        }
                    }
                }
            });

            this.renderChart(this.chartData, options);
        }
    };
</script>