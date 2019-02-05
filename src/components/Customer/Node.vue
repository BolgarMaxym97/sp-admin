<template>
    <b-col xl="4" lg="6">
        <b-card class="text-center mt-3"
                :img-src="img"
                img-alt="Объект"
                img-top>
            <p class="card-text">
                {{node.object_name}}
            </p>
            <sensor-icon v-for="(icon, index) in icons"
            :key="index"
            :icon="icon"/>
        </b-card>
    </b-col>
</template>

<script>
    import img from "@/assets/images/greenhouse.png";
    import SensorIcon from "@/components/Customer/SensorIcon";

    export default {
        props: ["node", "icons"],
        data() {
            return {
                publicPath: process.env.BASE_URL,
                img: img
            };
        },
        components: {
            SensorIcon
        }
    };
</script>

<style lang="scss" scoped>
    .sensor-placeholder {
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        position: absolute;
        .sensor-placeholder__icon {
            margin: 6px;
        }
    }
</style>
