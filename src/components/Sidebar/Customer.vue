<template>
    <div @click="viewUserObject" class="left-side-bar-customer">
        <div class="customer-name">
            {{customerName}}
            <span class="customer-arrow">
                <font-awesome-icon icon="arrow-right" />
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["customer"],
        data() {
            return {};
        },
        computed: {
            customerName: function () {
                return `${this.customer.name_first} ${this.customer.name_last}`;
            }
        },
        methods: {
            viewUserObject: function () {
                return this.$router.push("/test");
            }
        }
    };
</script>

<style scoped>
    .customer-name {
        color: #fff;
    }

    .customer-arrow {
        font-size: 12px;
        float: right;
        margin-right: 20px;
    }

    .left-side-bar-customer {
        padding: 30px 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    }

    .left-side-bar-customer:hover {
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
    }
</style>