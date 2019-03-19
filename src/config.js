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
    }
};