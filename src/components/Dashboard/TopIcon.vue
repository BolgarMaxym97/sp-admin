<template>
    <div class="col-md-4 col-sm-6 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon" :class="icon.bg_class">
                <font-awesome-icon class="dashboard-icon" :icon="icon.icon"/>
            </span>
            <div class="info-box-content">
                <span class="info-box-text">{{icon.name}}</span>
                <span v-if="icon.hasOwnProperty('count')" class="info-box-number">
                    {{icon.count}}
                    <small v-if="icon.is_percent">%</small>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["icon"]
    };
</script>

<style scoped>
    .dashboard-icon {
        color: #fff;
    }
</style>

