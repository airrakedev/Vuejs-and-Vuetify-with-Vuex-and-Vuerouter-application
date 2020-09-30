<template>
	<v-content>
		<v-container class="fill-height" fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="8" md="5">
					<v-card class="elevation-2 pa-5">
						<v-row class="admin-login-header pl-1 pr-1 pb-3 pt-0">
							<v-col class="pl-5 pr-5 pb-5 pt-0">
								<v-card class="teal pa-5 text-center" elevation="2">
									<h2 class="text-center white--text pt-5 pb-2">Administrator Login</h2>
									<v-icon class="admin-login-header-icon" color="white">mdi-briefcase-outline</v-icon>
								</v-card>
							</v-col>
						</v-row>
						<!-- <v-toolbar flat color="teal" dark height="80" class="mb-5">
							<v-row>
								<v-col>
									<h2 class="text-center">Administrator Login</h2>
								</v-col>
							</v-row>
						</v-toolbar>-->
						<!-- <v-card-text class="pb-2">
							<v-row align="center">
								<v-flex class="text-center">
									<v-icon class="icon-title" color="pink">mdi-hexagon-slice-6</v-icon>
								</v-flex>
							</v-row>
						</v-card-text>-->
						<v-card-text class="pb-0 pt-0">
							<v-form class="pl-5 pr-5 pt-0">
								<label class="font-weight-bold grey--text">Email</label>
								<v-text-field
									placeholder="email@email.com"
									append-icon="mdi-email-outline"
									solo
									type="text"
									class="mt-1 mb-5"
									v-model="newUser.email"
									@input="$v.newUser.email.$touch()"
									@blur="$v.newUser.email.$touch()"
									:error-messages="emailErrors"
								/>
								<label class="font-weight-bold grey--text">Password</label>
								<v-text-field
									placeholder="Password"
									append-icon="mdi-lock-outline"
									solo
									class="mt-1"
									type="password"
									v-model="newUser.password"
									@input="$v.newUser.password.$touch()"
									@blur="$v.newUser.password.$touch()"
									:error-messages="passwordErrors"
								/>
							</v-form>
						</v-card-text>
						<div class="pb-5 pr-5 pl-5 pb-5" align="center" justify="center">
							<v-btn
								rounded
								height="50"
								width="150"
								dark
								color="teal"
								class="font-weight-bold pl-5 pr-5 mb-0 mt-5"
								@click="submit()"
							>Login</v-btn>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, email } = require("vuelidate/lib/validators");

export default {
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

			this.$store
				.dispatch("Admin/adminLogin", this.newUser)
				.then((res) => {
					console.log(this.$store.getters["Admin/getAdminSessionStatus"], "Admin Login");
				})
				.catch((err) => console.log(err, "From login page error control"));
		},
	},
};
</script>

<style scoped>
.admin-login-header-icon {
	font-size: 60px !important;
}
.admin-login-header {
	margin-top: -60px;
}
.icon-title {
	font-size: 90px !important;
}
</style>