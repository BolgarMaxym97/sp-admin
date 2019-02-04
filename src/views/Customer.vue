<template>
    <div class="customer p-3">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div v-else class="customer-nodes">
            <b-alert v-if="!nodes.length" show variant="danger">У этого пользователя нету ни одного объекта</b-alert>
            <b-row>
                <node v-for="(node, index) in nodes"
                      :key="index"
                      :node="node"/>
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
                    .then(nodes => {
                        this.nodes = nodes;
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
</style>