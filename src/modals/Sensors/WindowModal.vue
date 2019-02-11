<template>
    <b-modal v-model="show"
             title="Данные о закрытии/октрытии форточки"
             v-b-modal.modalxl
             cancel-only
             ref="modal"
             cancel-title="Закрыть"
             @hidden="onHidden">
        Данные  о закрытии/октрытии форточки {{sensorId}}
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