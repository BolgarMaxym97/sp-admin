export default {
    toastrDefaultOptions: {
        defaultPosition: "toast-top-right",
        defaultType: "info",
        defaultTimeout: 4000
    },
    vueScrollOptions: {
        wheelSpeed: 0.5,
        maxScrollbarLength: 60,
        wheelPropagation: true,
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
    },
    minMaxLines(minNormalValue, maxNormalValue) {
        return [
            {
                type: "line",
                drawTime: "afterDatasetsDraw",
                id: "a-line-1",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: maxNormalValue,
                borderColor: "#dd4b39",
                borderWidth: 3,
                borderDash: [10, 5],
                label: {
                    backgroundColor: "rgba(221, 75, 57, 0.8)",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: 12,
                    fontStyle: "bold",
                    fontColor: "#fff",
                    position: "center",
                    enabled: true,
                    content: maxNormalValue
                },
            },
            {
                type: "line",
                drawTime: "afterDatasetsDraw",
                id: "a-line-2",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: minNormalValue,
                borderColor: "#004181",
                borderWidth: 3,
                borderDash: [10, 5],
                onMouseover() {
                    this.options.label.enabled = true;
                    this.chartInstance.chart.canvas.style.cursor = "pointer";
                    this.chartInstance.update();
                },
                onMouseout() {
                    this.options.label.enabled = false;
                    this.chartInstance.update();
                },
                label: {
                    backgroundColor: "rgba(0, 65, 129, 0.8)",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: 12,
                    fontStyle: "bold",
                    fontColor: "#fff",
                    position: "center",
                    enabled: true,
                    content: minNormalValue
                },
            }
        ];
    }
}
;