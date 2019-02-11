<template>
    <b-modal :visible="true"
             title="Данные о температуре"
             size="xl"
             cancel-only
             ref="modal"
             cancel-title="Закрыть"
             @hidden="onHidden">
        Данные о температуре {{sensorId}}
    </b-modal>
</template>

<script>
    export default {
        props: {
            sensorId: {
                type: Number,
                required: true
            }
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
        },
    };
</script>

<style scoped>

</style>