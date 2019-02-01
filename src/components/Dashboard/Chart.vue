<script>
    import {Line} from "vue-chartjs";
    // eslint-disable-next-line
    import chartjsPluginAnnotation from "chartjs-plugin-annotation";

    export default {
        extends: Line,
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
                labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Окстябрь", "Ноябрь", "Декабрь"],
                datasets: [
                    {
                        label: "Клиенты",
                        borderColor: "#d4821c",
                        pointBackgroundColor: "#9a5b1c",
                        backgroundColor: "#d4821c",
                        fill: false,
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    },
                    {
                        label: "Обьекты",
                        borderColor: "#301846",
                        pointBackgroundColor: "#1e102c",
                        backgroundColor: "#301846",
                        fill: false,
                        data: [10, 30, 12, 31, 11, 70, 32, 30, 10, 24, 22, 21]
                    }
                ],
            }, options);
        }
    };
</script>