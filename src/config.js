export default {
    toastrDefaultOptions: {
        defaultPosition: "toast-top-right",
        defaultType: "info",
        defaultTimeout: 4000
    },
    vueScrollOptions: {
        wheelSpeed: 0.5,
        maxScrollbarLength: 60,
    },
    defaultOptionsForChartModal: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            mode: "x-axis"
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
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
    }
};