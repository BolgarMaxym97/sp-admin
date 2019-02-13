<template>
    <b-modal :visible="true"
             title="Настройки объекта"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ok-variant="primary"
             :ok-disabled="loading"
             @hidden="onHidden">
        <b-row>
            <b-col cols="5">
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
        <font-awesome-icon v-if="loading || !selectOptions.length" icon="spinner" class="loader"/>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import _ from "lodash";

    export default {
        props: {
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
            saveNode() {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        position: absolute;
        top: 50px;
        left: 0;
        font-size: 90px;
    }

    .save-node-setting {
        margin-top: 35px;
    }

    .object-name-input {
        height: 47px;
    }

</style>