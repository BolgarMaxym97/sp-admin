<template>
    <router-link :to="{ name: 'customer_page', params: {id: customer.id } }">
        <div class="left-side-bar-customer">
            <div class="customer-name">
                <font-awesome-icon icon="user" class="mr-2"/>
                {{customerName}}
                <span class="customer-arrow">
                <font-awesome-icon icon="arrow-right"/>
            </span>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            customer: {
                type: Object,
                required: true
            }
        },
        data() {
            return {};
        },
        computed: {
            customerName: function () {
                return `${this.customer.name_first} ${this.customer.name_last}`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    $hover-bg-color: rgba(255, 255, 255, 0.1);

    .customer-name {
        color: #fff;
        font-size: 13px;
    }

    .customer-arrow {
        font-size: 12px;
        float: right;
        margin-right: 20px;
    }

    .left-side-bar-customer {
        padding: 30px 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);

        &:hover {
            background-color: $hover-bg-color;
            cursor: pointer;
        }
    }

    .router-link-exact-active {
        .left-side-bar-customer {
            background-color: $hover-bg-color;
        }
    }
</style>