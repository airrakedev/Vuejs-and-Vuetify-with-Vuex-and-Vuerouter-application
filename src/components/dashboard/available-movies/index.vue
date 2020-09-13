<template>
	<v-col>
		<v-row>
			<v-col md="4" v-for="(movie, i) in allMovies" :key="i">
				<v-card dark>
					<v-img :src="getThumbnail(movie.image)" height="300px"></v-img>
					<v-card-title class="pb-1">{{movie.title}}</v-card-title>
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
						<v-btn fab dark @click="registerUser" small color="primary">
							<v-icon dark>mdi-plus</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
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
			fav: true,

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
	},
	methods: {
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
			console.log("FE Lapos");
		},
		registerUser() {
			eventEmitter.$emit("open-registration", {});
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