<template>
    <b-card class="mt-3 ml-3" title="Список администраторов">
        <b-button variant="success" class="mr-2 mt-1 new-admin-btn" v-b-tooltip.hover
                  @click="newAdminModal = true"
                  title="Создать нового админа">
            Добавить
        </b-button>
        <new-admin-modal @admin-added="afterAdminAdded" v-if="newAdminModal" @hidden="newAdminModal = false"/>
        <font-awesome-icon v-if="loading" icon="spinner" class="loader mt-2"/>
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
                <td>
                    <b-button variant="primary" size="sm" v-b-tooltip.hover
                              @click="editCustomerModal = true"
                              title="Редактировать">
                        <font-awesome-icon icon="edit"/>
                    </b-button>
                    <edit-admin-modal v-if="editCustomerModal" :userData="user" @hidden="editCustomerModal = false"/>
                    <b-button variant="danger" size="sm" class="ml-2" v-b-tooltip.hover
                              @click="confirmShow = true"
                              title="Удалить">
                        <font-awesome-icon icon="trash"/>
                    </b-button>
                    <confirm-modal @hidden="confirmShow = false" @onOk="removeAdmin(user.id)"
                                   :text="`Вы уверены что хотите удалить даного администратора?`" v-if="confirmShow"/>
                </td>
            </tr>
            </tbody>
        </table>
    </b-card>
</template>

<script>

    import {ENDPOINTS} from "@/api";
    import EditAdminModal from "@/modals/User/EditAdminModal";
    import NewAdminModal from "@/modals/User/NewAdminModal";
    import ConfirmModal from "@/modals/ConfirmModal";

    export default {
        data() {
            return {
                loading: true,
                users: [],
                newAdminModal: false,
                confirmShow: false,
                editCustomerModal: false
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
                this.users.push(payload);
            },
            removeAdmin(id) {
                this.$http.delete(ENDPOINTS.USER + "/" + id)
                    .then(resp => {
                        if (resp.success) {
                            this.confirmShow = false;
                            const index = this.users.findIndex(function (user) {
                                return user.id === id;
                            });
                            if (index !== -1) {
                                this.users.splice(index, 1);
                            }
                            this.$toastr("success", "Администратор успешно удален", "Успешно удалено");
                        }
                    });
            },
        },
        components: {
            NewAdminModal,
            ConfirmModal,
            EditAdminModal
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