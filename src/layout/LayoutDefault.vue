<template>
	<v-app style="background-color: #eee">
		<!-- ROUTER VIEW -->
		<v-main>
			<v-container>
				<!-- HEADER NAVIGATION -->
				<AppHeader></AppHeader>
				<!-- Category Navigation -->
				<NavigationCategory :categoryNavigation="categoryButtons"> </NavigationCategory>

				<slot></slot>

				<userRegistrationForm :dialog="registrationDialogStatus"></userRegistrationForm>
				<!-- USER LOGIN PAGE -->
				<userLoginForm :loginDialog="loginDialogStatus"></userLoginForm>
			</v-container>
		</v-main>
		<app-footer>
			<span class="primary--text caption">&copy; Airrake 2021</span>
		</app-footer>
	</v-app>
</template>

<script>
// COMPONENTS
import AppFooter from "Components/AppLayout/AppLayoutFooter";
import AppHeader from "Components/header";

// LAZY LOADING COMPONENT
const NavigationCategory = () => import(/*webpackChunkName: 'navigation-category'*/ "Components/AppUtilities/AppUtilitiesCategoryNavigation");
const userRegistrationForm = () => import(/* webpackChunkName: 'user registration form' */ "Components/client/registration");
const userLoginForm = () => import(/* webpackChunkName: 'user login' */ "Components/client/login");

// APP
import store from "Store";
import { eventEmitter } from "Event";

export default {
	name: "AppLayoutDefault",
	components: {
		AppFooter,
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
			this.whenBtnIsClick(0);
			this.routeHome();
		},
		async movies(action, index) {
			await this.fetchAllMovies();
			store.commit("Admin/FILTER_MOVIE_ON_DISPLAY", action);

			this.whenBtnIsClick(index);

			this.routeHome();
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
		},
		routeHome() {
			const homeTemplate = "main-dashboard";
			if (this.$route.name != "main-dashboard") {
				this.$router.push({ name: homeTemplate });
			}
		},
		whenBtnIsClick(index) {
			const btnClick = document.getElementsByClassName("dynamic-category");
			btnClick.forEach(element => {
				element.classList.remove("light-blue");
				element.classList.remove("lighten-2");
			});
			if (typeof index === "number") {
				btnClick[index].className += " light-blue lighten-2";
			}
		}
	},
	mounted() {
		this.eventEmitterOn();
		this.eventEmitterOff();

		this.displayRegistrationForm();
		this.closeRegistrationForm();

		this.whenBtnIsClick();
	}
};
</script>
