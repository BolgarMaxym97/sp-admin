<template>
    <div class="left-side-bar h-auto">
        <font-awesome-icon v-if="!customers.length" icon="spinner" class="loader" />
        <customer
                v-for="(customer, index) in customers"
                :key="index"
                :customer="customer"/>
    </div>
</template>

<script>
    import Customer from "@/components/Sidebar/Customer";
    import {ENDPOINTS} from "@/api";

    export default {
        data() {
            return {
                customers: []
            };
        },
        mounted() {
            this.$http.get(ENDPOINTS.CUSTOMERS)
                .then(customers => {
                    this.customers = customers;
                    this.$store.dispatch("customers", this.customers);
                });
        },
        components: {
            Customer,
        },
    };
</script>