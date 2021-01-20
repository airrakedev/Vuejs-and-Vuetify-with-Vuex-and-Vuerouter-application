<template>
	<v-row>
		<v-col cols="12">
			<v-row v-if="allMovies.length > 0">
				<v-col cols="12" lg="3" md="4" sm="6" v-for="(movie, i) in allMovies" :key="i">
					<v-card dark link :to="{ name: 'PreviewMovieDetails', params: { movieId: movie._id } }">
						<v-img position="top center" aspect-ratio="1" :src="getThumbnail(movie.image)"></v-img>
						<v-card-title class="pb-2">
							<v-row>
								<v-col md="10">
									<div>{{ movie.title }}</div>
								</v-col>
								<v-col md="2">
									<v-tooltip top>
										<template v-slot:activator="{ on, attrs }">
											<v-btn icon @click="addMovie(movie._id)" small color="white" v-bind="attrs" v-on="on">
												<v-icon dark>mdi-plus</v-icon>
											</v-btn>
										</template>
										<span class="font-weight-bold">Add to Shoplist</span>
									</v-tooltip>
								</v-col>
							</v-row>
						</v-card-title>
						<v-card-text class="pb-1">
							<div class="font-weight-bold">₱&nbsp;{{ movie.rentPrice | formatNumber }}</div>
						</v-card-text>
						<v-card-text class="pt-2">
							<div class="font-weight-bold">{{ movie.description.slice(0, 50) }}</div>
						</v-card-text>
						<v-card-actions dark>
							<v-row align="center" class="mx-0 mb-2 pl-1">
								<v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
							</v-row>
							<v-spacer></v-spacer>
							<template v-for="genre in movie.genre">
								<v-chip class="ma-1 font-weight-bold blue-grey--text text--lighten-1" color="light-blue darken-4" label :key="genre._id">
									<v-icon class="pr-1">mdi-tag-outline</v-icon>
									{{ genre.title }}
								</v-chip>
							</template>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
			<v-row v-else>
				<v-col cols="12" lg="3" md="4" sm="6">
					<v-card dark>
						<v-img
							position="top center"
							aspect-ratio="1"
							src="https://388037.smushcdn.com/417404/wp-content/uploads/woocommerce-placeholder.png?lossy=1&strip=1&webp=1"
						></v-img>
						<v-card-title class="pb-2">No Available Movie</v-card-title>
					</v-card>
				</v-col>
			</v-row>
			<v-snackbar :multi-line="imageContain" v-model="snackbar" :top="imageContain" :centered="imageContain" color="primary" dark elevation="24">
				{{ text }}
				<template v-slot:action="{ attrs }">
					<v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
				</template>
			</v-snackbar>
		</v-col>
	</v-row>
</template>

<script>
import store from "Store";
import { eventEmitter } from "Event";
import numeral from "numeral";
import { mapGetters } from "vuex";
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
					title: "Good"
				},
				{
					title: "Best"
				},
				{
					title: "Finest"
				},
				{
					title: "Mode"
				},
				{
					title: "Mode"
				},
				{
					title: "Mode"
				}
			]
		};
	},
	computed: {
		...mapGetters({
			isMovieAvailable: "Admin/isMovieAvailable"
		}),
		allMovies() {
			const getAllMovies = store.getters["Admin/getAllMovies"];
			return getAllMovies.docs;
		},
		isClientLogin() {
			return store.getters["Customer/getClientSession"];
		}
	},
	methods: {
		getAMovie(id) {
			return this.allMovies.filter(item => item._id == id);
		},
		getThumbnail(image) {
			let thumbnail = "https://www.tinastable.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg";
			if (image) {
				thumbnail = `${process.env.NODE_ENV !== "development" ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_API_URL}/uploads/${image}`;
			}
			return thumbnail;
		},
		async getAllMovies() {
			const params = {
				limit: 50,
				page: 1,
				sort: { title: 1 }
			};
			const movies = await store.dispatch("Admin/gettingAllMovies", params);
		},
		async addMovie(id) {
			if (this.isClientLogin) {
				if (this.getAMovie(id).length) {
					let { _id, title, rentPrice } = this.getAMovie(id)[0];
					await store.dispatch("Customer/addMyMovieToCart", { _id, title, rentPrice, qty: 1 });
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
		}
	},
	filters: {
		formatNumber(val) {
			if (!val) return "";
			return numeral(val).format("0.00");
		}
	},
	created() {
		this.getAllMovies();
	}
};
</script>

<style scoped>
</style>