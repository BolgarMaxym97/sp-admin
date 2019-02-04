<template>
    <b-col xl="6" lg="12">
        <b-card class="text-center mt-3"
                :img-src="img"
                img-alt="Объект"
                img-top>
            <p class="card-text">
                Объект
            </p>
        </b-card>
    </b-col>
</template>

<script>
    import img from "@/assets/images/greenhouse.png";

    export default {
        data() {
            return {
                publicPath: process.env.BASE_URL,
                img: img
            };
        },
    };
</script>
