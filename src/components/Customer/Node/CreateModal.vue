<template>
    <b-modal v-model="show"
             title="Создание нового объекта"
             v-b-modal.modalmd
             ok-only
             ok-title="Сохранить"
             ok-variant="success"
             @hidden="onHidden"
             @ok="createNode">
        <b-form-group
                id="fieldset1"
                description="Выберите тип для нового объекта"
                label="Тип объекта"
                label-for="node-select">
            <v-select id="node-select" v-model="selected" :options="selectOptions">
                <span slot="no-options">Не найдено ни одного типа объектов</span>
            </v-select>
        </b-form-group>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";

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
                selected: null
            };
        },
        mounted() {
            this.$http.get(ENDPOINTS.NODE_TYPES)
                .then(types => {
                    this.selectOptions = types.map(type => ({label: type.name, value: type.id}));
                });
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            createNode() {

            }
        },
        watch: {
            modalCreateShow: function (newVal) {
                this.show = newVal;
            }
        }
    };
</script>

<style scoped>

</style>