<template>
	<v-app-bar app clipped-left elevation="2" color="white">
		<v-toolbar flat>
			<v-toolbar-title class="font-weight-bold primary--text">Prime Movies</v-toolbar-title>
			<v-spacer></v-spacer>
			<div v-if="!userSession">
				<v-btn
					color="primary"
					rounded
					class="mr-4 font-weight-bold caption"
					@click="registerUser"
				>Signup</v-btn>
				<v-btn color="primary" rounded @click="showLoginForm" class="font-weight-bold caption">Login</v-btn>
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
import store from "Store";
import ClientNotifications from "Components/client/notification";
export default {
	name: "AppHeader",
	components: {
		ClientNotifications,
	},
	methods: {
		showLoginForm() {
			eventEmitter.$emit("display-login-form", {});
		},
		registerUser() {
			eventEmitter.$emit("open-registration", {});
		},
	},
	computed: {
		userSession() {
			return store.getters["Customer/getClientSession"];
		},
	},
};
</script>

<style>
</style>