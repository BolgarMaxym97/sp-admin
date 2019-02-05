<template>
    <b-col xl="4" lg="6">
        <b-card class="text-center mt-3"
                :img-src="img"
                img-alt="Объект"
                img-top>
            <p class="card-text">
                {{node.object_name}}
            </p>
            <div class="sensor-placeholder">
                <font-awesome-icon icon="plus" class="sensor-placeholder__icon"/>
            </div>
            <div class="sensor-placeholder">
                <font-awesome-icon icon="plus" class="sensor-placeholder__icon"/>
            </div>
        </b-card>
    </b-col>
</template>

<script>
    import img from "@/assets/images/greenhouse.png";

    export default {
        props: ["node"],
        data() {
            return {
                publicPath: process.env.BASE_URL,
                img: img
            };
        },
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
