<template>
    <b-modal :visible="true"
             :title="`Статистика по ${statistic.node_name || ''}`"
             size="md"
             ok-only
             ok-title="Закрыть"
             ok-variant="primary"
             :ok-disabled="loading"
             @hidden="onHidden">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else>
            <table class="table table-striped" v-if="!loading">
                <tbody>
                <tr>
                    <th scope="row">Тип объекта</th>
                    <td>{{statistic && statistic.node_type}}</td>
                </tr>
                <tr>
                    <th scope="row">Создан</th>
                    <td>{{statistic && statistic.created_at}}</td>
                </tr>
                <tr>
                    <th scope="row">Количество датчиков</th>
                    <td>{{statistic && statistic.sensors_count}}</td>
                </tr>
                <tr>
                    <th scope="row">Датчики</th>
                    <td>{{statistic && statistic.sensors_types.join(', ')}}</td>
                </tr>
                <tr>
                    <th scope="row">Количество данных по объекту</th>
                    <td>{{statistic && statistic.data_count}}</td>
                </tr>
                <tr>
                    <th scope="row">Время получения последних данных</th>
                    <td>{{statistic && statistic.last_data_time}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";

    export default {
        props: {
            node: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                loading: false,
                statistic: []
            };
        },
        mounted() {
            this.loading = true;
            this.$http.get(ENDPOINTS.NODES_STATISTIC + "/" + this.node.id).then(resp => {
                this.loading = false;
                this.statistic = resp;
            });
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        margin-top: 0;
    }

</style>