<script>
    import {Line, mixins} from "vue-chartjs";
    import config from "@/config";

    export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: ["chartData"],
        mounted() {
            const options = Object.assign(config.defaultOptionsForChartModal, {
                //new options here
            });

            this.renderChart(this.chartData, options);
        }
    };
</script>