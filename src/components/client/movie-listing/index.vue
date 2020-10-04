<template>
	<v-card>
		<v-toolbar dark flat>
			<v-toolbar-title>My List</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon @click="closeMe">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>

		<v-list two-line subheader>
			<v-list-item v-for="item in allMyMovieList" :key="item._id">
				<v-list-item-action class="mr-2">
					<v-list-item-title v-text="item.qty"></v-list-item-title>
				</v-list-item-action>

				<v-list-item-content class="ml-4 mr-4">
					<v-list-item-title color="primary">{{ item.title }}</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action class="ml-4 mr-4">
					<v-list-item-action-text>₱&nbsp;{{ item.rentPrice | formatNumber }}</v-list-item-action-text>
				</v-list-item-action>

				<v-list-item-action class="ml-4 mr-4">
					<v-list-item-action-text color="primary">₱&nbsp;{{ getTotalRentPrice(item.qty, item.rentPrice) | formatNumber }}</v-list-item-action-text>
				</v-list-item-action>

				<v-list-item-action class="ml-0">
					<v-btn-toggle dark dense group>
						<v-btn icon small color="grey" @click="updateMyMovieList(item._id, 'minus')">
							<v-icon color="grey" small>mdi-minus</v-icon>
						</v-btn>
						<v-btn icon small @click="updateMyMovieList(item._id, 'add')">
							<v-icon color="grey" small>mdi-plus</v-icon>
						</v-btn>
						<v-btn icon small @click="updateMyMovieList(item._id, 'delete')">
							<v-icon color="pink" small>mdi-close</v-icon>
						</v-btn>
					</v-btn-toggle>
				</v-list-item-action>
			</v-list-item>

			<v-list-item v-if="!allMyMovieList.length">
				<v-list-item-action class="mr-2">
					<v-list-item-title>You have not selected a movie.</v-list-item-title>
				</v-list-item-action>
			</v-list-item>

			<v-divider></v-divider>
			<!-- Total -->
			<v-list-item v-if="allMyMovieList.length">
				<v-btn color="warning" class="ma-2 white--text caption font-weight-bold" @click="checkout()">Checkout</v-btn>

				<v-spacer></v-spacer>
				<v-list-item-content>
					<v-list-item-title class="font-weight-bold body-1">Grand Total</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-list-item-title color="primary" class="font-weight-bold">₱&nbsp;{{ grandTotalPrice | formatNumber }}</v-list-item-title>
				</v-list-item-action>
			</v-list-item>
		</v-list>
	</v-card>
</template>

<script>
import store from "Store";
import numeral from "numeral";
export default {
	name: "client-movie-listing",
	data() {
		return {};
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
					return this.showSnackbar();
				}
			}
			await store.commit("Customer/ADJUST_MY_MOVIE_LIST", { id, action });
		},
		closeMe() {
			this.$emit("close-me", {});
		},
		getTotalRentPrice(qty, price) {
			return parseFloat(qty * price);
		},
		checkout() {
			this.$router.push({ name: "ClientCheckout" });
		},
		showSnackbar() {
			let stateStatus = {
				status: true,
				color: "warning",
				text: "Quantity exceeded to it's stock limit.",
			};

			store.commit("Global/UPDATE_SNACKBAR", stateStatus);
		},
	},
	computed: {
		allMyMovieList() {
			return store.getters["Customer/getClientList"];
		},
		grandTotalPrice() {
			return this.allMyMovieList.reduce((accumulator, currentValue) => parseFloat(currentValue.qty * currentValue.rentPrice) + accumulator, 0);
		},
	},
	filters: {
		formatNumber(val) {
			if (!val) return "";
			return numeral(val).format("0.00");
		},
	},
};
</script>

<style scoped>
.v-application .body-1 {
	font-family: "Quicksand", sans-serif !important;
}
</style>
