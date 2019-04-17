<template>
    <b-card v-if="customer" :title="customerName">
        <font-awesome-icon
                icon="edit"
                @click="editCustomer = true"
                class="customer-edit-btn"/>
        <edit-customer-modal v-if="editCustomer" :userData="customer" @hidden="editCustomer = false"/>
        <b-row class="ml-2">
            <b-col xl="4" lg="4" md="6" sm="6">
                <b-row :key="customer.id" v-for="customer in customerDataLeft">
                    {{customer.label}}: <b class="ml-2">{{customer.value || "---"}}</b>
                </b-row>
            </b-col>
            <b-col xl="4" lg="4" md="6" sm="6">
                <b-row :key="customer.id" v-for="customer in customerDataRight">
                    {{customer.label}}: <b class="ml-2">{{customer.value || "---"}}</b>
                </b-row>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    import {mapGetters} from "vuex";
    import EditCustomerModal from "@/modals/User/EditCustomerModal";

    export default {
        data() {
            return {
                editCustomer: false
            };
        },
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
            customerName() {
                return `${this.customer.name_first} ${this.customer.name_last}`;
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
        components: {
            EditCustomerModal
        }
    };
</script>

<style lang="scss" scoped>
    .customer-edit-btn {
        float: right;
        position: relative;
        top: -40px;
        cursor: pointer;
    }
</style>