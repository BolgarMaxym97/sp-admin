<template>
    <div class="sensor-placeholder"
         :style="iconStyle"
         v-b-tooltip.hover="true" :title="`${sensor.type_name}`">
        <font-awesome-icon
                :icon="sensor.sensor_type.sensor_icon.icon"
                class="sensor-placeholder__icon"/>
    </div>
</template>

<script>
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
                }
            };
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
