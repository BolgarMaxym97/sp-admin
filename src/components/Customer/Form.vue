<template>
    <b-row>
        <b-col xl="6" lg="6" md="6">
            <b-form-group v-for="input in inputsFirstPart" :key="input.name"
                          :label="input.label"
                          :label-for="input.name"
                          class="text-left"
                          :description="`${input.label} нового пользователя`">
                <b-form-input
                        :id="input.name"
                        :type="input.type"
                        :class="`${input.name}-input`"
                        :value="userData[input.name]"
                        required
                        :disabled="loading"
                        :placeholder="`${input.label} пользователя`">
                </b-form-input>
            </b-form-group>
        </b-col>
        <b-col xl="6" lg="6" md="6">
            <b-form-group v-for="input in inputsSecondPart" :key="input.name"
                          :label="input.label"
                          :label-for="input.name"
                          class="text-left"
                          :description="`${input.label} нового пользователя`">
                <b-form-input
                        :id="input.name"
                        :type="input.type"
                        :class="`${input.name}-input`"
                        :value="userData[input.name]"
                        required
                        :disabled="loading"
                        :placeholder="`${input.label} пользователя`">
                </b-form-input>
            </b-form-group>
        </b-col>
    </b-row>
</template>

<script>

    export default {
        props: {
            userData: {
                type: Object,
                required: true
            },
            loading: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                inputsFirstPart: [
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
                ],
                inputsSecondPart: [
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
        }
    };
</script>

<style lang="scss" scoped>
</style>