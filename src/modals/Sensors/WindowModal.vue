<template>
    <b-modal :visible="true"
             title="Данные о состоянии форточки"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ref="modal"
             @hidden="onHidden">
        <date-picker @after-change="afterDateChange" :date="date" :disabledDatepicker="disabledDatepicker"/>
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else>
            <b-alert v-if="!loading && !this.data.length" variant="danger" show class="no-data-alert">Нету данных за эту
                дату
            </b-alert>
            <window-chart v-else :chartData="chartData"/>
        </div>
    </b-modal>
</template>

<script>
    import WindowChart from "@/components/Customer/Charts/WindowChart";
    import DatePicker from "@/components/Customer/Charts/DatePicker";
    import {ENDPOINTS} from "@/api";
    import _ from "lodash";

    export default {
        props: {
            sensorId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                date: this.$moment().format("DD.MM.YYYY"),
                labels: [],
                data: [],
                loading: false,
                disabledDatepicker: true,
            };
        },
        mounted() {
            this.loading = true;
            this.fetch().then(() => this.loading = false);
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            modalHeight() {
                let canvasElement = document.getElementsByTagName("canvas")[0];
                if (canvasElement) {
                    canvasElement.style.height = "600px";
                }
            },
            fetch() {
                if (!this.date.length) {
                    return false;
                }
                this.disabledDatepicker = true;
                return this.$http.get(ENDPOINTS.SENSORS + "/" + this.sensorId, {params: {date: this.date}})
                    .then(resp => {
                        this.data = resp.data.map(dataItem => {
                            return dataItem === 0 ? -1 : dataItem;
                        });
                        this.labels = resp.labels;
                        this.disabledDatepicker = false;
                    });
            },
            afterDateChange(payload) {
                this.date = payload;
                this.fetch();
            }
        },
        computed: {
            chartData() {
                return {
                    labels: this.labels,
                    datasets: [
                        {
                            label: "Состояние форточки",
                            backgroundColor: "#d4821c",
                            data: this.data
                        }
                    ],
                };
            }
        },
        components: {
            WindowChart,
            DatePicker
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        font-size: 72px;
    }

    .no-data-alert {
        margin-top: 20px;
    }

    .change-date {
        text-align: left;
        margin: 0 0 15px 20px;

        .loader {
            font-size: 24px;
            margin: 5px 0 0 5px;
            width: 24px !important;
        }

        * {
            display: inline-block;
        }
    }

    .arrow-btn {
        padding: 0.28rem 0.75rem;
        margin: 0 5px;
        background-color: $primary-color-5;
    }
</style>