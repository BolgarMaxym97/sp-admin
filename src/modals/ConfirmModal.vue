<template>
    <b-modal :visible="true"
             :title="title"
             v-b-modal.modalsm
             ref="modal"
             ok-title="Да"
             cancel-title="Нет"
             ok-variant="success"
             @hidden="onHidden"
             @ok="ok">
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
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            ok(ev) {
                this.$emit("onOk", ev);
            }
        }
    };
</script>