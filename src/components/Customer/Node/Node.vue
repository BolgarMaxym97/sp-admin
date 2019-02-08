<template>
    <b-col xl="4" lg="4" md="6" class="node-col">
        <b-card class="text-center mt-3 node-card"
                :img-src="img"
                img-alt="Объект"
                img-top>
            <p class="card-text">
                {{node.object_name}}
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
        components: {
            DefaultIcon,
            SensorIcon
        }
    };
</script>

<style lang="scss" scoped>
    .node-card {
        min-height: 100%;
    }
</style>
