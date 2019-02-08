<template>
    <b-modal v-model="modalShow"
             :title="title"
             v-b-modal.modalsm
             ref="modal"
             ok-title="Да"
             cancel-title="Нет"
             ok-variant="success"
             @hidden="onHidden"
             @ok="ok">
        {{text}}
    </b-modal>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean
            },
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
                modalShow: false,
            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            ok() {
                this.$emit("onOk");
            }
        },
        watch: {
            show(newVal) {
                this.modalShow = newVal;
            }
        }
    };
</script>