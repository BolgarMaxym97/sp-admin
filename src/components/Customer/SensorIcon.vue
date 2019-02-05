<template>
    <div class="sensor-placeholder" :style="{top: icon.position_top, left: icon.position_left}">
        <font-awesome-icon icon="plus" class="sensor-placeholder__icon"/>
    </div>
</template>

<script>
    export default {
        props: ["icon", "existing-types"],
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
