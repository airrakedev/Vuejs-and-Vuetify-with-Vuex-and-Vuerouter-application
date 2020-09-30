<template>
	<v-container background-color="grey" class="mt-5 ml-5" fluid>
		<v-row align="center" justify="center">
			<v-col>
				<v-card class="mx-auto pa-4 pt-0" elevation="1">
					<v-row>
						<v-col cols="1" md="2" justify="center" align="center">
							<v-card color="pink lighten-1" class="card-icon" dark elevation="5">
								<v-icon large>mdi-movie-roll</v-icon>
							</v-card>
						</v-col>
						<v-col>
							<h2 class="pt-5 grey--text">List of Rented Movies</h2>
						</v-col>
					</v-row>
					<v-card-title class="mr-5 pr-5">
						<v-spacer></v-spacer>
						<v-row>
							<v-col class="pr-5">
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
					<v-card-text class="pa-5">
						<v-row class="pa-5 pt-0">
							<v-col class="pa-5 pt-0">
								<v-data-table
									:headers="headers"
									:items="movies"
									sort-by="calories"
									class="font-weight-light"
									id="customBorder"
								></v-data-table>
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
export default {
	name: "MovieRecord",
	data() {
		return {
			dialog: false,
			search: "",
			headers: [
				{
					text: "Movie",
					class: "font-weight-regular subtitle-1 grey lighten-4 pt-5 pb-5 primary--text pt-5 pb-5",
					align: "start",
					sortable: false,
					value: "name",
				},
				{
					text: "Genre",
					value: "calories",
					class: "font-weight-regular subtitle-1 grey lighten-4 pt-5 pb-5 primary--text",
				},
				{
					text: "Rent",
					value: "fat",
					class: "font-weight-regular subtitle-1 grey lighten-4 pt-5 pb-5 primary--text",
				},
			],

			movies: [],
			editedIndex: -1,
			editedItem: {
				name: "",
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0,
			},
			defaultItem: {
				name: "",
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0,
			},
		};
	},
	computed: {
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
			console.log("FE Lapos");
		},
	},
	created() {
		this.getAllMovies();
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