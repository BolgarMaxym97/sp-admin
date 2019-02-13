<template>
    <b-row>
        <b-col cols="5">
            <font-awesome-icon v-if="!selectOptions.length" icon="spinner" class="loader types-loader"/>
            <b-form-group
                    id="fieldset1"
                    description="Выберите тип для нового объекта"
                    label="Тип объекта"
                    class="text-left"
                    label-for="node-select">
                <v-select id="node-select" v-model="selected" :options="selectOptions"
                          :disabled="loading || !selectOptions.length">
                    <span slot="no-options">Не найдено ни одного типа объектов</span>
                </v-select>
            </b-form-group>
        </b-col>
        <b-col cols="5">
            <b-form-group label="Название объекта:"
                          label-for="object_name"
                          class="text-left"
                          description="Придумайте имя для нового объекта">
                <b-form-input id="object_name"
                              type="text"
                              v-model="objectName"
                              class="object-name-input"
                              required
                              :disabled="loading"
                              placeholder="Имя объекта">
                </b-form-input>
            </b-form-group>
        </b-col>
        <b-col cols="2">
            <b-button variant="success" class="save-node-setting" @click="saveNode">
                <font-awesome-icon icon="save"/>
                Сохранить
            </b-button>
        </b-col>
    </b-row>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import _ from "lodash";

    export default {
        props: {
            loading: {
                type: Boolean,
                required: false,
            },
            node: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                selectOptions: [],
                selected: {label: this.node.type_name, value: this.node.type},
                objectName: this.node.object_name,
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
            saveNode() {
                this.$emit("toggle-loading", true);
                this.$http.put(ENDPOINTS.NODES + "/" + this.node.id, {
                    type: this.type,
                    object_name: this.objectName
                }).then(resp => {
                    this.$emit("toggle-loading", false);
                    if (resp.success) {
                        this.$emit("after-update", resp.node);
                        return this.$toastr("success", "Данные успешно обновлены", "");
                    } else {
                        return this.$toastr("error", "Данные заполнены неверно", "Ошибка");
                    }
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
    }

    .types-loader {
        font-size: 20px;
        position: relative;
        width: 20px !important;
        margin-top: 0;
    }


    .save-node-setting {
        margin-top: 35px;
    }

    .object-name-input {
        height: 47px;
    }
</style>