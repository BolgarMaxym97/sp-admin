<template>
    <!--TODO: alarms need to be finished-->
    <span v-if="node.id % 2 === 0" class="node-card__alarms">
                    <b-badge variant="danger" class="node-card__alarms-item">Низкая температура</b-badge>
                    <b-badge variant="warning" class="node-card__alarms-item">Открыты форточки</b-badge>
                </span>
</template>

<script>
    export default {
        props: {
            node: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .node-card__alarms {
        display: block;

        .node-card__alarms-item {
            margin: 2px;
        }
    }
</style>