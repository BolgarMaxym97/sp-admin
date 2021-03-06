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
                <alerts :alerts="alerts"/>
                <b>{{nodeState.object_name}}</b>
                <b-row class="node-card__btns">
                    <b-col cols="3">
                        <b-button size="sm" variant="primary" v-b-tooltip.hover title="Настройки"
                                  @click="settingsModal = true">
                            <font-awesome-icon icon="sliders-h"/>
                        </b-button>
                        <node-settings-modal v-if="settingsModal"
                                             :node="nodeState"
                                             @hidden="settingsModal = false"
                                             @after-update="afterUpdate"/>
                    </b-col>
                    <b-col cols="3">
                        <b-button size="sm" variant="warning" v-b-tooltip.hover title="Статистика"
                                  @click="statisticModal = true">
                            <font-awesome-icon icon="chart-bar"/>
                        </b-button>
                        <statistic-modal v-if="statisticModal" @hidden="statisticModal = false" :node="nodeState"/>
                    </b-col>
                    <b-col cols="3">
                        <b-button size="sm" variant="success" v-b-tooltip.hover title="Последние данные"
                                  @click="lastDataModal = true">
                            <font-awesome-icon icon="table"/>
                        </b-button>
                        <last-data-modal v-if="lastDataModal" @hidden="lastDataModal = false" :node="nodeState"/>
                    </b-col>
                    <b-col cols="3">
                        <b-button size="sm" variant="danger" @click="generateFirmware" v-b-tooltip.hover
                                  title="Исходный код">
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
    import LastDataModal from "@/modals/Node/LastDataModal";
    import StatisticModal from "@/modals/Node/StatisticModal";
    import Alerts from "./Alerts";
    import {saveAs} from "file-saver";
    import _ from "lodash";

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
                lastDataModal: false,
                statisticModal: false,
                nodeState: this.node,
                alerts: []
            };
        },

        mounted() {
            this.nodeState.sensors.map(sensor => {
                if (_.size(sensor.alerts)) {
                    _.each(sensor.alerts, (alert, sensorType) => {
                        if (alert.isAlertMin) {
                            this.alerts.push(`Низкая ${sensorType.toLowerCase()}`);
                        }
                        if (alert.isAlertMax) {
                            this.alerts.push(`Высокая ${sensorType.toLowerCase()}`);
                        }
                    });
                }
            });
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
            },
            generateFirmware() {
                this.$http.get(ENDPOINTS.GENERATE_FIRMWARE + "/" + this.nodeState.id)
                    .then(resp => {
                        this.$toastr("success", "Загрузка начнется через несколько секунд", "");
                        for (const fileName of Object.keys(resp)) {
                            var blob = new Blob([resp[fileName]], {type: "text/plain;charset=utf-8"});
                            saveAs(blob, fileName);
                        }
                    });
            }
        },
        components: {
            DefaultIcon,
            SensorIcon,
            ConfirmModal,
            NodeSettingsModal,
            Alerts,
            LastDataModal,
            StatisticModal
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

        .node-card__alerts {
            display: block;

            .node-card__alerts-item {
                margin: 2px;
            }
        }

        .node-card__btns {
            margin-top: 10px;

            .btn {
                padding: 0.375rem 1rem;
            }
        }
    }
</style>
