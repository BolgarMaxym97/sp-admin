<template>
    <b-row>
        <b-col cols="12">
            <p class="h4 text-left">Настройки датчиков этого объекта:
                <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
            </p>
            <table class="table table-striped" v-if="sensors.length">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Минимальное допустимое значение</th>
                    <th scope="col">Максимальное допустимое значение</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <settings-row :key="sensor.id" v-for="sensor in sensors" :sensor="sensor"/>
                </tbody>
            </table>
            <b-alert v-if="!sensors.length && !loading" show variant="danger">Сначала добавьте датчики</b-alert>
        </b-col>
    </b-row>
</template>

<script>
    import {ENDPOINTS} from "../../../../api";
    import SettingsRow from "./SettingsRow";

    export default {
        props: {
            nodeId: {
                type: Number,
                required: true
            }
        },
        mounted() {
            this.loading = true;
            this.$http.get(ENDPOINTS.SENSORS, {params: {node_id: this.nodeId}})
                .then(sensors => this.sensors = sensors)
                .then(() => this.loading = false);
        },
        data() {
            return {
                sensors: [],
                loading: false,
            };
        },
        components: {
            SettingsRow
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        font-size: 24px;
        width: 24px !important;
        display: inline-block;
        margin-top: 0;
    }
</style>