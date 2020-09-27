<template>
	<div>
		<!-- HEADER NAVIGATION -->
		<AppHeader></AppHeader>
		<v-content>
			<v-container>
				<v-row>
					<v-col>
						<v-card flat color="#eee">
							<v-card-actions>
								<v-btn text color="primary">Home</v-btn>
								<v-btn text color="primary">Trending</v-btn>

								<v-btn text color="primary">Featured</v-btn>
								<v-btn text color="primary">New Release</v-btn>

								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>

				<v-row>
					<!-- AVAILABLE MOVIES -->
					<availableMovies></availableMovies>
				</v-row>
				<!-- USER REGISTRATION -->
				<userRegistrationForm :dialog="registrationDialogStatus"></userRegistrationForm>
				<!-- USER LOGIN PAGE -->
				<userLoginForm :loginDialog="loginDialogStatus"></userLoginForm>
			</v-container>
		</v-content>
	</div>
</template>

<script>
import availableMovies from "Components/dashboard/available-movies";
import userRegistrationForm from "Components/client/registration";
import userLoginForm from "Components/client/login";

import AppHeader from "Components/header";

import { eventEmitter } from "Event";

export default {
	name: "main-dashboard",
	components: {
		availableMovies,
		userRegistrationForm,
		userLoginForm,

		AppHeader,
	},
	data() {
		return {
			menu: false,
			show: false,
			dialog: false,
			loginDialog: false,
		};
	},
	computed: {
		loginDialogStatus() {
			return this.loginDialog;
		},
		registrationDialogStatus() {
			return this.dialog;
		},
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
	},
	created() {
		this.eventEmitterOn();
		this.eventEmitterOff();

		this.displayRegistrationForm();
		this.closeRegistrationForm();
	},
};
</script>

<style>
</style>