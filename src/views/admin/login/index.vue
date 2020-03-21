<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-2">
                        <v-toolbar flat color="teal" dark height="80">
                            <v-toolbar-title class="font-weight-light">Administrator Login</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text class="pb-2">
                            <v-row align="center">
                                <v-flex class="text-center">
                                    <v-icon class="icon-title" color="pink">mdi-hexagon-slice-6</v-icon>
                                </v-flex>
                            </v-row>
                        </v-card-text>
                        <v-card-text class="pb-0 pt-0">
                            <v-form class="pl-5 pr-5 pt-0">
                                <label for>Email</label>
                                <v-text-field
                                    placeholder="email@email.com"
                                    append-icon="mdi-email-outline"
                                    solo
                                    type="text"
                                    class="mt-1"
                                    v-model="newUser.email"
                                    @input="$v.newUser.email.$touch()"
                                    @blur="$v.newUser.email.$touch()"
                                    :error-messages="emailErrors"
                                />
                                <label for>Password</label>
                                <v-text-field
                                    placeholder="Password"
                                    append-icon="mdi-lock-outline"
                                    solo
                                    class="mt-1"
                                    type="password"
                                    v-model="newUser.password"
                                    @input="$v.newUser.password.$touch()"
                                    @blur="$v.newUser.password.$touch()"
                                    :error-messages="passwordErrors"
                                />
                            </v-form>
                        </v-card-text>
                        <div class="pb-5 pr-5 pl-5 pb-5" align="center" justify="center">
                            <v-btn
                                rounded
                                height="50"
                                width="130"
                                dark
                                color="teal"
                                class="pl-5 pr-5 mb-5"
                                @click="submit()"
                            >Login</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, email } = require("vuelidate/lib/validators");

export default {
    mixins: [validationMixin],
    validations: {
        newUser: {
            password: { required },
            email: { required, email }
        }
    },
    data() {
        return {
            newUser: {
                password: "",
                email: ""
            }
        };
    },
    computed: {
        passwordErrors() {
            const errors = [];
            if (!this.$v.newUser.password.$dirty) return errors;
            !this.$v.newUser.password.required &&
                errors.push("Password is required.");
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.newUser.email.$dirty) return errors;
            !this.$v.newUser.email.required &&
                errors.push("Email is required.");
            !this.$v.newUser.email.email && errors.push("Provide valid email.");
            return errors;
        }
    },
    methods: {
        submit() {
            this.$v.$touch();
            if (this.$v.$pending || this.$v.$error) return;

            this.$store
                .dispatch("Admin/adminLogin", this.newUser)
                .then(res => {
                    console.log(
                        this.$store.getters["Admin/getAdminSessionStatus"],
                        "Admin Login"
                    );
                })
                .catch(err =>
                    console.log(err, "From login page error control")
                );
        }
    }
};
</script>

<style scoped>
.icon-title {
    font-size: 90px !important;
}
</style>