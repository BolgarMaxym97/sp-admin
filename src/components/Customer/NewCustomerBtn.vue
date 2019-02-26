<template>
    <div class="new-customer" v-b-tooltip.hover title="Добавить нового пользователя" @click="newCustomerModal = true">
        <font-awesome-icon icon="plus" class="new-customer__icon"/>
        <new-customer-modal v-if="newCustomerModal" @hidden="newCustomerModal = false"/>
    </div>
</template>

<script>
    import NewCustomerModal from "@/modals/User/NewCustomerModal";

    export default {
        data() {
            return {
                newCustomerModal: false
            };
        },
        components: {
            NewCustomerModal
        }
    };
</script>

<style scoped lang="scss">
    $hover-bg-color: rgba(255, 255, 255, 0.1);

    .new-customer {
        cursor: pointer;
        margin-top: 10px;
        padding: 10px 0;

        &:hover {
            background-color: $hover-bg-color;
        }

        .new-customer__icon {
            color: #fff;
            margin: 0 auto;
            width: 100%;
            font-size: 36px;
        }
    }
</style>