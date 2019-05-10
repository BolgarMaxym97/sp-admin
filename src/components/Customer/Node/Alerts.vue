<template>
    <span class="node-card__alarms">
                    <b-badge variant="danger"
                             class="node-card__alarms-item"
                             :key="alert"
                             v-for="alert in alerts">
                        {{alert}}
                    </b-badge>
                </span>
</template>

<script>
    export default {
        props: {
            alerts: {
                type: Array,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .node-card__alarms {
        display: block;
        position: absolute;
        bottom: 135px;

        .node-card__alarms-item {
            margin: 2px;
        }
    }
</style>