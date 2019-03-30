<template>
    <b-modal :visible="true"
             title="Последние данные"
             size="md"
             ok-only
             ok-title="Закрыть"
             ok-variant="primary"
             :ok-disabled="loading"
             @hidden="onHidden">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else>
            <table class="table table-striped" v-if="lastData.length">
                <tbody>
                <tr :key="sensor.id" v-for="sensor in lastData">
                    <th scope="row">{{sensor.type_name}}</th>
                    <td>{{`${sensor.last_data.data || '---'} ${sensor.sensor_type.dimension || ''}`}}</td>
                    <td>{{sensor.last_data.created_at | moment("DD MMMM, dddd - HH:mm")}}</td>
                </tr>
                </tbody>
            </table>
            <b-alert show variant="danger" v-if="!lastData.length">Последние данные недоступны</b-alert>
        </div>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import constants from "@/constants";

    export default {
        props: {
            node: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                loading: false,
                lastData: []
            };
        },
        mounted() {
            this.loading = true;
            this.$http.get(ENDPOINTS.LAST_DATA + "/" + this.node.id).then(resp => {
                this.loading = false;
                this.lastData = resp;
                this.lastData.map(sensor => {
                    if (!sensor.last_data) {
                        sensor.last_data = {data: null};
                    }
                    if (sensor.type === constants.SENSOR_TYPE_WINDOW_1 || sensor.type === constants.SENSOR_TYPE_WINDOW_2) {
                        sensor.last_data.data = +sensor.last_data.data === constants.WINDOW_IS_OPENED ? "Открыто" : "Закрыто";
                    }
                });
            });
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        margin-top: 0;
    }

</style>