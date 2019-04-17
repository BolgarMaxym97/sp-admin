<template>
    <b-modal :visible="true"
             title="Редактирование пользователя"
             size="lg"
             ref="modal"
             ok-title="Сохранить"
             cancel-title="Закрыть"
             ok-variant="success"
             :ok-disabled="loading"
             @ok="editCustomer"
             @hidden="onHidden">
        <user-form @change="changeUserData" :userData="userData" :loading="loading"></user-form>
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
            editCustomer(ev) {
                ev.preventDefault();
                this.loading = true;
                this.$http.put(ENDPOINTS.USER + "/" + this.userData.id, {
                    name_first: this.userData.name_first,
                    name_last: this.userData.name_last,
                    address: this.userData.address,
                    email: this.userData.email,
                    phone: this.userData.phone,
                    password: this.userData.password,
                    password_confirmation: this.userData.password_confirmation,
                }).then((resp) => {
                    this.loading = false;
                    this.$store.dispatch("customersAfterEdit", resp.user);
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