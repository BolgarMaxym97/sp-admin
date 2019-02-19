<template>
    <b-card v-if="customer" :title="customer.full_name">
        <b-row>
            <b-col cols="4">
                <b-row :key="customer.id" v-for="customer in customerDataLeft">
                    <b-col cols="6">{{customer.label}}</b-col>
                    <b-col cols="6">{{customer.value || '---'}}</b-col>
                </b-row>
            </b-col>
            <b-col cols="4">
                <b-row :key="customer.id" v-for="customer in customerDataRight">
                    <b-col cols="6">{{customer.label}}</b-col>
                    <b-col cols="6">{{customer.value || '---'}}</b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters([
                "customers"
            ]),
            customerId() {
                return +this.$route.params.id;
            },
            customer() {
                return this.customers.find(customer => +customer.id === this.customerId);
            },
            customerDataLeft() {
                return [
                    {label: "ID", value: this.customer.id},
                    {label: "Имя", value: this.customer.name_first},
                    {label: "Фамилия", value: this.customer.name_last},
                    {label: "Email", value: this.customer.email},
                ];
            },
            customerDataRight() {
                return [
                    {label: "Телефон", value: this.customer.phone},
                    {label: "Адрес", value: this.customer.address},
                    {label: "Последний вход", value: this.customer.last_visit_time},
                    {label: "Активный", value: this.customer.is_active ? "Да" : "Нет"},
                ];
            }
        },
    };
</script>

<style scoped>

</style>