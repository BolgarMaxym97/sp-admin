<template>
    <b-modal :visible="true"
             title="Настройки объекта"
             size="xl"
             ok-only
             ok-title="Закрыть"
             ok-variant="primary"
             :ok-disabled="loading"
             @hidden="onHidden">
        <node-settings :loading="loading" :node="node" @toggle-loading="toggleLoading" @after-update="afterUpdate"/>
        <hr>
        <sensors-settings-table :node="node"/>
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
    </b-modal>
</template>

<script>
    import SensorsSettingsTable from "@/components/Customer/Sensor/SettingsTable";
    import NodeSettings from "@/components/Customer/Node/NodeSettings";

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
            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            toggleLoading(e) {
                this.loading = e;
            },
            afterUpdate(e) {
                this.$emit("after-update", e);
            }
        },
        components: {
            SensorsSettingsTable,
            NodeSettings
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 90px;
    }

</style>