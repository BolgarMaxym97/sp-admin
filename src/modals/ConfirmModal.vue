<template>
    <b-modal :visible="true"
             :title="title"
             v-b-modal.modalsm
             ref="modal"
             ok-title="Да"
             cancel-title="Нет"
             ok-variant="success"
             :cancel-disabled="loading"
             :ok-disabled="loading"
             @hidden="onHidden"
             @ok="ok">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <span v-html="text"></span>
    </b-modal>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: "Вы уверены?"
            },
            text: {
                type: String,
                default: "Вы уверены что хотите сделать это?"
            }
        },
        data() {
            return {
                loading: false
            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            ok(ev) {
                this.loading = true;
                this.$emit("onOk", ev);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 64px;
    }
</style>