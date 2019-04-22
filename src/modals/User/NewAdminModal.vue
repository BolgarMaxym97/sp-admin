<template>
    <b-modal :visible="true"
             title="Создание нового администратора"
             size="lg"
             ref="modal"
             ok-title="Сохранить"
             cancel-title="Закрыть"
             ok-variant="success"
             :ok-disabled="loading"
             @ok="createAdmin"
             @hidden="onHidden">
        <user-form @change="changeUserData" :userData="userData" :loading="loading"></user-form>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
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
                    is_customer: 0,
                },

            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            createAdmin(ev) {
                ev.preventDefault();
                this.loading = true;
                this.$http.post(ENDPOINTS.REGISTER, this.userData).then(resp => {
                    this.loading = false;
                    this.$refs.modal.hide();
                    this.$emit("admin-added", resp.user);
                });
            },
            changeUserData(ev) {
                this.userData[ev.name] = ev.value;
            }
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