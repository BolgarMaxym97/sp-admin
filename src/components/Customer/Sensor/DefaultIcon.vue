<template>
    <div v-if="!existingTypes.includes(icon.sensor_type)"
         class="sensor-placeholder"
         :style="iconStyle"
         v-b-tooltip.hover :title="`Добавить '${icon.type_name}'`">
        <font-awesome-icon
                icon="plus"
                class="sensor-placeholder__icon"/>
    </div>
</template>

<script>
    export default {
        props: {
            icon: {
                type: Object,
                required: true
            },
            existingTypes: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                iconStyle: {
                    top: this.icon.position_top,
                    left: this.icon.position_left
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
        border: 2px solid $topbar-bg-color;
        position: absolute;
        opacity: 0.8;
        .sensor-placeholder__icon {
            margin: 6px;
            color: $topbar-bg-color;
        }

        &:hover {
            background-color: $topbar-bg-color;

            .sensor-placeholder__icon {
                color: $primary-app-bg-color;
            }
        }

    }
</style>
