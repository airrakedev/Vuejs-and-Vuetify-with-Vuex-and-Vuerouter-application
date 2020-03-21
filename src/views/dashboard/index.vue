<template>
    <div>
        <!-- HEADER NAVIGATION -->
        <AppHeader></AppHeader>
        <v-content>
            <v-container>
                <v-layout wrap row>
                    <v-row>
                        <v-flex xs-12>
                            <v-card flat color="#eee">
                                <v-card-actions>
                                    <v-btn text color="primary">Home</v-btn>
                                    <v-btn text color="primary">Trending</v-btn>

                                    <v-btn text color="primary">Featured</v-btn>
                                    <v-btn text color="primary">New Release</v-btn>

                                    <v-spacer></v-spacer>

                                    <div>
                                        <v-menu
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            :nudge-width="200"
                                            offset-x
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-btn dark v-on="on" icon text>
                                                    <v-icon
                                                        color="primary"
                                                    >{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                                </v-btn>
                                            </template>

                                            <!-- CLIENT MOVIE LISTING -->
                                            <myMovieListing @close-me="menu=false"></myMovieListing>
                                        </v-menu>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-row>
                </v-layout>

                <v-layout align-center justify-center>
                    <!-- AVAILABLE MOVIES -->
                    <availableMovies></availableMovies>
                </v-layout>
                <!-- USER REGISTRATION -->
                <userRegistrationForm :dialog="registrationDialogStatus"></userRegistrationForm>
                <!-- USER LOGIN PAGE -->
                <userLoginForm :loginDialog="loginDialogStatus"></userLoginForm>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import myMovieListing from "Components/client/movie-listing";
import availableMovies from "Components/dashboard/available-movies";
import userRegistrationForm from "Components/client/registration";
import userLoginForm from "Components/client/login";

import AppHeader from "Components/header";

import { eventEmitter } from "Event";

export default {
    name: "main-dashboard",
    components: {
        myMovieListing,
        availableMovies,
        userRegistrationForm,
        userLoginForm,

        AppHeader
    },
    data() {
        return {
            menu: false,
            show: false,
            dialog: false,
            loginDialog: false
        };
    },
    computed: {
        loginDialogStatus() {
            return this.loginDialog;
        },
        registrationDialogStatus() {
            return this.dialog;
        }
    },
    methods: {
        showLoginForm() {
            eventEmitter.$emit("display-login-form", {});
        },
        eventEmitterOn() {
            eventEmitter.$on("display-login-form", () => {
                this.loginDialog = true;
            });
        },
        eventEmitterOff() {
            console.log("Out");
            eventEmitter.$on("hide-login-form", () => {
                this.loginDialog = false;
            });
        },
        displayRegistrationForm() {
            eventEmitter.$on("open-registration", () => {
                this.dialog = true;
            });
        },
        closeRegistrationForm() {
            eventEmitter.$on("close-dialog-registration", () => {
                this.dialog = false;
            });
        }
    },
    created() {
        this.eventEmitterOn();
        this.eventEmitterOff();

        this.displayRegistrationForm();
        this.closeRegistrationForm();
    }
};
</script>

<style>
</style>