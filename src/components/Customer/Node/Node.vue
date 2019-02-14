<template>
    <b-col xl="4" lg="4" md="6" class="node-col">
        <b-card class="text-center mt-3 node-card"
                :img-src="img"
                img-alt="Объект"
                img-top>
            <b-badge variant="primary" class="node-card__badge">{{nodeState.type_name}}</b-badge>
            <b-button size="sm"
                      variant="danger"
                      class="node-card__delete"
                      v-b-tooltip.hover title="Удалить объект"
                      @click="confirmShow = true">
                <font-awesome-icon icon="trash"/>
            </b-button>
            <confirm-modal @hidden="confirmShow = false" @onOk="removeNode"
                           :text="`Вы уверены что хотите удалить объект?`" v-if="confirmShow"/>
            <p class="card-text">
                <alarms :node="nodeState"/>
                <b>{{nodeState.object_name}}</b>
                <b-row class="node-card__btns">
                    <b-col cols="3">
                        <b-button variant="primary" v-b-tooltip.hover title="Настройки" @click="settingsModal = true">
                            <font-awesome-icon icon="sliders-h"/>
                        </b-button>
                        <node-settings-modal v-if="settingsModal"
                                             :node="nodeState"
                                             @hidden="settingsModal = false"
                                             @after-update="afterUpdate"/>
                    </b-col>
                    <b-col cols="3">
                        <b-button variant="warning" v-b-tooltip.hover title="Статистика">
                            <font-awesome-icon icon="chart-bar"/>
                        </b-button>
                    </b-col>
                    <b-col cols="3">
                        <b-button variant="success" v-b-tooltip.hover title="Последние данные">
                            <font-awesome-icon icon="table"/>
                        </b-button>
                    </b-col>
                    <b-col cols="3">
                        <b-button variant="danger" v-b-tooltip.hover title="Исходный код">
                            <font-awesome-icon icon="code"/>
                        </b-button>
                    </b-col>
                </b-row>
            </p>
            <sensor-icon v-for="(sensor) in nodeState.sensors"
                         :key="sensor.created_at"
                         :sensor="sensor"/>

            <default-icon v-for="(icon) in icons"
                          :key="icon.id"
                          :icon="icon"
                          :node-id="nodeState.id"
                          @after-creation="pushSensor"
                          :existing-types="nodeState.existing_types"/>
        </b-card>
    </b-col>
</template>

<script>
    import img from "@/assets/images/greenhouse.png";
    import DefaultIcon from "../Sensor/DefaultIcon";
    import SensorIcon from "../Sensor/SensorIcon";
    import {ENDPOINTS} from "@/api";
    import ConfirmModal from "@/modals/ConfirmModal";
    import NodeSettingsModal from "@/modals/Node/NodeSettingsModal";
    import Alarms from "./Alarms";

    export default {
        props: {
            node: {
                type: Object,
                required: true
            },
            icons: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                publicPath: process.env.BASE_URL,
                img: img,
                confirmShow: false,
                settingsModal: false,
                nodeState: this.node
            };
        },
        methods: {
            removeNode(ev) {
                ev.preventDefault();
                this.$http.delete(ENDPOINTS.NODES + "/" + this.nodeState.id)
                    .then(resp => {
                        if (resp.success) {
                            this.confirmShow = false;
                            this.$emit("on-delete", this.nodeState.id);
                            this.$toastr("success", "Объект успешно удален", "Успешно удалено");
                        }
                    });
            },
            pushSensor(e) {
                this.nodeState.sensors.push(e);
                this.nodeState.existing_types.push(+e.type);
            },
            afterUpdate(e) {
                this.nodeState = e;
            }
        },
        components: {
            DefaultIcon,
            SensorIcon,
            ConfirmModal,
            NodeSettingsModal,
            Alarms
        }
    };
</script>

<style lang="scss" scoped>
    .node-card {
        min-height: 100%;

        .node-card__badge {
            position: absolute;
            top: 3%;
            left: 3%;
        }

        .node-card__delete {
            position: absolute;
            top: 3%;
            right: 3%;
        }

        .card-text {
            padding-top: 0;
        }

        .node-card__alarms {
            display: block;

            .node-card__alarms-item {
                margin: 2px;
            }
        }

        .node-card__btns {
            margin-top: 10px;

            .btn {
                padding: 0.375rem 2rem;
            }
        }
    }
</style>
