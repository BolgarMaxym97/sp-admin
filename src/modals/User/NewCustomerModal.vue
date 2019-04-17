<template>
    <b-modal :visible="true"
             title="Создание нового пользователя"
             size="lg"
             ref="modal"
             ok-title="Сохранить"
             cancel-title="Закрыть"
             ok-variant="success"
             :ok-disabled="loading"
             @ok="createCustomer"
             @hidden="onHidden">
        <user-form @change="changeUserData" :userData="userData" :loading="loading"></user-form>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import {mapGetters} from "vuex";
    import Form from "@/components/Customer/Form";

    export default {
        props: {},
        data() {
            return {
                loading: false,
                userData: {
                    email: null,
                    password: null,
                    password_confirmation: null,
                    name_first: null,
                    name_last: null,
                    phone: null,
                    address: null,
                    is_customer: 1,
                },

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
            },
            changeUserData(ev) {
                this.userData[ev.name] = ev.value;
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