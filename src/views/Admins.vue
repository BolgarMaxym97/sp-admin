<template>
    <b-card class="mt-3 ml-3" title="Список администраторов">
        <b-button variant="success" class="mr-2 mt-1 new-admin-btn" v-b-tooltip.hover
                  @click="newAdminModal = true"
                  title="Создать нового админа">
            Добавить
        </b-button>
        <new-admin-modal @admin-added="afterAdminAdded" v-if="newAdminModal" @hidden="newAdminModal = false"/>
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <table class="table table-hover" v-else>
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
            <tr v-for="user in users" :key="user.id">
                <th scope="row">{{user.id}}</th>
                <td>{{user.name_first}}</td>
                <td>{{user.name_last}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.email}}</td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </b-card>
</template>

<script>

    import {ENDPOINTS} from "@/api";
    import NewAdminModal from "@/modals/User/NewAdminModal";

    export default {
        data() {
            return {
                loading: true,
                users: [],
                newAdminModal: false
            };
        },
        mounted() {
            this.fetch();
        },
        methods: {
            fetch() {
                this.loading = true;
                this.$http.get(ENDPOINTS.ADMINS)
                    .then(resp => {
                        this.users = resp;
                        this.loading = false;
                    });
            },
            afterAdminAdded(payload) {
                console.log(payload);
                this.users.push(payload);
            }
        },
        components: {
            NewAdminModal
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }

    .new-admin-btn {
        float: right;
        top: -45px;
        position: relative;
    }
</style>