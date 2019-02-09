<template>
    <div class="">
        <div v-if="!existingTypes.includes(icon.sensor_type)"
             class="sensor-placeholder"
             @click="confirmShow = true"
             :style="iconStyle"
             v-b-tooltip.hover :title="`Добавить '${icon.type_name}'`">
            <font-awesome-icon
                    icon="plus"
                    class="sensor-placeholder__icon"/>
        </div>
        <confirm-modal @hidden="confirmShow = false" @onOk="createSensor"
                       :text="`Вы уверены что хотите добавить датчик <b>'${icon.type_name}'</b>?`" :show="confirmShow"/>
    </div>
</template>

<script>
    import ConfirmModal from "@/modals/ConfirmModal";
    import {ENDPOINTS} from "../../../api";
    import _ from "lodash";

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
            nodeId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                iconStyle: {
                    top: this.icon.position_top,
                    left: this.icon.position_left
                },
                confirmShow: false
            };
        },
        computed: {
            customerId() {
                return +this.$route.params.id;
            }
        },
        methods: {
            createSensor(ev) {
                ev.preventDefault();
                this.$http.post(ENDPOINTS.SENSORS, {
                    user_id: this.customerId,
                    type: this.icon.sensor_type,
                    node_id: this.nodeId
                }).then(resp => {
                    if (_.size(resp)) {
                        this.confirmShow = false;
                        this.$emit("after-creation", resp);
                    }
                });
            }
        },
        components: {
            ConfirmModal
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
