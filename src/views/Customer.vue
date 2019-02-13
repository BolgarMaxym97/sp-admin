<template>
    <div class="customer p-3">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else class="customer-nodes">
            <b-alert v-if="!nodes.length" show variant="danger">У этого пользователя нету ни одного объекта</b-alert>
            <b-row>
                <node v-for="(node, index) in nodes"
                      class="node-component"
                      :key="index"
                      :node="node"
                      @on-delete="onDelete"
                      :icons="icons"/>
                <b-col xl="4" lg="4" md="6" class="node-col">
                    <b-card class="text-center mt-3 new-node-card" id="new-node-card-tooltip"
                            @click="toggleModal">
                        <b-tooltip target="new-node-card-tooltip" title="Добавить новый объект"
                                   placement="lefttop"></b-tooltip>
                        <font-awesome-icon icon="plus" class="new-node-card__icon"/>
                    </b-card>
                </b-col>
            </b-row>
        </div>
        <node-create-modal v-if="modalCreateShow"
                           :customer-id="customerId"
                           @push-node="pushNode"
                           @hidden="toggleModal"/>
    </div>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import Node from "@/components/Customer/Node/Node";
    import NodeCreateModal from "@/modals/Node/NodeCreateModal";

    export default {
        data() {
            return {
                nodes: [],
                icons: [],
                loading: true,
                modalCreateShow: false,
            };
        },
        mounted() {
            this.fetch();
        },
        methods: {
            fetch() {
                this.loading = true;
                this.$http.get(ENDPOINTS.NODES, {params: {user_id: this.customerId}})
                    .then(resp => {
                        this.nodes = resp.nodes;
                        this.icons = resp.icons;
                        this.loading = false;
                    });
            },
            toggleModal() {
                this.modalCreateShow = !this.modalCreateShow;
            },
            pushNode(e) {
                this.nodes.push(e);
            },
            onDelete(e) {
                const index = this.nodes.findIndex(function (node) {
                    return node.id === e;
                });
                if (index !== -1) {
                    this.nodes.splice(index, 1);
                }
            }
        },
        computed: {
            customerId() {
                return +this.$route.params.id;
            }
        },
        watch: {
            "$route"() {
                this.fetch();
            }
        },
        components: {
            Node,
            NodeCreateModal
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }

    .new-node-card {
        min-height: 100%;
    }

    .new-node-card__icon {
        font-size: 20em;
        padding-top: 10%;
        color: $topbar-bg-color;
        opacity: 0.4;
    }

    .new-node-card:hover {
        .new-node-card__icon {
            opacity: 1;
        }
    }
</style>