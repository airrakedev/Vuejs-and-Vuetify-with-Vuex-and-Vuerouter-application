<template>
	<v-container background-color="grey" class="ma-#">
		<v-row align="center" justify="center">
			<v-col>
				<v-card elevation="1">
					<v-row>
						<v-col cols="1" md="2" sm="2" justify="center" align="center">
							<v-card color="pink lighten-1" class="ml-3 card-icon" dark elevation="1">
								<v-icon large>mdi-movie-roll</v-icon>
							</v-card>
						</v-col>
						<v-col>
							<h2 class="pt-5 blue-grey--text">List of Rented Movies</h2>
						</v-col>
					</v-row>
					<v-card-title class="">
						<v-spacer></v-spacer>
						<v-row no-gutters>
							<v-col class="">
								<v-text-field
									v-model="search"
									append-icon="mdi-magnify"
									label="Search"
									class="font-weight-light"
									background-color="grey lighten-4"
									light
									color="primary"
									hide-details
									clearable
									solo
									rounded
								></v-text-field>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text class="mt-5 pa-1">
						<v-row class="pa-0 pt-0">
							<v-col class="pa-5 pt-0">
								<v-data-table :headers="headers" :items="movies" sort-by="calories" class="font-weight-light" id="customBorder"></v-data-table>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import store from "Store";
import { mapGetters } from "vuex";
export default {
	name: "MovieRecord",
	data() {
		return {
			dialog: false,
			search: "",
			headers: [
				{
					text: "Movie",
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text pt-5 pb-5",
					align: "start",
					sortable: false,
					value: "name",
				},
				{
					text: "Genre",
					value: "calories",
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text",
				},
				{
					text: "Rent",
					value: "fat",
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text",
				},
			],

			movies: [],
			editedIndex: -1,
		};
	},
	computed: {
		...mapGetters("Customer", {
			clientId: "getClientId",
		}),
		allMovies() {
			const getAllMovies = store.getters["Admin/getAllMovies"];
			return getAllMovies;
		},
	},
	methods: {
		async getAllMovies() {
			const params = {
				limit: 5,
				page: 1,
			};
			const movies = await store.dispatch("Admin/gettingAllMovies", params);
		},
		async getMyCheckout() {
			const params = {
				limit: 500,
				page: 1,
				clientId: this.clientId,
				// id: "5f8325e35acc344bcb037aec",
			};
			store.dispatch("Customer/getMyCheckOut", params);
		},
	},
	created() {
		this.getAllMovies();
		this.getMyCheckout();
	},
};
</script>

<style scoped>
.v-data-table .v-data-table__wrapper table,
.v-data-table table,
#customBorder {
	border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-text-field--solo-inverted.v-input--is-focused > .v-input__control > .v-input__slot input {
	color: #000 !important;
}
.card-icon {
	margin-top: -30px;
	padding-top: 35px;
	padding-bottom: 35px;
}
</style>