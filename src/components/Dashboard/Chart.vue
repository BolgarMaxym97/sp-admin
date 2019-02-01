<script>
    import {Line} from "vue-chartjs";
    // eslint-disable-next-line
    import chartjsPluginAnnotation from "chartjs-plugin-annotation";

    export default {
        extends: Line,
        props: ["customersCountChart", "nodesCountChart"],
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

            this.renderChart({
                labels: [this.customersCountChart.customersLabelsByDates, this.nodesCountChart.nodesLabelsByDates],
                datasets: [
                    {
                        label: "Клиенты",
                        borderColor: "#d4821c",
                        pointBackgroundColor: "#9a5b1c",
                        backgroundColor: "#d4821c",
                        fill: false,
                        data: this.customersCountChart.customersDataByDates
                    },
                    {
                        label: "Обьекты",
                        borderColor: "#301846",
                        pointBackgroundColor: "#1e102c",
                        backgroundColor: "#301846",
                        fill: false,
                        data: this.nodesCountChart.nodesDataByDates
                    }
                ],
            }, options);
        }
    };
</script>