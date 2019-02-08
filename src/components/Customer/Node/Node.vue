<template>
    <b-col xl="4" lg="4" md="6" class="node-col">
        <b-card class="text-center mt-3 node-card"
                :img-src="img"
                img-alt="Объект"
                img-top>
            <b-badge variant="primary" class="node-card__badge">{{node.type_name}}</b-badge>
            <b-button size="sm"
                      variant="danger"
                      class="node-card__delete"
                      v-b-tooltip.hover title="Удалить объект"
                      @click="removeNode">
                <font-awesome-icon icon="trash"/>
            </b-button>
            <p class="card-text">
                <!--TODO: alarms need to be finished-->
                <span v-if="node.id % 2 === 0" class="node-card__alarms">
                    <b-badge variant="danger" class="node-card__alarms-item">Низкая температура</b-badge>
                    <b-badge variant="warning" class="node-card__alarms-item">Открыты форточки</b-badge>
                </span>
                <b>Название:</b> {{node.object_name}}
            </p>
            <sensor-icon v-for="(sensor) in node.sensors"
                         :key="sensor.id"
                         :sensor="sensor"/>

            <default-icon v-for="(icon) in icons"
                          :key="icon.id"
                          :icon="icon"
                          :existing-types="node.existing_types"/>
        </b-card>
    </b-col>
</template>

<script>
    import img from "../../../assets/images/greenhouse.png";
    import DefaultIcon from "../Sensor/DefaultIcon";
    import SensorIcon from "../Sensor/SensorIcon";
    import {ENDPOINTS} from "@/api";

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
                img: img
            };
        },
        methods: {
            removeNode() {
                this.$http.delete(ENDPOINTS.NODES + "/" + this.node.id)
                    .then(resp => {
                        if (resp.success) {
                            this.$emit("on-delete", this.node.id);
                            this.$toastr("success", "Объект успешно удален", "Успешно удалено");
                        }
                    });
            }
        },
        components: {
            DefaultIcon,
            SensorIcon
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
    }
</style>
