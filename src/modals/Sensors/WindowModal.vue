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
            <b-alert v-if="!loading && !windowData.length" variant="danger" show class="no-data-alert">Нету данных за
                эту дату
            </b-alert>
        </div>
        <table class="table" v-if="!loading && windowData.length">
            <thead>
            <tr>
                <th>Время</th>
                <th>Состояние форточки</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="Object.keys(state)[0]" v-for="(state, index) in windowData"
                :class="checkTrClassName(Object.values(state)[0])">
                <td>
                    {{`${buildWindowDateTimeString(Object.keys(state)[0])}`}}
                    <font-awesome-icon title="Текущее" icon="star" v-if="+index === windowData.length - 1"/>
                </td>
                <td>{{`${buildWindowStateString(Object.values(state)[0])}`}}</td>
            </tr>
            </tbody>
        </table>
    </b-modal>
</template>

<script>
    import DatePicker from "@/components/Customer/Charts/DatePicker";
    import {ENDPOINTS} from "@/api";

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
                loading: false,
                disabledDatepicker: true,
                windowData: []
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
                let data = [];
                return this.$http.get(ENDPOINTS.SENSORS + "/" + this.sensorId, {params: {date: this.date}})
                    .then(resp => {
                        resp.data.forEach((item) => {
                            if (!Object.keys(data).length) {
                                data.push({[item[0]]: item[1]});
                            } else {
                                if (data[data.length - 1] && Object.values(data[data.length - 1])[0] !== item[1]) {
                                    data.push({[item[0]]: item[1]});
                                }
                            }
                        });
                        this.windowData = data;
                        this.disabledDatepicker = false;
                    });
            },
            afterDateChange(payload) {
                this.date = payload;
                this.fetch();
            },
            buildWindowStateString(state) {
                return +state === 0 ? "Форточка открыта" : "Форточка закрыта";
            },
            buildWindowDateTimeString(timestamp) {
                return this.$moment.unix(+timestamp / 1000).format("DD MMMM, dddd - HH:mm");
            },
            checkTrClassName(state) {
                return +state === 0 ? "table-danger" : "table-success";
            }
        },
        components: {
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