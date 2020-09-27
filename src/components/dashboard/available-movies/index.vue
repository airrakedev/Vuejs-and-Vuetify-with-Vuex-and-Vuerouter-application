<template>
	<v-col>
		<v-row>
			<v-col md="3" v-for="(movie, i) in allMovies" :key="i">
				<v-card dark>
					<v-img position="top center" aspect-ratio="1" :src="getThumbnail(movie.image)"></v-img>
					<v-card-title class="pb-2">{{movie.title}}</v-card-title>
					<v-card-text class="pb-1">
						<div class="font-weight-bold">P {{movie.rentPrice}}</div>
					</v-card-text>
					<v-card-text class="pt-2">
						<v-row align="center" class="mx-0">
							<v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

							<div class="grey--text ml-4">4.5 (413)</div>
						</v-row>

						<div class="font-weight-bold">{{movie.description.slice(0,50)}}</div>
					</v-card-text>
					<v-card-actions dark>
						<!-- <v-btn icon small>
							<v-icon>mdi-thumb-up</v-icon>
						</v-btn>-->
						<v-spacer></v-spacer>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn fab dark @click="addMovie(movie._id)" small color="primary" v-bind="attrs" v-on="on">
									<v-icon dark>mdi-plus</v-icon>
								</v-btn>
							</template>
							<span>Rent Movie</span>
						</v-tooltip>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-snackbar
				:multi-line="imageContain"
				v-model="snackbar"
				:top="imageContain"
				:centered="imageContain"
				color="primary"
				dark
				elevation="24"
			>
				{{ text }}
				<template v-slot:action="{ attrs }">
					<v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
				</template>
			</v-snackbar>
		</v-row>
	</v-col>
</template>

<script>
import store from "Store";
import { eventEmitter } from "Event";

export default {
	name: "available-movies",
	data() {
		return {
			snackbar: false,
			text: "A movie was added to your list.",
			timeout: 2500,
			fav: true,
			imageContain: true,
			message: false,
			hints: true,

			cards: [
				{
					title: "Good",
				},
				{
					title: "Best",
				},
				{
					title: "Finest",
				},
				{
					title: "Mode",
				},
				{
					title: "Mode",
				},
				{
					title: "Mode",
				},
			],
		};
	},
	computed: {
		allMovies() {
			const getAllMovies = store.getters["Admin/getAllMovies"];
			return getAllMovies.docs;
		},
		isClientLogin() {
			return store.getters["Customer/getClientSession"];
		},
	},
	methods: {
		getAMovie(id) {
			return this.allMovies.filter((item) => item._id == id);
		},
		getThumbnail(image) {
			let thumbnail = "https://www.tinastable.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg";
			if (image) {
				thumbnail = `${process.env.VUE_APP_API_URL}/uploads/${image}`;
			}
			return thumbnail;
		},
		async getAllMovies() {
			const params = {
				limit: 15,
				page: 1,
			};
			const movies = await store.dispatch("Admin/gettingAllMovies", params);
		},
		async addMovie(id) {
			if (this.isClientLogin) {
				if (this.getAMovie(id).length) {
					let { _id, title, rentPrice } = this.getAMovie(id)[0];
					await store.commit("Customer/ADD_MOVIE_ITEM", { _id, title, rentPrice, qty: 1 });
					this.snackbar = true;
				}

				return;
			}
			eventEmitter.$emit("display-login-form", {});
		},
		getImage() {
			const min = 550;
			const max = 560;

			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
	},
	created() {
		this.getAllMovies();
		console.log(this.allMovies, "moveis");
	},
};
</script>

<style scoped>
</style>