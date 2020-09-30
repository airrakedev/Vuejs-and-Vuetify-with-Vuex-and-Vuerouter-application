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
					<v-list-item-title color="primary">{{item.title}}</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action class="ml-4 mr-4">
					<v-list-item-action-text>₱&nbsp;{{item.rentPrice | formatNumber}}</v-list-item-action-text>
				</v-list-item-action>

				<v-list-item-action class="ml-4 mr-4">
					<v-list-item-action-text
						color="primary"
					>₱&nbsp;{{getTotalRentPrice(item.qty,item.rentPrice) | formatNumber}}</v-list-item-action-text>
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
				<v-list-item-content class="mr-4 pr-3">
					<v-btn color="warning" width="60" class="ma-2 white--text">Checkout</v-btn>
				</v-list-item-content>
				<v-list-item-content>
					<v-list-item-title>Grand Total</v-list-item-title>
				</v-list-item-content>
				<v-spacer></v-spacer>
				<v-list-item-action>
					<v-list-item-title color="primary">₱&nbsp;{{grandTotalPrice | formatNumber}}</v-list-item-title>
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
		async updateMyMovieList(id, action) {
			console.log(action, "action");
			await store.commit("Customer/ADJUST_MY_MOVIE_LIST", { id, action });
		},
		closeMe() {
			this.$emit("close-me", {});
		},
		getTotalRentPrice(qty, price) {
			return parseFloat(qty * price);
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
</style>
