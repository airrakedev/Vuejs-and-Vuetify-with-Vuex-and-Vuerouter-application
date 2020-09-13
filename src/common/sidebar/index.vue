<template>
	<v-navigation-drawer
		color="primary"
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
					<v-list-item-title class="font-weight-light">{{adminData.firstname}} {{adminData.lastname}}</v-list-item-title>
					<v-list-item-subtitle class="font-weight-light">{{adminData.email}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>
			<!-- DASHBOARD -->
			<router-link :to="{name:'AdminDashboard'}">
				<v-list-item link class="mt-5 pl-2">
					<v-list-item-avatar>
						<v-icon>mdi-view-dashboard-outline</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-light">Dashboard</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</router-link>

			<!-- CREATE MOVIES -->

			<v-list-item link @click="displayFormMovie" class="pl-2">
				<v-list-item-avatar>
					<v-icon>mdi-filmstrip</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title class="font-weight-light">Create Movie</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<!-- RETURN MOVIES -->
			<router-link :to="{name:'AdminMovieList'}">
				<v-list-item link class="pl-2">
					<v-list-item-avatar>
						<v-icon>mdi-movie-roll</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-light">All Movies</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</router-link>

			<!-- ALL CLIENTS -->
			<router-link :to="{name:'AllClientList'}">
				<v-list-item link class="pl-2">
					<v-list-item-avatar>
						<v-icon>mdi-account-group-outline</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-light">All Clients</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</router-link>
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
		formMovie,
	},
	name: "navigationDrawer",
	data: () => ({
		movieData: {},
		movieDialog: false,
		title: "Create a Movie",
	}),
	methods: {
		displayFormMovie() {
			this.movieDialog = true;
			console.log(this.movieDialog, "Booi");
		},
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
			},
		},
	},
	created() {},
};
</script>

<style scoped>
a.router-link-exact-active .v-list-item .v-list-item__content .v-list-item__title {
	font-weight: bold !important;
}

a.router-link-exact-active .v-list-item {
	background: #037bdb !important;
}
.v-navigation-drawer__content a {
	text-decoration: none;
}
</style>