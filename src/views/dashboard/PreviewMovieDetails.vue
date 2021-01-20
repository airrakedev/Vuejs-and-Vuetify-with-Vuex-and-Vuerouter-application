<template>
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
								<v-chip :key="star" color="light-blue lighten-4" class="ml-0 mr-2 blue-grey--text tect-capitalize font-weight-bold" label small>
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
					<v-btn depressed height="60" class="px-5 text-capitalize body-1" color="amber"> Add to Shoplist </v-btn>
				</v-card-actions>
				<v-row>
					<v-col>
						<p class="pl-2 body-2">By ordering or viewing, you agree to our Terms. Sold by Prime Movies Services LLC.</p>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
		<v-col md="5" cols="12">
			<v-img :src="getThumbnail(allMovies.image)" contain></v-img>
		</v-col>
		<v-row class="mt-5">
			<v-col>
				<h3 class="my-5 text-center blue-grey--text text--darken-1">Related Movies</h3>
				<RenderlessMovies #default="{ movies }">
					<template>
						<v-sheet class="mx-auto mb-5" elevation="1" max-width="1170">
							<v-slide-group v-model="model" class="pa-4" center-active show-arrows>
								<v-slide-item v-for="movie in movies" :key="movie._id" v-slot="{ active }">
									<v-card :to="{ name: 'PreviewMovieDetails', params: { movieId: movie._id } }" class="ma-2" height="180" width="230" elevation="1">
										<v-img :src="getThumbnail(movie.image)" height="180px">
											<p class="body-1 font-weight-bold blue-grey--text text--darken-1 pl-4 pt-5 d-inline-block">{{ movie.title }}</p>
										</v-img>
										<v-scale-transition>
											<v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
										</v-scale-transition>
									</v-card>
								</v-slide-item>
							</v-slide-group>
						</v-sheet>
					</template>
				</RenderlessMovies>
			</v-col>
		</v-row>
	</v-row>
</template>

<script>
import RenderlessMovies from "Components/Abstract/RenderlessMovies";

// APP
import store from "Store";
export default {
	name: "PreviewMovieDetails",
	components: {
		RenderlessMovies
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
			const { docs } = getAllMovies;
			return docs.filter(item => item._id == this.movieId)[0];
		}
	},
	methods: {
		getAMovie() {
			console.log(this.movieId, "boom");
			return this.allMovies.filter(item => item._id == this.movieId);
		},
		getThumbnail(image) {
			let thumbnail = "https://www.tinastable.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg";
			if (image) {
				thumbnail = `${process.env.NODE_ENV !== "development" ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_API_URL}/uploads/${image}`;
			}
			return thumbnail;
		}
	},
	mounted() {
		// console.log(this.getAMovie());
	}
};
</script>

<style>
</style>