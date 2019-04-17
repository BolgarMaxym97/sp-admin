<template>
    <b-modal :visible="true"
             title="Редактирование пользователя"
             size="lg"
             ref="modal"
             ok-title="Сохранить"
             cancel-title="Закрыть"
             ok-variant="success"
             :ok-disabled="loading"
             @ok="createCustomer"
             @hidden="onHidden">
        <user-form :userData="userData" :loading="loading"></user-form>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import {mapGetters} from "vuex";
    import Form from "@/components/Customer/Form";

    export default {
        props: {
            userData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                loading: false,
            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            createCustomer(ev) {
                ev.preventDefault();
                this.loading = true;
                this.$http.post(ENDPOINTS.REGISTER, this.userData).then(resp => {
                    this.loading = false;
                    this.customers.push(resp.user);
                    this.$store.dispatch("customers", this.customers);
                    this.$refs.modal.hide();
                });
            }
        },
        computed: {
            ...mapGetters([
                "customers",
            ])
        },
        components: {
            UserForm: Form
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 90px;
    }

</style>