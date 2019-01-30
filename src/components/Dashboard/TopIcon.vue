<template>
    <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon" :class="card.bg_class">
                <font-awesome-icon class="dashboard-icon" :icon="card.icon"/>
            </span>
            <div class="info-box-content">
                <span class="info-box-text">{{card.name}}</span>
                <span v-if="card.hasOwnProperty('count')" class="info-box-number">
                    {{card.count}}
                    <small v-if="card.is_percent">%</small>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["card"]
    };
</script>

<style scoped>
    .dashboard-icon {
        color: #fff;
    }
</style>

