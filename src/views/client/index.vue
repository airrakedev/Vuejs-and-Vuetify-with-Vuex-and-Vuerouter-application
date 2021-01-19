<template>
	<v-container>
		<clientNavigationDrawer></clientNavigationDrawer>
		<!-- ADMIN HEADER -->
		<clientHeader></clientHeader>
		<router-view :key="$route.path"></router-view>
	</v-container>
</template>

<script>
import clientHeader from "Common/client/header";
import clientNavigationDrawer from "Common/client/sidebar";
export default {
	name: "ClientDashboard",
	components: {
		clientHeader,
		clientNavigationDrawer
	},
	props: {
		source: String
	},
	computed: {
		drawerStatus() {
			return this.drawer;
		}
	},
	data: () => ({
		dialog: false,
		drawer: true
	})
};
</script>

<style>
</style>