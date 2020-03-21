<template>
    <div>
        <!-- NAVIGATION DRAWER -->
        <navigationDrawer></navigationDrawer>

        <!-- ADMIN HEADER -->
        <adminHeader></adminHeader>

        <v-content>
            <v-container class="fill-height" fluid>
                <v-row>
                    <!-- ADMIN DASHBOARD ROUTER -->
                    <router-view></router-view>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import adminHeader from "Common/header";
import navigationDrawer from "Common/sidebar";
export default {
    name: "AdminDashboard",
    components: {
        adminHeader,
        navigationDrawer
    },
    props: {
        source: String
    },
    computed: {
        drawerStatus() {
            return this.drawer;
        }
    },
    created() {
        // console.log(this.drawerStatus, "Boom");
    },
    data: () => ({
        dialog: false,
        drawer: true
    })
};
</script>

<style>
</style>