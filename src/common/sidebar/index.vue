<template>
    <v-navigation-drawer
        color="teal"
        :mini-variant="drawerStatus"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        dark
    >
        <v-list>
            <v-list-item two-line :class="drawerStatus && 'px-0'" class="pl-2">
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title
                        class="font-weight-light"
                    >{{adminData.firstname}} {{adminData.lastname}}</v-list-item-title>
                    <v-list-item-subtitle class="font-weight-thin">{{adminData.email}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <!-- DASHBOARD -->
            <router-link :to="{name:'AdminDashboard'}">
                <v-list-item link class="mt-5">
                    <v-list-item-avatar>
                        <v-icon>mdi-tablet-dashboard</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-light">Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
            <!-- CREATE MOVIES -->

            <v-list-item link @click="displayFormMovie">
                <v-list-item-avatar>
                    <v-icon>mdi-movie-edit-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-light">Create Movie</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <!-- FROM MOVIE -->
        <formMovie
            :movieData="movieData"
            :title="title"
            :movieDialog="movieDialogStatus"
            @close-movie-form="movieDialog = false"
        ></formMovie>
    </v-navigation-drawer>
</template>

<script>
import store from "Store";
import { eventEmitter } from "Event";
import formMovie from "Components/movieForm";
export default {
    components: {
        formMovie
    },
    name: "navigationDrawer",
    data: () => ({
        movieData: {},
        movieDialog: false,
        title: "Create a Movie"
    }),
    methods: {
        displayFormMovie() {
            this.movieDialog = true;
            console.log(this.movieDialog, "Booi");
        }
    },
    computed: {
        adminData() {
            return store.getters["Admin/getAdminProfile"];
        },

        movieDialogStatus() {
            return this.movieDialog;
        },
        drawerStatus: {
            get() {
                return this.$store.getters["Global/getDrawerStatus"];
            },
            set(ambot) {
                return ambot;
            }
        }
    },
    created() {}
};
</script>

<style scoped>
.v-navigation-drawer__content a {
    text-decoration: none;
}
</style>