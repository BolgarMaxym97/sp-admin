<template>
    <b-modal :visible="true"
             title="Создание нового пользователя"
             size="md"
             ref="modal"
             ok-title="Сохранить"
             cancel-title="Закрыть"
             ok-variant="success"
             :ok-disabled="loading"
             @ok="createCustomer"
             @hidden="onHidden">
        <b-form-group v-for="input in inputs" :key="input.name"
                      :label="input.label"
                      :label-for="input.name"
                      class="text-left"
                      :description="`${input.label} нового пользователя`">
            <b-form-input
                    :id="input.name"
                    :type="input.type"
                    v-model="userData[input.name]"
                    :class="`${input.name}-input`"
                    required
                    :disabled="loading"
                    :placeholder="`${input.label} пользователя`">
            </b-form-input>
        </b-form-group>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import {mapGetters} from "vuex";

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
                inputs: [
                    {
                        name: "name_first",
                        label: "Имя",
                        type: "text"
                    },
                    {
                        name: "name_last",
                        label: "Фамилия",
                        type: "text"
                    },
                    {
                        name: "email",
                        label: "Email",
                        type: "email"
                    },
                    {
                        name: "phone",
                        label: "Телефон",
                        type: "text"
                    },
                    {
                        name: "address",
                        label: "Адрес",
                        type: "text"
                    },
                    {
                        name: "password",
                        label: "Пароль",
                        type: "password"
                    },
                    {
                        name: "password_confirmation",
                        label: "Подтверждение пароля",
                        type: "password"
                    }
                ]

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