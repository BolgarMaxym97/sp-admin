<template>
    <div class="left-side-bar h-auto">
        <div class="actions-for-customers">
            <b-form-input v-model="searchValue" type="text" placeholder="Поиск"
                          class="mt-2 search-input"></b-form-input>
            <div class="wrapper-under"></div>
        </div>
        <div class="customers-block">
            <font-awesome-icon v-if="!customers.length && !searchValue.length" icon="spinner" class="loader"/>
            <b-alert show variant="danger" class="mt-2" v-else-if="!customers.length && searchValue.length">Не найдено
            </b-alert>
            <customer
                    v-for="(customer, index) in customers"
                    :key="index"
                    :customer="customer"/>
        </div>
    </div>
</template>

<script>
    import Customer from "@/components/Sidebar/Customer";
    import {ENDPOINTS} from "@/api";

    export default {
        data() {
            return {
                customers: [],
                searchValue: ""
            };
        },
        mounted() {
            this.$http.get(ENDPOINTS.CUSTOMERS)
                .then(customers => {
                    this.customers = customers;
                    this.$store.dispatch("customers", customers);
                });
        },
        watch: {
            searchValue(newVal) {
                if (newVal.length > 2) {
                    return this.customers = this.stableCustomers.filter(customer => {
                        return customer.full_name.toLowerCase().match(this.searchValue.toLowerCase()) ||
                            customer.address.toLowerCase().match(this.searchValue.toLowerCase()) ||
                            customer.email.toLowerCase().match(this.searchValue.toLowerCase()) ||
                            customer.phone.toLowerCase().match(this.searchValue.toLowerCase());
                    });
                }
                return this.customers = this.stableCustomers;
            }
        },
        computed: {
            stableCustomers() {
                return this.$store.getters.customers;
            }
        },
        components: {
            Customer,
        },
    };
</script>

<style scoped lang="scss">
    .actions-for-customers {
        position: fixed;
        width: 250px;
        background-color: #272c33;

        .wrapper-under {
            background-color: #fff;
            opacity: 0.2;
            height: 10px;
            margin-top: 10px;
        }

        .search-input {
            width: 92%;
            margin-left: 4%;
            border-radius: 12px;
        }
    }

    .customers-block {
        padding-top: 80px;
    }
</style>