<template>
	<v-app-bar app clipped-left elevation="2">
		<v-toolbar flat>
			<v-toolbar-title class="font-weight-bold primary--text">Movie Rental</v-toolbar-title>
			<v-spacer></v-spacer>
			<div v-if="!userSession">
				<v-btn
					color="primary"
					rounded
					class="mr-4 font-weight-light caption"
					@click="registerUser"
				>Signup</v-btn>
				<v-btn color="primary" rounded @click="showLoginForm" class="font-weight-light caption">Login</v-btn>
			</div>

			<div v-else>
				<!-- USER NOTIFICATIONS -->
				<ClientNotifications></ClientNotifications>
			</div>
		</v-toolbar>
	</v-app-bar>
</template>

<script>
import { eventEmitter } from "Event";

import ClientNotifications from "Components/client/notification";
export default {
	name: "AppHeader",
	components: {
		ClientNotifications
	},
	methods: {
		showLoginForm() {
			eventEmitter.$emit("display-login-form", {});
		},
		registerUser() {
			console.log("hoy");
			eventEmitter.$emit("open-registration", {});
		}
	},
	computed: {
		userSession() {
			return this.$store.getters.getClientSession;
		}
	}
};
</script>

<style>
</style>