<template>
	<v-dialog v-model="closeLoginForm" persistent max-width="600px">
		<v-card>
			<v-toolbar elevation="1" dark>
				<v-toolbar-title>Account Login</v-toolbar-title>

				<v-spacer></v-spacer>
			</v-toolbar>

			<v-card-text>
				<v-container>
					<form>
						<v-row>
							<v-col sm="12">
								<label for>Email</label>
								<v-text-field
									v-model="newUser.email"
									@input="
										$v.newUser.email.$touch()
									"
									@blur="
										$v.newUser.email.$touch()
									"
									:error-messages="
										emailErrors
									"
									placeholder="Email Address"
									append-icon="mdi-email"
									solo
									autofocus
								></v-text-field>
							</v-col>
							<v-col sm="12">
								<label for>Password</label>
								<v-text-field
									type="password"
									v-model="newUser.password"
									@input="
										$v.newUser.password.$touch()
									"
									@blur="
										$v.newUser.password.$touch()
									"
									:error-messages="
										passwordErrors
									"
									solo
									placeholder="password"
									append-icon="mdi-lock-open"
								></v-text-field>
							</v-col>
						</v-row>
					</form>
				</v-container>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="pa-5">
				<v-btn class="pl-5 pr-5" dark @click="registerUser">Create Account</v-btn>
				<v-spacer></v-spacer>
				<v-btn class="pl-5 pr-5" dark @click="closeLogin">Close</v-btn>
				<v-btn class="pl-5 pr-5" dark @click="submit">Login</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, email } = require("vuelidate/lib/validators");

import { eventEmitter } from "Event";

export default {
	name: "client-registration",
	props: ["loginDialog"],
	mixins: [validationMixin],
	validations: {
		newUser: {
			password: { required },
			email: { required, email },
		},
	},
	data() {
		return {
			newUser: {
				password: "",
				email: "",
			},
		};
	},
	computed: {
		closeLoginForm() {
			return this.loginDialog;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.newUser.password.$dirty) return errors;
			!this.$v.newUser.password.required && errors.push("Password is required.");
			return errors;
		},
		emailErrors() {
			const errors = [];
			if (!this.$v.newUser.email.$dirty) return errors;
			!this.$v.newUser.email.required && errors.push("Email is required.");
			!this.$v.newUser.email.email && errors.push("Provide valid email.");
			return errors;
		},
	},
	methods: {
		submit() {
			this.$v.$touch();
			if (this.$v.$pending || this.$v.$error) return;

			delete this.newUser.confirmPassword;

			this.$store
				.dispatch("Customer/loginUser", this.newUser)
				.then((res) => {
					if (this.$store.getters["Customer/getClientSession"]) {
						this.closeLogin();
					}
				})
				.catch((err) => console.log(err, "From login page error control"));
		},
		registerUser() {
			eventEmitter.$emit("open-registration", {});
			this.closeLogin();
		},
		closeLogin() {
			eventEmitter.$emit("hide-login-form", {});
		},
	},
};
</script>

<style></style>
