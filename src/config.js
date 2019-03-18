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
    defaultOptionsForChart: {
        time: {
            useUTC: false
        },
        credits: {
            enabled: false
        },

        yAxis: [{
            opposite: false,
            tickInterval: 1,
            title: {
                align: "middle",
                text: ""
            },
        }],
        plotOptions: {
            line: {
                connectNulls: false,
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 2
                    }
                }
            },
            marker: {
                enabled: true
            },
            series: {
                connectNulls: false
            }
        },
        rangeSelector: {
            enabled: false
        },
        title: {
            text: "Статистика"
        },
        legend: {
            enabled: true,
            align: "center",
            verticalAlign: "top",
        },
        tooltip: {
            crosshairs: true,
            split: false
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