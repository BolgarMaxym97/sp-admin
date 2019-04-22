<template>
    <b-card class="mt-3 ml-3" title="Список администраторов">
        <!--        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>-->
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Имя</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Телефон</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </b-card>
</template>

<script>

    export default {
        data() {
            return {
                loading: true,
            };
        },
        mounted() {
            this.fetch();
        },
        methods: {
            fetch() {
                this.loading = true;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }
</style>