<template>
    <b-modal :visible="true"
             title="Данные о закрытии/октрытии форточки"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ref="modal"
             @hidden="onHidden">
        Данные о закрытии/октрытии форточки {{sensorId}}
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