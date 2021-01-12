<template>
	<Modal :show="closeLoginForm" :maxWidth="maxWidth">
		<template #title>
			<v-toolbar elevation="0" dark>
				<v-toolbar-title> Account Login </v-toolbar-title>
				<v-spacer></v-spacer>
			</v-toolbar>
		</template>
		<template>
			<FormsLogin :newUser="newUser" :key="`Form_${formId}`" ref="loginForm">
				<template #submitButton>
					<v-btn class="pl-5 pr-5" dark @click.prevent="submit">Login</v-btn>
				</template>
			</FormsLogin>
		</template>
	</Modal>
</template>

<script>
// APP INCLUDES
import route from "Router";
import { eventEmitter } from "Event";

// COMPONENTS
import Modal from "Components/Modal";
import FormsLogin from "Components/Forms/FormsLogin";

export default {
	name: "client-registration",
	components: {
		Modal,
		FormsLogin
	},
	props: ["loginDialog"],

	data() {
		return {
			maxWidth: "500px",
			formId: 2,
			newUser: {
				password: "",
				email: ""
			}
		};
	},
	computed: {
		closeLoginForm() {
			return this.loginDialog;
		}
	},
	methods: {
		submit() {
			if (this.$refs.loginForm.$v.$invalid) return;

			this.$refs.loginForm
				.submit()
				.then(payload => {
					this.submitForm(payload);
				})
				.catch(error => console.log(error.message, "Error while login"));
		},
		submitForm(payload) {
			if (this.$store.getters["Admin/getAdminSessionStatus"]) {
				this.$store.commit("Customer/NO_DOUBLE_LOGIN");
				this.closeLogin();
				route.push({ name: "AdminDashboard" });

				return;
			}

			this.$store
				.dispatch("Customer/loginUser", payload)
				.then(res => {
					if (this.$store.getters["Customer/getClientSession"]) {
						this.closeLogin();
					}
				})
				.catch(err => console.log(err, "From login page error control"));
		},
		registerUser() {
			eventEmitter.$emit("open-registration", {});
			this.closeLogin();
		},
		closeLogin() {
			eventEmitter.$emit("hide-login-form", {});
		}
	}
};
</script>

<style></style>
