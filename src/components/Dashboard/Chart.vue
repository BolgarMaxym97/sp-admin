<script>
    import {Line, mixins} from "vue-chartjs";
    // eslint-disable-next-line
    import chartjsPluginAnnotation from "chartjs-plugin-annotation";

    export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: ["chartData"],
        mounted() {
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Статистика"
                },
                tooltips: {
                    mode: "x-axis"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                hover: {
                    onHover: function () {

                    }
                }
            };

            this.renderChart(this.chartData, options);
        }
    };
</script>