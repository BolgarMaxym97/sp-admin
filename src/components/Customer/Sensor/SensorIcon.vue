<template>
    <div>
        <div class="sensor-placeholder"
             :style="iconStyle"
             @click="modalSensorShow = true"
             v-b-tooltip.hover :title="`${sensor.type_name} ${lastData}`">
            <font-awesome-icon
                    :icon="sensor.sensor_type.sensor_icon.icon"
                    class="sensor-placeholder__icon"/>
        </div>
        <component v-if="modalSensorShow" @hidden="modalSensorShow = false" :is="component" :sensor-id="sensor.id"/>
    </div>
</template>

<script>
    import CONSTANTS from "@/constants";
    import _ from "lodash";

    export default {
        props: {
            sensor: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                iconStyle: {
                    top: this.sensor.sensor_type.sensor_icon.position_top,
                    left: this.sensor.sensor_type.sensor_icon.position_left
                },
                componentByType: {
                    [CONSTANTS.SENSOR_TYPE_TEMPERATURE]: () => import("@/modals/Sensors/TemperatureModal"),
                    [CONSTANTS.SENSOR_TYPE_HUMIDITY]: () => import("@/modals/Sensors/HumidityModal"),
                    [CONSTANTS.SENSOR_TYPE_WINDOW_1]: () => import("@/modals/Sensors/WindowModal"),
                    [CONSTANTS.SENSOR_TYPE_WINDOW_2]: () => import("@/modals/Sensors/WindowModal")
                },
                modalSensorShow: false,
            };
        },
        computed: {
            component() {
                return this.componentByType[this.sensor.type];
            },
            lastData() {
                if (!_.size(this.sensor.last_data)) {
                    return "";
                }
                let data = this.sensor.last_data.data;
                if (+this.sensor.type === CONSTANTS.SENSOR_TYPE_WINDOW_1 || +this.sensor.tyoe === CONSTANTS.SENSOR_TYPE_WINDOW_2) {
                    data = (+this.sensor.last_data.data === 0 ? "Форточка открыта" : "Форточка закрыта");
                }
                return ` - ${data} ${this.sensor.sensor_type.dimension || ""}`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/colors";

    .sensor-placeholder {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border: 2px solid $primary-color-6;
        position: absolute;

        .sensor-placeholder__icon {
            margin: 6px;
            color: $primary-color-6;
        }

        &:hover {
            background-color: $primary-color-6;

            .sensor-placeholder__icon {
                color: $primary-app-bg-color;
            }
        }

    }
</style>
