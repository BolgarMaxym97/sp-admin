<template>
    <div class="login">
        <b-card
                class="text-center auth-card"
                header="Smart Plants Admin Dashboard"
                header-bg-variant="dark"
                header-text-variant="white"
                title="Sign In"
                align="center">
            <b-form class="login" @submit.prevent="login">
                <b-form-group id="emailInputGroup"
                              label="Email address:"
                              label-for="email">
                    <b-form-input id="email"
                                  type="email"
                                  v-model="email"
                                  required
                                  placeholder="Enter email">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="passwordInputGroup"
                              label="Password:"
                              label-for="password">
                    <b-form-input id="password"
                                  type="password"
                                  v-model="password"
                                  required
                                  placeholder="Enter password">
                    </b-form-input>
                </b-form-group>
                <b-button align="center" class="auth-btn" type="submit" variant="primary">
                    <font-awesome-icon icon="sign-in-alt"/>
                    Login
                </b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                email: "",
                password: "",
            };
        },
        methods: {
            login: function () {
                let email = this.email;
                let password = this.password;
                this.$store.dispatch("login", {email, password})
                    .then(() => this.$router.push("/"));
            }
        }
    };
</script>

<style scoped>
    .auth-card {
        max-width: 30%;
        left: 50%;
        transform: translate(-50%, 60%);
    }

    .auth-btn {
        margin-left: 10px;
    }
</style>