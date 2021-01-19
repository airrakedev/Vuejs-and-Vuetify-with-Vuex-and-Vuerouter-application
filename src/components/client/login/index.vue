<template>
	<Modal :show="closeLoginForm" :maxWidth="maxWidth">
		<template #title>
			<v-toolbar elevation="0" dark>
				<v-toolbar-title> Account Login </v-toolbar-title>
				<v-spacer></v-spacer>
			</v-toolbar>
		</template>
		<template>
			<forms-login :newUser="newUser" :key="`Form_${formId}`" :signin="submit" ref="loginForm">
				<template #submitButton>
					<v-btn class="pl-5 pr-5" dark type="submit" :disabled="formSubmitStatus">Login</v-btn>
				</template>
			</forms-login>
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
			},
			formSubmitStatus: false
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
			this.formSubmitStatus = true;
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
						this.clearForm();
					}
					this.formSubmitStatus = false;
				})
				.catch(err => {
					console.log(err, "From login page error control");
				});
		},
		closeLogin() {
			eventEmitter.$emit("hide-login-form", {});
		},
		clearForm() {
			this.newUser.email = "";
			this.newUser.password = "";
		}
	}
};
</script>

<style></style>
