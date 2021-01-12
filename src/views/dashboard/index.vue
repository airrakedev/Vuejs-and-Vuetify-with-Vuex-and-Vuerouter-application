<template>
	<v-container>
		<!-- HEADER NAVIGATION -->
		<AppHeader></AppHeader>
		<!-- Category Navigation -->
		<!-- <NavigationCategory v-for="navcat in categoryButtons" :key="navcat.name" :categoryNavigation="navcat"> </NavigationCategory> -->
		<NavigationCategory :categoryNavigation="categoryButtons"> </NavigationCategory>

		<!-- AVAILABLE MOVIES -->
		<availableMovies></availableMovies>

		<!-- USER REGISTRATION -->
		<userRegistrationForm :dialog="registrationDialogStatus"></userRegistrationForm>
		<!-- USER LOGIN PAGE -->
		<userLoginForm :loginDialog="loginDialogStatus"></userLoginForm>
	</v-container>
</template>

<script>
// COMPONENTS
import availableMovies from "Components/dashboard/available-movies";
import userRegistrationForm from "Components/client/registration";
import userLoginForm from "Components/client/login";
import AppHeader from "Components/header";
// LAZY LOADING COMPONENT
const NavigationCategory = () => import(/*webpackChunkName: 'navigation-category'*/ "Components/AppUtilities/AppUtilitiesCategoryNavigation");

// APP
import store from "Store";
import { eventEmitter } from "Event";

export default {
	name: "main-dashboard",
	components: {
		availableMovies,
		userRegistrationForm,
		userLoginForm,
		AppHeader,
		NavigationCategory
	},
	data() {
		return {
			categoryButtons: [
				{
					name: "Home",
					event: this.fetchAllMovies,
					params: ""
				},
				{
					name: "Trending",
					event: this.movies,
					params: "trending"
				},
				{
					name: "Featured",
					event: this.movies,
					params: "featured"
				},
				{
					name: "New Release",
					event: this.movies,
					params: "new"
				}
			],
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
		async fetchAllMovies() {
			const params = {
				limit: 50,
				page: 1,
				sort: { title: 1 }
			};
			await store.dispatch("Admin/gettingAllMovies", params);
		},
		async movies(action) {
			await this.fetchAllMovies();
			store.commit("Admin/FILTER_MOVIE_ON_DISPLAY", action);
		},
		showLoginForm() {
			eventEmitter.$emit("display-login-form", {});
		},
		eventEmitterOn() {
			eventEmitter.$on("display-login-form", () => {
				this.loginDialog = true;
			});
		},
		eventEmitterOff() {
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