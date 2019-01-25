<template>
    <div>
        <h4>Register</h4>
        <form @submit.prevent="register">
            <label for="name_first">Name First</label>
            <div>
                <input id="name_first" type="text" v-model="name_first" required autofocus>
            </div>

            <label for="name_last">Name Last</label>
            <div>
                <input id="name_last" type="text" v-model="name_last" required autofocus>
            </div>

            <label for="phone">Phone</label>
            <div>
                <input id="phone" type="text" v-model="phone" required autofocus>
            </div>

            <label for="email">E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required>
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>

            <label for="password_confirmation">Confirm Password</label>
            <div>
                <input id="password_confirmation" type="password" v-model="password_confirmation" required>
            </div>

            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name_first: "",
                name_last: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
                is_admin: null
            };
        },
        methods: {
            register: function () {
                let data = {
                    name_first: this.name_first,
                    name_last: this.name_last,
                    email: this.email,
                    phone: this.phone,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    is_admin: this.is_admin
                };
                this.$store.dispatch("register", data)
                    .then(() => this.$router.push("/"))
                    .catch(err => console.log(err));
            }
        }
    };
</script>