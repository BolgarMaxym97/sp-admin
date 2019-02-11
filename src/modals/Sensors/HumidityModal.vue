<template>
    <b-modal :visible="true"
             title="Данные о влажности"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ref="modal"
             @hidden="onHidden">
        Данные о влажности {{sensorId}}
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