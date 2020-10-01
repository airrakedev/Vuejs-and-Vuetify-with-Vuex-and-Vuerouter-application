<template>
	<v-col class="pa-5">
		<v-row class="pa-5">
			<v-col cols="8">
				<v-card class="mx-auto pb-5" elevation="2">
					<v-container fluid class="pb-0">
						<v-row>
							<v-col cols="2" md="3" sm="3" justify="center" align="center">
								<v-card color="cyan lighten-1" class="card-icon" dark>
									<v-icon large>mdi-account-outline</v-icon>
								</v-card>
							</v-col>
							<v-col class="pt-0">
								<v-list-item class="pl-0">
									<v-list-item-content>
										<v-list-item-title class="font-weight-light title">
											Update profile --
											<span class="body-2 font-weight-light">Complete your profile</span>
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-col>
						</v-row>

						<v-row>
							<v-col class="pb-0">
								<v-form ref="form" class="pl-5 pr-5">
									<v-row>
										<v-col class="ml-1 pb-0">
											<label for class="blue-grey--text font-weight-bold">Firstname</label>
											<v-text-field
												class="mt-1 body-2"
												placeholder="Firstname"
												v-model="userData.first_name"
												:error-messages="userFirstnameErrors"
												@input="$v.userData.first_name.$touch()"
												@blur="$v.userData.first_name.$touch()"
												solo
											></v-text-field>
										</v-col>
										<v-col class="mr-1 pb-0">
											<label for class="blue-grey--text font-weight-bold">Lastname</label>
											<v-text-field
												class="body-2 mt-1"
												placeholder="Lastname"
												v-model="userData.last_name"
												:error-messages="userLastnameErrors"
												@input="$v.userData.last_name.$touch()"
												@blur="$v.userData.last_name.$touch()"
												solo
												required
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col class="ml-1 pb-0">
											<label for class="blue-grey--text font-weight-bold">Email</label>
											<v-text-field
												class="mt-1 body-2"
												placeholder="Email"
												v-model="userData.email"
												:error-messages="userEmailErrors"
												@input="$v.userData.email.$touch()"
												@blur="$v.userData.email.$touch()"
												solo
												required
											></v-text-field>
										</v-col>
										<v-col class="mr-1 pb-0">
											<label for class="blue-grey--text font-weight-bold">Phone</label>
											<v-text-field class="mt-1 body-2" placeholder="Phone Number" v-model="userData.profile.phone" solo required></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col class="pb-0">
											<label for class="blue-grey--text font-weight-bold">Company Name</label>
											<v-text-field
												class="mt-1 body-2"
												placeholder="Company name"
												v-model="userData.profile.companyName"
												:error-messages="userCompanyNameErrors"
												@input="$v.userData.profile.companyName.$touch()"
												@blur="$v.userData.profile.companyName.$touch()"
												solo
											></v-text-field>
										</v-col>
									</v-row>

									<h2 class="mt-5 mb-5 blue-grey--text">Update your complete address</h2>
									<!-- USERS ADDRESS -->
									<v-row>
										<v-col cols="5" class="pb-0">
											<label for class="blue-grey--text font-weight-bold">Country</label>

											<v-select
												v-model="countryValue"
												:items="defaultCountry"
												item-text="name"
												item-value="id"
												:error-messages="userCountryErrors"
												@input="$v.countryValue.$touch()"
												@blur="$v.countryValue.$touch()"
												class="mt-1 body-2"
												placeholder="Country"
												solo
											></v-select>
										</v-col>
										<v-col cols="7" class="pb-0">
											<label for class="blue-grey--text font-weight-bold">State</label>

											<v-select
												v-model="stateValue"
												:items="getStates"
												item-text="name"
												item-value="id"
												:error-messages="userStateErrors"
												@input="$v.stateValue.$touch()"
												@blur="$v.stateValue.$touch()"
												placeholder="State"
												class="mt-1 body-2"
												solo
											></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="3" class="pb-0">
											<label for class="blue-grey--text font-weight-bold">City</label>

											<v-select
												no-data-text="Please select state address first."
												v-model="cityValue"
												:items="getCities"
												item-text="name"
												item-value="id"
												:error-messages="userCityErrors"
												class="mt-1 body-2"
												placeholder="City"
												solo
											></v-select>
										</v-col>
										<v-col cols="6" class="pb-0">
											<label for class="blue-grey--text font-weight-bold">Street Address</label>
											<v-text-field
												class="mt-1 body-2"
												placeholder="Street address"
												v-model="userData.profile.address.street"
												:error-messages="userStreetErrors"
												@input="$v.userData.profile.address.street.$touch()"
												@blur="$v.userData.profile.address.street.$touch()"
												solo
												required
											></v-text-field>
										</v-col>
										<v-col cols="3" class="pb-0">
											<label for class="blue-grey--text font-weight-bold">Zipcode</label>
											<v-text-field
												placeholder="Zipcode"
												class="mt-1 body-2"
												v-model="userData.profile.address.zipcode"
												:error-messages="userZipcodeErrors"
												@input="$v.userData.profile.address.zipcode.$touch()"
												@blur="$v.userData.profile.address.zipcode.$touch()"
												solo
												required
											></v-text-field>
										</v-col>
									</v-row>
								</v-form>
							</v-col>
						</v-row>
					</v-container>
					<v-toolbar class="pr-5" flat>
						<v-spacer></v-spacer>

						<v-btn color="cyan" height="40" width="160" dark @click="updateProfile">Update Profile</v-btn>
					</v-toolbar>
				</v-card>
			</v-col>
			<v-col cols="4" align="center" justify="center">
				<v-card class="pb-5">
					<v-row>
						<v-col cols="12">
							<v-avatar size="120" class="profile-image">
								<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
							</v-avatar>
						</v-col>
						<v-col cols="12" class="pt-0">
							<h3 class="font-weight-light grey--text">Administrator</h3>
							<h2 class="mt-0 mb-5 font-weight-light indigo--text">Jose Aldo</h2>
							<v-btn class="mt-0 font-weight-bold" height="40" width="160" rounded color="cyan lighten-1" dark>Upload Profile</v-btn>
						</v-col>
					</v-row>
				</v-card>
				<v-row class="mt-5">
					<v-col>
						<v-card class="pb-5 mt-5">
							<v-row justify="center" class="pl-2 pb-2">
								<v-col cols="3" md="6" sm="6" align="center" class="pl-5">
									<v-card color="pink lighten-1" class="card-icon" dark>
										<v-icon large>mdi-pencil-lock-outline</v-icon>
									</v-card>
								</v-col>
								<v-col cols="9" md="6" sm="6" class="pr-5" align="center">
									<span class="blue-grey--text body-2">Need to change your password? No problem.</span>
								</v-col>
								<h3 class="font-weight-medium blue-grey--text mt-4 mb-5">Just click the link below to get started.</h3>
								<router-link :to="{ name: 'userChangePassword' }">
									<v-btn class="font-weight-bold" height="40" width="180" rounded color="cyan lighten-1" dark>Change Password</v-btn>
								</router-link>
							</v-row>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, email, numeric } = require("vuelidate/lib/validators");
import _ from "lodash";
import csc from "country-state-city";
import store from "Store";
export default {
	name: "UserProfilePage",
	mixins: [validationMixin],
	validations() {
		return {
			userData: {
				first_name: { required },
				last_name: { required },
				email: { required, email },

				profile: {
					companyName: { required },
					phone: { required },
					address: {
						street: { required },
						zipcode: { required, numeric },
					},
				},
			},
			cityValue: { required },
			stateValue: { required },
			countryValue: { required },
		};
	},
	data() {
		return {
			defaultCountryId: "231",

			userData: {
				first_name: "",
				last_name: "",
				email: "",

				profile: {
					companyName: "",
					phone: "",
					address: {
						street: "",
						city: "",
						state: "",
						zipcode: "",
						country: "",
					},
				},
			},
		};
	},
	mounted() {
		// let count = csc.getCityById(this.userAddress.address.state.toString());
		// console.log(count, "userProfile");
		// console.log(this.getStates, "userAddress");
		// LOAD ALL USERS RECORDS
		this.completeUserData();
	},
	computed: {
		userProfile() {
			// return store.getters["AuthUser/userProfileData"];
			return {};
		},
		userAddress() {
			// return store.getters["AuthUser/getUserProfile"];
			return {};
		},

		countryValue: {
			get: function () {
				return {
					id: this.defaultCountryId,
				};
			},
			set: function (id) {
				this.userData.profile.address.country = id;
			},
		},
		stateValue: {
			get: function () {
				let state = {};

				if (this.userData.profile.address.state) {
					state = {
						id: this.userData.profile.address.state.toString(),
					};
				}

				return state;
			},
			set: function (id) {
				this.userData.profile.address.state = id;
			},
		},
		cityValue: {
			get: function () {
				let state = {};
				if (this.userAddress.address) {
					state = {
						id: this.userAddress.address.city.toString(),
					};
				}
				return state;
			},
			set: function (id) {
				this.userData.profile.address.city = id;
			},
		},
		defaultCountry() {
			let count = csc.getCountryById(this.defaultCountryId);
			let set = new Set();
			set.add(count);
			return Array.from(set);
		},
		getStates() {
			let country = this.userData.profile.address.country ? this.userData.profile.address.country : this.defaultCountryId;
			return csc.getStatesOfCountry(country.toString());
		},
		getCities() {
			// let city = [];
			let state = this.userAddress.address ? this.userAddress.address.state : this.userData.profile.address.state;

			// if (this.userAddress.address) {
			//     let count = csc.getCityById(state.toString());
			//     let set = new Set();
			//     set.add(count);
			//     return Array.from(set);
			// } else {
			//     return csc.getCitiesOfState(state.toString());
			// }

			return csc.getCitiesOfState(this.userData.profile.address.state.toString());
		},
		userFirstnameErrors() {
			const errors = [];
			if (!this.$v.userData.first_name.$dirty) return errors;
			!this.$v.userData.first_name.required && errors.push("User's firstname is required.");
			return errors;
		},
		userLastnameErrors() {
			const errors = [];
			if (!this.$v.userData.last_name.$dirty) return errors;
			!this.$v.userData.last_name.required && errors.push("User's lastname is required.");
			return errors;
		},
		userCompanyNameErrors() {
			const errors = [];
			if (!this.$v.userData.profile.companyName.$dirty) return errors;
			!this.$v.userData.profile.companyName.required && errors.push("User's company name is required.");
			return errors;
		},
		userAccountTypeErrors() {
			const errors = [];
			if (!this.$v.userData.account_type.$dirty) return errors;
			!this.$v.userData.account_type.required && errors.push("User's account type is required.");
			return errors;
		},
		userEmailErrors() {
			const errors = [];
			if (!this.$v.userData.email.$dirty) return errors;
			!this.$v.userData.email.required && errors.push("User's email is required.");
			!this.$v.userData.email.email && errors.push("User's email must be valid.");
			return errors;
		},
		userStreetErrors() {
			const errors = [];
			if (!this.$v.userData.profile.address.street.$dirty) return errors;
			!this.$v.userData.profile.address.street.required && errors.push("User's address is required.");
			return errors;
		},
		userCityErrors() {
			const errors = [];
			if (!this.$v.cityValue.$dirty) return errors;
			!this.$v.cityValue.required && errors.push("User's city address is required.");
			return errors;
		},
		userStateErrors() {
			const errors = [];
			if (!this.$v.stateValue.$dirty) return errors;
			!this.$v.stateValue.required && errors.push("User's state address is required.");
			return errors;
		},
		userZipcodeErrors() {
			const errors = [];
			if (!this.$v.userData.profile.address.zipcode.$dirty) return errors;
			!this.$v.userData.profile.address.zipcode.required && errors.push("User's zipcode is required.");
			!this.$v.userData.profile.address.zipcode.numeric && errors.push("Only valid zipcode. eg.(90210)");
			return errors;
		},
		userCountryErrors() {
			const errors = [];
			if (!this.$v.countryValue.$dirty) return errors;
			!this.$v.countryValue.required && errors.push("User's country is required");
			return errors;
		},
	},
	methods: {
		completeUserData() {
			let userData = {
				first_name: this.userProfile.first_name,
				last_name: this.userProfile.last_name,
				email: this.userProfile.email,
				profile: {
					companyName: this.userAddress.companyName ? this.userAddress.companyName : "",
					phone: this.userAddress.phone ? this.userAddress.phone : "",
					address: {
						street: this.userAddress.address ? this.userAddress.address.street : "",
						city: this.userAddress.address ? this.userAddress.address.city : "",
						state: this.userAddress.address ? this.userAddress.address.state : "",
						zipcode: this.userAddress.address ? this.userAddress.address.zipcode : "",
						country: this.userAddress.address ? this.userAddress.address.country : "",
					},
				},
			};

			this.userData = userData;
		},
		updateProfile() {
			this.$v.$touch();
			if (this.$v.$pending || this.$v.$error) return;

			this.userData.profile.address.country = _.get(this.countryValue, "id");
			this.userData.profile.address.state = _.get(this.stateValue, "id");
			this.userData.profile.address.city = _.get(this.cityValue, "id");

			parseInt(this.userData.profile.address.country, 10);
			parseInt(this.userData.profile.address.state, 10);
			parseInt(this.userData.profile.address.city, 10);
			parseInt(this.userData.profile.address.zipcode, 10);

			console.log(this.userData, "nisolod");
			// SUBMIT UPDATED PROFILE
			store
				.dispatch("AuthUser/updateProfile", this.userData)
				.then((res) => {
					if (!res.data.errors) {
						console.log(res, "Update Success");
						this.completeUserData();
					}
				})
				.catch((err) => console.log(err, "Unable to update your profile from profile page"));
		},
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
}

.profile-image {
	margin-top: -40px !important;
}
.card-icon {
	margin-top: -40px;
	padding-top: 35px;
	padding-bottom: 35px;
}
</style>
