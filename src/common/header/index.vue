<template>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app elevation="2">
        <v-app-bar-nav-icon @click="toggleDrawer" />

        <v-toolbar-title class="ml-0 pl-4">
            <span class="hidden-sm-and-down teal--text">Administrator Dashboard</span>
        </v-toolbar-title>

        <v-spacer />

        <!-- <v-btn icon v-on="on">
      <v-icon>mdi-bell</v-icon>
        </v-btn>-->

        <div class="text-center">
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon color="pink" large>mdi-account-circle-outline</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{adminData.firstname}} {{adminData.lastname}}</v-list-item-title>
                                <v-list-item-subtitle>{{adminData.email}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                                <v-icon>mdi-account-search-outline</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>My Profile</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="logout()">
                            <v-list-item-action>
                                <v-icon>mdi-power-standby</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>
    </v-app-bar>
</template>

<script>
import session from "Session";
import store from "Store";
export default {
    name: "AdminHeader",
    data: () => ({
        menu: false
    }),
    methods: {
        toggleDrawer() {
            this.$store.dispatch("Global/toggleDrawer");
        },
        logout() {
            store.dispatch("Admin/adminLogout");
        }
    },
    computed: {
        adminData() {
            return store.getters["Admin/getAdminProfile"];
        }
    }
};
</script>

<style>
</style>