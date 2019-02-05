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
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                },
                hover: {
                    onHover: function () {
                        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                            const activePoint = this.chart.tooltip._active[0],
                                ctx = this.chart.ctx,
                                x = activePoint.tooltipPosition().x,
                                topY = this.chart.scales["y-axis-0"].top,
                                bottomY = this.chart.scales["y-axis-0"].bottom;
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(x, topY);
                            ctx.lineTo(x, bottomY);
                            ctx.lineWidth = 1;
                            ctx.setLineDash([5, 8]);
                            ctx.strokeStyle = "#45171d";
                            ctx.stroke();
                            ctx.restore();
                        }
                    },
                    animationDuration: 0,
                }
            };

            this.renderChart(this.chartData, options);
        }
    };
</script>