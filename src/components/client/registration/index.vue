<template>
	<v-dialog v-model="registrationDialog" persistent max-width="800px">
		<v-card>
			<v-toolbar dark elevation="1">
				<v-toolbar-title lass="headline">Registration Form</v-toolbar-title>

				<v-spacer></v-spacer>
			</v-toolbar>

			<v-card-text>
				<v-container>
					<form>
						<v-row>
							<v-col md="6">
								<label for>Firstname</label>
								<v-text-field
									v-model="
										newUser.firstname
									"
									@input="
										$v.newUser.firstname.$touch()
									"
									@blur="
										$v.newUser.firstname.$touch()
									"
									:error-messages="
										firstnameErrors
									"
									placeholder="Firstname"
									append-icon="mdi-account-circle"
									solo
									autofocus
								></v-text-field>
							</v-col>
							<v-col md="6">
								<label for>Lastname</label>
								<v-text-field
									v-model="newUser.lastname"
									@input="
										$v.newUser.lastname.$touch()
									"
									@blur="
										$v.newUser.lastname.$touch()
									"
									:error-messages="
										lastnameErrors
									"
									solo
									placeholder="Firstname"
									append-icon="mdi-account-circle"
								></v-text-field>
							</v-col>
							<v-col md="6">
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
							<v-col md="6">
								<label for>Confirm Password</label>
								<v-text-field
									type="password"
									v-model="
										newUser.confirmPassword
									"
									@input="
										$v.newUser.confirmPassword.$touch()
									"
									@blur="
										$v.newUser.confirmPassword.$touch()
									"
									:error-messages="
										confirmPasswordErrors
									"
									solo
									placeholder="Confirm Password"
									append-icon="mdi-lock"
								></v-text-field>
							</v-col>
							<v-col md="6">
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
								></v-text-field>
							</v-col>
							<v-col md="6">
								<label for>Phone</label>
								<v-text-field
									v-model="newUser.phone"
									@input="
										$v.newUser.phone.$touch()
									"
									@blur="
										$v.newUser.phone.$touch()
									"
									:error-messages="
										phoneErrors
									"
									solo
									placeholder="Phone"
									append-icon="mdi-phone"
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<label for>Address</label>
								<v-text-field
									v-model="newUser.address"
									placeholder="Complete Address"
									solo
									append-icon="mdi-map-marker"
								></v-text-field>
							</v-col>
						</v-row>
					</form>
				</v-container>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="pa-5">
				<v-spacer></v-spacer>
				<v-btn class="pl-5 pr-5" dark @click="closeRegistrationDialog">Close</v-btn>
				<v-btn class="pl-5 pr-5" dark @click="submit">Submit</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, email, sameAs } = require("vuelidate/lib/validators");

import { eventEmitter } from "Event";

export default {
	name: "client-registration",
	props: ["dialog"],
	mixins: [validationMixin],
	validations: {
		newUser: {
			firstname: { required },
			lastname: { required },
			password: { required },
			confirmPassword: {
				required,
				sameAsPassword: sameAs("password"),
			},
			email: { required, email },
			phone: { required },
		},
	},
	data() {
		return {
			newUser: {
				firstname: "",
				lastname: "",
				password: "",
				confirmPassword: "",
				email: "",
				phone: "",
				address: "",
			},
		};
	},
	computed: {
		registrationDialog() {
			return this.dialog;
		},
		firstnameErrors() {
			const errors = [];
			if (!this.$v.newUser.firstname.$dirty) return errors;
			!this.$v.newUser.firstname.required && errors.push("Firstname is required.");
			return errors;
		},
		lastnameErrors() {
			const errors = [];
			if (!this.$v.newUser.lastname.$dirty) return errors;
			!this.$v.newUser.lastname.required && errors.push("Lastname is required.");
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.newUser.password.$dirty) return errors;
			!this.$v.newUser.password.required && errors.push("Password is required.");

			return errors;
		},
		confirmPasswordErrors() {
			const errors = [];
			if (!this.$v.newUser.confirmPassword.$dirty) return errors;

			!this.$v.newUser.confirmPassword.required && errors.push("Confirm Password is required.");

			!this.$v.newUser.confirmPassword.sameAsPassword && errors.push("Confirm password should be same as password above.");
			return errors;
		},
		emailErrors() {
			const errors = [];
			if (!this.$v.newUser.email.$dirty) return errors;
			!this.$v.newUser.email.required && errors.push("Email is required.");
			!this.$v.newUser.email.email && errors.push("Provide valid email.");
			return errors;
		},
		phoneErrors() {
			const errors = [];
			if (!this.$v.newUser.phone.$dirty) return errors;
			!this.$v.newUser.phone.required && errors.push("Phone number is required.");
			return errors;
		},
	},
	methods: {
		showLoginForm() {
			eventEmitter.$emit("display-login-form", {});
		},
		submit() {
			this.$v.$touch();
			if (this.$v.$pending || this.$v.$error) return;

			delete this.newUser.confirmPassword;

			this.$store
				.dispatch("Customer/submitClientRegistration", this.newUser)
				.then((res) => {
					this.closeRegistrationDialog();
					this.showLoginForm();
				})
				.catch((err) => {
					console.log(err, "Error client registration.");
				});
		},

		closeRegistrationDialog() {
			eventEmitter.$emit("close-dialog-registration", {});
		},
		// displayRegistrationFrom() {

		//   eventEmitter.$on("display-registration-form", () => {
		//     this.dialog = true;
		//     console.log(this.dialog, "KJJJKHKJKH");
		//   });
		// },
	},
	created() {
		// this.displayRegistrationFrom();
	},
};
</script>

<style></style>
