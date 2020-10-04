<template>
	<v-container background-color="grey" class="">
		<v-row align="start" justify="center">
			<v-col lg="8" md="7" sm="12">
				<v-card class="mx-auto pa-5" elevation="1">
					<h2 class="blue--text mb-5">Billing Details</h2>
					<v-row>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text font-weight-bold">Firstname</label>
							<v-text-field class="mt-1 font-weight-bold" placeholder="Firstname" v-model="profile.firstname" solo-inverted flat></v-text-field>
						</v-col>

						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text font-weight-bold">Lastname</label>

							<v-text-field class="mt-1 font-weight-bold" placeholder="Lastname" v-model="profile.lastname" solo-inverted flat></v-text-field>
						</v-col>

						<v-col cols="12" md="12" class="pt-0 pb-0">
							<label for class="blue-grey--text font-weight-bold">Email address</label>

							<v-text-field class="mt-1 font-weight-bold" placeholder="email" v-model="profile.email" solo-inverted flat></v-text-field>
						</v-col>

						<v-col cols="12" md="12" class="pt-0 pb-0">
							<label for class="blue-grey--text font-weight-bold">Address</label>
							<v-text-field class="mt-1 font-weight-bold" placeholder="address" v-model="profile.address" solo-inverted flat></v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text font-weight-bold">Country</label>
							<v-text-field class="mt-1 font-weight-bold" placeholder="Country" solo-inverted flat></v-text-field>
						</v-col>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text font-weight-bold">Zipcode</label>
							<v-text-field class="mt-1 font-weight-bold" placeholder="Zipcode" solo-inverted flat></v-text-field>
						</v-col>
					</v-row>
					<h2 class="blue--text mt-5 mb-5">Payment Method</h2>
					<v-row justify="center">
						<v-col cols="12" md="12" class="pt-0 pb-5">
							<v-expansion-panels v-model="panel" multiple tile accordion>
								<v-expansion-panel>
									<v-expansion-panel-header hide-actions @click="panel = []">
										<h3 class="blue--text">
											<span class="mr-2"> <v-icon color="blue darken-1"> mdi-credit-card-outline </v-icon> </span>Credit Card
										</h3>
									</v-expansion-panel-header>
									<v-expansion-panel-content>
										<v-row>
											<v-col cols="12" md="12" class="pt-0 pb-0">
												<label for class="blue-grey--text font-weight-bold">Card Number</label>
												<v-text-field
													append-icon="mdi-credit-card-outline"
													class="mt-1 font-weight-bold"
													placeholder="0000 0000 0000 0000"
													solo-inverted
													flat
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="6" md="6" class="pt-0 pb-0">
												<label for class="blue-grey--text font-weight-bold">Month</label>
												<v-menu
													ref="menu"
													v-model="menu"
													:close-on-content-click="false"
													:return-value.sync="date"
													transition="scale-transition"
													offset-y
													max-width="290px"
													min-width="290px"
												>
													<template v-slot:activator="{ on, attrs }">
														<v-text-field
															v-model="date"
															label="Picker in menu"
															append-icon="mdi-calendar-month-outline"
															readonly
															v-bind="attrs"
															v-on="on"
															solo-inverted
															class="font-weight-bold"
															flat
														></v-text-field>
													</template>
													<v-date-picker v-model="date" type="month" no-title scrollable>
														<v-spacer></v-spacer>
														<v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
														<v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
													</v-date-picker>
												</v-menu>
											</v-col>

											<v-col cols="6" md="6" class="pt-0 pb-0">
												<label for class="blue-grey--text font-weight-bold">Security Code</label>
												<v-text-field class="mt-1 font-weight-bold" placeholder="Three Digits" solo-inverted flat></v-text-field>
											</v-col>
										</v-row>
									</v-expansion-panel-content>
								</v-expansion-panel>
								<v-expansion-panel>
									<v-expansion-panel-header hide-actions @click="panel = []">
										<h3 class="blue--text">
											<span class="mr-2">
												<v-icon color="blue darken-1"> mdi-pandora </v-icon>
											</span>
											Paypal
										</h3>
									</v-expansion-panel-header>
									<v-expansion-panel-content>
										<v-row>
											<v-col>
												<p class="font-weight-bold blue-grey--text">
													You'll pop off to PayPal quickly and payment will be token. We will then confirm your order.
												</p>
												<v-btn height="50" width="200" color="warning" class="font-weight-bold"><v-icon> mdi-pandora </v-icon> Pay with Paypal </v-btn>
											</v-col>
										</v-row>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col lg="4" md="5" sm="12">
				<v-card class="mx-auto pa-4" elevation="1">
					<h2 class="blue--text mb-5">Order Summary</h2>
					<v-row no-gutters>
						<v-col cols="12">
							<v-list v-if="isMovieAvailable">
								<v-list-item class="pl-1 pr-1" v-for="(movie, i) in selectedMovies" :key="i">
									<v-list-item-action class="mr-2 font-weight-bold blue-grey--text">
										{{ movie.qty }}
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title class="blue-grey--text font-weight-bold">
											{{ movie.title }}
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action class="mt-0 mb-0 ml-0">
										<v-list-item class="pl-2 pr-1">
											<!-- <v-list-item-action></v-list-item-action> -->
											<v-spacer></v-spacer>

											<v-list-item-action>
												<v-btn icon @click="updateMyMovieList(movie._id, 'minus')">
													<v-icon dark> mdi-minus </v-icon>
												</v-btn>
											</v-list-item-action>
											<v-list-item-action>
												<v-btn icon @click="updateMyMovieList(movie._id, 'add')">
													<v-icon small dark>mdi-plus</v-icon>
												</v-btn>
											</v-list-item-action>

											<v-list-item-action class="ml-0">
												<!-- <v-list-item-action-text>P 23</v-list-item-action-text> -->
												<span class="font-weight-bold teal--text">
													{{ movie.rentPrice }}
												</span>
											</v-list-item-action>
										</v-list-item>
									</v-list-item-action>
								</v-list-item>
								<!-- <v-divider></v-divider> -->
							</v-list>

							<v-list v-if="!isMovieAvailable">
								<v-list-item class="text-center">
									<v-list-item-content>
										<v-list-item-title class="blue-grey--text font-weight-bold">
											No selected movies. <router-link :to="{ name: 'main-dashboard' }">Select here</router-link>
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
							<v-list v-if="isMovieAvailable">
								<v-list-item class="pl-1 pr-1">
									<v-list-item-content class="font-weight-bold teal--text pt-0 pb-0">
										<h3>Grand Total</h3>
									</v-list-item-content>
									<v-spacer></v-spacer>
									<v-list-item-action class="font-weight-bold warning--text pt-0 pb-0">
										<h3>P 500.00</h3>
									</v-list-item-action>
								</v-list-item>
							</v-list>
							<v-divider></v-divider>
						</v-col>

						<v-col cols="12 pl-5 pr-5">
							<p class="mt-3 font-weight-bold blue-grey--text">By clicking the button, you agree to the Terms and Conditions</p>
							<v-btn :disabled="!isMovieAvailable" class="purchase-btn mt-3 mb-3 font-weight-bold" block outlined tile color="cyan darken-1"> Purchase Now </v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import store from "Store";
import numeral from "numeral";
import { mapGetters } from "vuex";
export default {
	name: "clientCheckOutPage",
	data() {
		return {
			panel: [0],
			date: new Date().toISOString().substr(0, 7),
			menu: false,
			modal: false,
		};
	},
	methods: {
		checkQuantity(id) {
			let myListing = store.getters["Customer/getClientList"];
			let addedMovie = myListing.filter((item) => item._id == id);
			let selectedMovieQty = addedMovie[0].qty;

			let allMovies = store.getters["Admin/getAllMovies"].docs;
			let selectedMovie = allMovies.filter((item) => item._id == id);
			let movieInStock = selectedMovie[0].inStock;

			return selectedMovieQty == movieInStock || selectedMovieQty > movieInStock;
		},
		async updateMyMovieList(id, action) {
			if (action === "add") {
				if (this.checkQuantity(id)) {
					return (this.snackbar = true);
				}
			}
			await store.commit("Customer/ADJUST_MY_MOVIE_LIST", { id, action });
		},
	},
	computed: {
		...mapGetters({
			profile: "Customer/getClientProfile",
			selectedMovies: "Customer/getClientList",
			isMovieAvailable: "Customer/getIfIHaveMovies",
		}),
	},
};
</script>

<style scoped>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
	border: unset !important;
}
.purchase-btn {
	border-width: 2px;
}
.v-application--is-ltr .v-expansion-panel-header__icon {
	display: none !important;
}
.v-text-field .v-input__slot {
	margin-bottom: 0px !important;
}
</style>
