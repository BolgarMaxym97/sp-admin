<template>
    <div class="customer p-3">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else class="customer-nodes">
            <b-alert v-if="!nodes.length" show variant="danger">У этого пользователя нету ни одного объекта</b-alert>
            <b-row>
                <node v-for="(node, index) in nodes"
                      :key="index"
                      :node="node"
                      :icons="icons"/>
                <b-col xl="4" lg="6">
                    <b-card class="text-center mt-3 new-node-card" id="new-node-card-tooltip">
                        <b-tooltip target="new-node-card-tooltip" title="Добавить новый объект" placement="lefttop"></b-tooltip>
                        <font-awesome-icon icon="plus" class="new-node-card__icon"/>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import Node from "@/components/Customer/Node";

    export default {
        data() {
            return {
                nodes: [],
                icons: [],
                loading: true,
            };
        },
        mounted() {
            this.fetch();
        },
        methods: {
            fetch() {
                this.loading = true;
                this.$http.get(ENDPOINTS.NODES, {params: {user_id: this.$route.params.id}})
                    .then(resp => {
                        this.nodes = resp.nodes;
                        this.icons = resp.icons;
                        this.loading = false;
                    });
            }
        },
        watch: {
            "$route"() {
                this.fetch();
            }
        },
        components: {
            Node
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }

    .new-node-card__icon {
        font-size: 20em;
        margin: 44px 0;
        color: $topbar-bg-color;
        opacity: 0.4;
    }

    .new-node-card:hover {
        .new-node-card__icon {
            opacity: 1;
        }
    }
</style>