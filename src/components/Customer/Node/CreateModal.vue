<template>
    <b-modal v-model="show"
             title="Создание нового объекта"
             v-b-modal.modalmd
             ok-only
             ok-title="Сохранить"
             ok-variant="success"
             @hidden="onHidden"
             @ok="1+1">
    </b-modal>
</template>

<script>
    export default {
        props: {
            modalCreateShow: {
                type: Boolean
            }
        },
        data() {
            return {
                show: this.modalCreateShow
            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            }
        },
        watch: {
            modalCreateShow: function (newVal) {
                this.show = newVal;
            }
        }
    };
</script>

<style scoped>

</style>