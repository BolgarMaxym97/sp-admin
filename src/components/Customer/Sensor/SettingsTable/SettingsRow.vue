<template>
    <tr>
        <th scope="row">{{sensor.id}}</th>
        <td>{{sensor.type_name}}</td>
        <td>
            <b-form-input v-model="minNormalValue"
                          type="text"
                          size="sm"
                          placeholder="Минимальное нормальное значение"></b-form-input>
        </td>
        <td>
            <b-form-input v-model="maxNormalValue"
                          type="text"
                          size="sm"
                          placeholder="Максимальное нормальное значение"></b-form-input>
        </td>
        <td>
            <b-button :disabled="loading" variant="success" size="sm" @click="saveSensorSettings">
                <font-awesome-icon icon="save"/>
                {{loading ? 'Сохранение...' : 'Сохранить'}}
            </b-button>
        </td>
    </tr>

</template>

<script>
    import _ from "lodash";
    import {ENDPOINTS} from "@/api";

    export default {
        props: {
            sensor: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                maxNormalValue: _.get(this.sensor, "settings.max_normal_value", ""),
                minNormalValue: _.get(this.sensor, "settings.min_normal_value", ""),
                loading: false
            };
        },
        methods: {
            saveSensorSettings() {
                this.loading = true;
                this.$http.post(ENDPOINTS.SENSOR_SETTINGS, {
                    sensor_id: this.sensor.id,
                    max_normal_value: this.maxNormalValue,
                    min_normal_value: this.minNormalValue,
                }).then(resp => {
                    this.loading = false;
                    if (resp.success) {
                        return this.$toastr("success", "Данные успешно обновлены", "");
                    } else {
                        return this.$toastr("error", "Данные заполнены неверно", "Ошибка");
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>