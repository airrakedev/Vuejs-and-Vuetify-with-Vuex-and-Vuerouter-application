<template>
	<div>
		<!-- NAVIGATION DRAWER -->
		<clientNavigationDrawer></clientNavigationDrawer>

		<!-- ADMIN HEADER -->
		<clientHeader></clientHeader>

		<v-content>
			<v-container class="fill-height" fluid>
				<!-- <v-row> -->
				<!-- ADMIN DASHBOARD ROUTER -->
				<router-view></router-view>
				<!-- </v-row> -->
			</v-container>
		</v-content>
	</div>
</template>

<script>
import clientHeader from "Common/client/header";
import clientNavigationDrawer from "Common/client/sidebar";
export default {
	name: "ClientDashboard",
	components: {
		clientHeader,
		clientNavigationDrawer,
	},
	props: {
		source: String,
	},
	computed: {
		drawerStatus() {
			return this.drawer;
		},
	},
	created() {
		console.log("Client Boom");
	},
	data: () => ({
		dialog: false,
		drawer: true,
	}),
};
</script>

<style>
</style>