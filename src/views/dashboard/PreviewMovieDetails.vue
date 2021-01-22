<template>
	<RenderlessMovieOnly :movieId="movieId" #default="{ movie: allMovies }">
		<v-row justify="center">
			<v-col md="7" cols="12">
				<v-card class="pa-5" elevation="1" dark>
					<v-card-title>
						<h2 class="font-weight-regular white--text">
							{{ allMovies.title }}
						</h2>
					</v-card-title>
					<v-card-text>
						<v-row align="center" class="mx-0 mt-1">
							<v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

							<div class="grey--text ml-4 font-weight-bold text-uppercase">
								<span></span> Genre
								<span class="ml-3">
									<template v-for="genre in allMovies.genre">
										<v-chip :key="genre._id" small class="ma-1 text-capitalize" color="blue-grey darken-2" label outlined>
											{{ genre.title }}
										</v-chip>
									</template>
								</span>
							</div>
						</v-row>
						<v-row class="mt-5">
							<v-col>
								<div class="body-1 white--text">
									{{ allMovies.description }}
								</div>
							</v-col>
						</v-row>
						<v-row class="mt-5" v-if="allMovies.actor.length > 0">
							<v-col cols="12" md="2">
								<span class="font-weight-bold body-1"> Starring </span>
							</v-col>
							<v-col cols="12" md="10">
								<template v-for="star in allMovies.actor">
									<v-chip :key="star" color="light-blue lighten-4" class="ml-0 mr-2 blue-grey--text text-capitalize font-weight-bold" label small>
										{{ star }}
									</v-chip>
								</template>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions class="mt-5">
						<v-btn depressed :to="{ name: 'main-dashboard' }" height="60" class="px-5 text-capitalize body-1" color="blue-grey lighten-1" dark>
							<v-icon class="pr-1"> mdi-arrow-left </v-icon>
							Back
						</v-btn>
						<v-btn depressed @click="addMovie(allMovies._id)" height="60" class="px-5 text-capitalize body-1" color="amber"> Add to Shoplist </v-btn>
					</v-card-actions>
					<v-row>
						<v-col>
							<p class="pl-2 body-2">By ordering or viewing, you agree to our Terms. Sold by Prime Movies Services LLC.</p>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col md="5" cols="12">
				<app-image :image="getThumbnail(allMovies.image)" position="top left" contain></app-image>
				<!-- <v-img :src="getThumbnail(allMovies.image)" ></v-img> -->
			</v-col>

			<RenderlessMovies #default="{ movies }">
				<v-row class="mt-5">
					<v-col>
						<h3 class="my-5 text-center blue-grey--text text--darken-1">Related Movies</h3>
						<v-sheet class="mx-auto mb-5" elevation="1" max-width="1170">
							<v-slide-group v-model="model" class="pa-4" center-active show-arrows>
								<v-slide-item v-for="movie in movies" :key="movie._id" v-slot="{ active }">
									<v-card :to="{ name: 'PreviewMovieDetails', params: { movieId: movie._id } }" class="ma-2" height="180" width="230" elevation="1">
										<app-image :image="getThumbnail(movie.image)" max-height="180px" position="top center">
											<p class="body-1 font-weight-bold white--text pl-4 pt-5 d-inline-block">{{ movie.title }}</p>
										</app-image>
										<v-scale-transition>
											<v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
										</v-scale-transition>
									</v-card>
								</v-slide-item>
							</v-slide-group>
						</v-sheet>
					</v-col>
				</v-row>
			</RenderlessMovies>
		</v-row>
	</RenderlessMovieOnly>
</template>

<script>
// COMPONENTS
import RenderlessMovies from "Components/Abstract/RenderlessMovies";
import RenderlessMovieOnly from "Components/Abstract/RenderlessMovieOnly";
import AppImage from "Components/AppUtilities/AppImage";

// APP
import store from "Store";
import { eventEmitter } from "Event";
export default {
	name: "PreviewMovieDetails",
	components: {
		RenderlessMovies,
		RenderlessMovieOnly,
		AppImage
	},
	props: {
		movieId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			model: null
		};
	},
	computed: {
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
		getThumbnail(image) {
			let thumbnail = "https://www.tinastable.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg";
			if (image) {
				thumbnail = `${process.env.NODE_ENV !== "development" ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_API_URL}/uploads/${image}`;
			}
			return thumbnail;
		}
	}
};
</script>
