<template>
    <div class="change-date ">
        <b-button class="arrow-btn" @click="subDay" :disabled="disabledDatepicker">
            <font-awesome-icon icon="arrow-left"/>
        </b-button>
        <date-picker @change="onChange"
                     value-type="format"
                     v-model="dateState"
                     lang="ru"
                     :not-after="new Date()"
                     :clearable="false"
                     format="DD.MM.YYYY"
                     :disabled="disabledDatepicker"/>
        <b-button class="arrow-btn" @click="addDay" :disabled="disabledDatepicker || checkCurrentDay">
            <font-awesome-icon icon="arrow-right"/>
        </b-button>
        <font-awesome-icon v-if="disabledDatepicker" icon="spinner" class="loader"/>
    </div>
</template>

<script>
    import DatePicker from "vue2-datepicker";

    export default {
        props: {
            date: {
                type: String,
                required: true
            },
            disabledDatepicker: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                dateState: this.date,
            };
        },
        methods: {
            subDay() {
                this.dateState = this.$moment(this.dateState, "DD.MM.YYYY").subtract(1, "days").format("DD.MM.YYYY");
                this.onChange();
            },
            addDay() {
                this.dateState = this.$moment(this.dateState, "DD.MM.YYYY").add(1, "days").format("DD.MM.YYYY");
                this.onChange();
            },
            onChange() {
                return this.$emit("after-change", this.dateState);
            }
        },

        computed: {
            checkCurrentDay() {
                return this.$moment(this.dateState).isSame(this.$moment(), "day");
            }
        },
        components: {
            DatePicker
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/colors";

    .change-date {
        text-align: left;
        margin: 0 0 15px 20px;

        .loader {
            font-size: 24px;
            color: $primary-color-5;
            margin: 5px 0 0 5px;
            width: 24px !important;
        }

        * {
            display: inline-block;
        }
    }

    .arrow-btn {
        padding: 0.28rem 0.75rem;
        margin: 0 5px;
        background-color: $primary-color-5;
    }
</style>