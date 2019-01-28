<template>
    <div class="left-side-bar-user">
        <div class="user-name">
            {{userName}}
            <span class="user-arrow">
                <font-awesome-icon icon="arrow-right" />
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["user"],
        data() {
            return {};
        },
        computed: {
            userName: function () {
                return `${this.user.name_first} ${this.user.name_last}`;
            }
        }
    };
</script>

<style scoped>
    .user-name {
        color: #fff;
    }

    .user-arrow {
        font-size: 12px;
        float: right;
        margin-right: 20px;
    }

    .left-side-bar-user {
        padding: 30px 10px;
    }

    .left-side-bar-user:hover {
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
    }
</style>