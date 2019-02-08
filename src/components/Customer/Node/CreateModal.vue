<template>
    <b-modal v-model="show"
             title="Создание нового объекта"
             v-b-modal.modalmd
             ok-only
             ref="modal"
             ok-title="Сохранить"
             ok-variant="success"
             :ok-disabled="loading"
             @hidden="onHidden"
             @ok="createNode">
        <b-form-group
                id="fieldset1"
                description="Выберите тип для нового объекта"
                label="Тип объекта"
                label-for="node-select">
            <v-select id="node-select" v-model="selected" :options="selectOptions" :disabled="loading">
                <span slot="no-options">Не найдено ни одного типа объектов</span>
            </v-select>
        </b-form-group>
        <b-form-group label="Название объекта:"
                      label-for="object_name"
                      description="Придумайте имя для нового объекта">
            <b-form-input id="object_name"
                          type="text"
                          v-model="objectName"
                          required
                          :disabled="loading"
                          placeholder="Имя объекта">
            </b-form-input>
        </b-form-group>
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import _ from "lodash";

    export default {
        props: {
            modalCreateShow: {
                type: Boolean
            },
            customerId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                show: this.modalCreateShow,
                selectOptions: [],
                selected: null,
                objectName: "",
                loading: false,
            };
        },
        mounted() {
            this.$http.get(ENDPOINTS.NODE_TYPES)
                .then(types => {
                    this.selectOptions = types.map(type => ({label: type.name, value: type.id}));
                });
        },
        computed: {
            type() {
                return _.get(this.selected, "value", "");
            }
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            createNode(ev) {
                ev.preventDefault();
                this.loading = true;
                this.$http.post(ENDPOINTS.NODES, {
                    user_id: this.customerId,
                    type: this.type,
                    object_name: this.objectName
                }).then(resp => {
                    if (_.size(resp)) {
                        this.$refs.modal.hide();
                        this.$emit("push-node", resp);
                    }
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        watch: {
            modalCreateShow: function (newVal) {
                this.show = newVal;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        position: absolute;
        top: 50px;
        left: 0px;
        font-size: 90px;
    }
</style>