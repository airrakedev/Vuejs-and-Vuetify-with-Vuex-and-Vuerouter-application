<template>
	<Modal :show="registrationDialog">
		<template #title>
			<v-toolbar dark elevation="0">
				<v-toolbar-title class="font-weight-bold">Create your account</v-toolbar-title>

				<v-spacer></v-spacer>
			</v-toolbar>
		</template>

		<!-- <v-card-text class="pb-0">
			<v-container class="pb-0">
				<form @submit.enter.prevent="submit">
					<v-row>
						<template v-for="field in registrationFields">
							<v-col cols="12" md="6" :key="field.id">
								<label for class="blue-grey--text font-weight-bold">{{ field.name }}</label>
								<v-text-field
									v-model="newUser[field.id]"
									@input="newUser[field.errorMessage] ? $v.newUser[field.id].$touch() : ''"
									@blur="newUser[field.errorMessage] ? $v.newUser[field.id].$touch() : ''"
									:rules="[formRulesValidation(field.id)]"
									:placeholder="`${field.name} is required`"
									:append-icon="field.icon"
									solo
									autofocus
								></v-text-field>
							</v-col>
						</template>
					</v-row>

					<v-card-actions class="pa-3">
						<v-spacer></v-spacer>
						<v-btn class="pl-5 pr-5" dark @click="closeRegistrationDialog">Close</v-btn>
						<v-btn type="submit" class="pl-5 pr-5" dark>Submit</v-btn>
					</v-card-actions>
				</form>
			</v-container>
		</v-card-text> -->

		<FormsRegistration ref="registrationForm" :form="newUser" @submit.prevent :key="`Form_${formId}`">
			<template #submitted>
				<v-btn class="pl-5 pr-5" dark @click.prevent="submit">Submit</v-btn>
			</template>
		</FormsRegistration>
	</Modal>
</template>

<script>
// EXTERNAL

import { eventEmitter } from "Event";

// COMPONENT
import Modal from "Components/Modal";
import FormsRegistration from "Components/Forms/FormsRegistration";

export default {
	components: {
		Modal,
		FormsRegistration
	},
	name: "client-registration",
	props: ["dialog"],

	data() {
		return {
			formId: 1,
			newUser: {
				firstname: "",
				lastname: "",
				password: "",
				confirmPassword: "",
				email: "",
				phone: "",
				address: ""
			}
		};
	},
	computed: {
		registrationDialog() {
			return this.dialog;
		}
	},
	methods: {
		showLoginForm() {
			eventEmitter.$emit("display-login-form", {});
		},
		submit() {
			// console.log(this.$refs.registrationForm, "booom");
			try {
				this.$refs.registrationForm
					.submit()
					.then(payload => {
						console.log(payload, "payload");
						this.$store
							.dispatch("Customer/submitClientRegistration", payload)
							.then(res => {
								this.closeRegistrationDialog();
								this.showLoginForm();
							})
							.catch(err => {
								console.log(err, "Error client registration.");
							});
					})
					.catch(error => console.log(error.message, "catch error"));
			} catch (error) {
				console.log(error.message, "totally error");
			}
		},

		closeRegistrationDialog() {
			eventEmitter.$emit("close-dialog-registration", {});
		}
	},
	created() {
		// this.displayRegistrationFrom();
	}
};
</script>

<style></style>
