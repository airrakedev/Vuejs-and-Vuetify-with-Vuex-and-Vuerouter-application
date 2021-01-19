<template>
	<div>
		<!-- NAVIGATION DRAWER -->
		<navigationDrawer></navigationDrawer>
		<!-- ADMIN HEADER -->
		<adminHeader></adminHeader>
		<router-view :key="$route.path"></router-view>
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