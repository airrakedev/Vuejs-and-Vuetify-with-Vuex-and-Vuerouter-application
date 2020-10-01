<template>
	<v-row justify="center">
		<v-dialog v-model="movieDialogStatus" persistent max-width="950px">
			<v-card>
				<v-app-bar height="60" dark color="teal" elevation="0">
					<v-toolbar-title class="pl-5 font-weight-bold">{{title}}</v-toolbar-title>

					<v-spacer></v-spacer>
				</v-app-bar>

				<v-card-text class="pb-1">
					<v-container>
						<v-row>
							<v-col md="8" class="pb-0 pt-0">
								<v-row>
									<v-col cols="12" md="12" class="pt-1 pb-1">
										<label for class="font-weight-bold">Movie Title</label>
										<v-text-field
											v-model="movieData.title"
											:error-messages="movieTitleErrors"
											@input="$v.movieData.title.$touch()"
											@blur="$v.movieData.title.$touch()"
											class="mt-1"
											placeholder="A movie title"
											solo
										></v-text-field>
									</v-col>

									<v-col cols="12" md="12" class="pt-1 pb-1">
										<label for class="font-weight-bold">Actor/s</label>
										<v-chip-group column v-if="actors.length">
											<v-chip
												v-for="(actor, i) in actors"
												:key="i"
												color="teal"
												elevation="2"
												close
												dark
												@click:close="removeChip(actor)"
											>{{actor}}</v-chip>
										</v-chip-group>
										<v-row no-gutters align="center">
											<v-col cols="11">
												<v-text-field class="mt-1" v-model="newActor" placeholder="Add actor/s" solo required></v-text-field>
											</v-col>
											<v-col cols="1" class="mb-5">
												<v-btn fab x-small dark color="teal" elevation="2" class="ml-2" @click="appendActors()">
													<v-icon>mdi-plus</v-icon>
												</v-btn>
											</v-col>
										</v-row>
									</v-col>
									<v-col cols="12" md="12" class="pt-1 pb-0">
										<label for class="font-weight-bold">Genre</label>
										<v-select
											v-model="movieData.genre"
											:error-messages="movieGenreErrors"
											@input="$v.movieData.genre.$touch()"
											@blur="$v.movieData.genre.$touch()"
											class="mt-1"
											:items="allGenres"
											item-text="title"
											item-value="_id"
											chips
											placeholder="Select movie genres"
											:deletable-chips="deletableChips"
											multiple
											solo
										></v-select>
									</v-col>
								</v-row>
							</v-col>

							<!-- IMAGE -->
							<v-col md="4" class="pt-0 pb-1">
								<label for class="font-weight-bold">Movie Poster</label>
								<v-file-input
									class="mt-1"
									solo
									ref="fileInput"
									:rules="imageRules"
									accept="image/png, image/jpeg, image/bmp"
									placeholder="Pick movie poster"
									prepend-icon="mdi-camera"
									label="Avatar"
									@change="uploadImage"
									show-size
								></v-file-input>
								<v-row justify="end">
									<v-col cols="8" class="pl-0 pt-0 pb-0">
										<v-card class="pa-2">
											<v-img
												:src="movieProfileImage"
												:lazy-src="movieProfileImage"
												aspect-ratio="1"
												class="grey lighten-2"
											></v-img>
										</v-card>
									</v-col>
								</v-row>
							</v-col>

							<v-col cols="6" md="6" class="pt-1 pb-0">
								<label for class="font-weight-bold">Quantity</label>
								<v-text-field
									v-model="movieData.inStock"
									:error-messages="movieInstockErrors"
									@input="$v.movieData.inStock.$touch()"
									@blur="$v.movieData.inStock.$touch()"
									class="mt-1"
									placeholder="0"
									solo
									type="number"
								></v-text-field>
							</v-col>
							<v-col cols="6" md="6" class="pt-1 pb-0">
								<label for class="font-weight-bold">Rent</label>
								<v-text-field
									v-model="movieData.rentPrice"
									:error-messages="movieRentPriceErrors"
									@input="$v.movieData.rentPrice.$touch()"
									@blur="$v.movieData.rentPrice.$touch()"
									class="mt-1"
									placeholder="0.00"
									solo
								></v-text-field>
							</v-col>
							<v-col cols="6" md="6" class="pt-1 pb-0">
								<label for class="font-weight-bold">Description</label>
								<v-textarea
									class="mt-1"
									v-model="movieData.description"
									auto-grow
									solo
									color="deep-purple"
									placeholder="Movie description"
									rows="4"
								></v-textarea>
							</v-col>
							<v-col cols="6" md="6" class="pt-1 pb-0">
								<label for class="font-weight-bold">Plot</label>
								<v-textarea
									v-model="movieData.plot"
									class="mt-1"
									auto-grow
									solo
									color="deep-purple"
									placeholder="Movie plot"
									rows="4"
								></v-textarea>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-divider></v-divider>
				<v-footer padless class="pr-5" align="end" justify="end">
					<v-row align="end" justify="end">
						<v-col>
							<v-btn color="error" @click="closeMovieForm" height="35" width="100">Close</v-btn>
							<v-btn class="ml-3 mr-5" color="teal" @click="submit()" dark height="35" width="100">Submit</v-btn>
						</v-col>
					</v-row>
				</v-footer>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, decimal } = require("vuelidate/lib/validators");

import { eventEmitter } from "Event";
import _ from "lodash";
import store from "Store";
export default {
	name: "formMovie",
	mixins: [validationMixin],
	props: {
		movieDialog: Boolean,
		title: String,
		movieData: Object,
	},
	validations: {
		movieData: {
			title: { required },
			genre: { required },
			inStock: { required },
			rentPrice: { required, decimal },
		},
	},
	data() {
		return {
			chip1: true,
			deletableChips: true,
			previewImage: "https://via.placeholder.com/150",
			defaultMovieUploadImage: "https://via.placeholder.com/150",
			imageRules: [(value) => !value || value.size < 2000000 || "Avatar size should be less than 2 MB!"],
			createdActors: [],
			newActor: "",
			movieProfile: null,
			checkIfUploadImage: false,
		};
	},
	computed: {
		checkIfMovieHasImage() {
			return this.checkIfUploadImage;
		},
		movieProfileImage() {
			return this.previewImage;
		},
		movieDialogStatus() {
			return this.movieDialog;
		},
		allGenres() {
			return store.getters["Global/getGenreList"];
		},
		actors() {
			// return this.movieData.actor;
			return this.createdActors;
		},
		movieTitleErrors() {
			const errors = [];
			if (!this.$v.movieData.title.$dirty) return errors;
			!this.$v.movieData.title.required && errors.push("Movie title is required.");
			return errors;
		},
		movieGenreErrors() {
			const errors = [];
			if (!this.$v.movieData.genre.$dirty) return errors;
			!this.$v.movieData.genre.required && errors.push("Please select movie genre.");
			return errors;
		},
		movieInstockErrors() {
			const errors = [];
			if (!this.$v.movieData.inStock.$dirty) return errors;
			!this.$v.movieData.inStock.required && errors.push("Movie quantity is required.");
			return errors;
		},
		movieRentPriceErrors() {
			const errors = [];
			if (!this.$v.movieData.rentPrice.$dirty) return errors;
			!this.$v.movieData.rentPrice.required && errors.push("Movie rent price is required.");
			!this.$v.movieData.rentPrice.decimal && errors.push("Movie rent price should be an integer.");
			return errors;
		},
	},
	methods: {
		uploadImage(event) {
			if (!event || !event.type.startsWith("image")) {
				this.previewImage = this.defaultMovieUploadImage;
				this.checkIfUploadImage = false;
				return store.commit("Admin/INVALID_PROFILE_IMAGE");
			}

			this.movieProfile = event;

			// TO PREVIEW IMAGE
			let reader = new FileReader();
			const $this = this;

			reader.onload = function (e) {
				$this.previewImage = this.result;
			};
			reader.readAsDataURL(event);
			// CHECK IF HAS IMAGE TO UPLOAD
			this.checkIfUploadImage = true;
		},
		appendActors() {
			if (this.newActor.length) {
				this.createdActors.push(this.newActor);
				this.newActor = "";
			}
		},
		closeMovieForm() {
			this.$emit("close-movie-form", {});
		},
		removeChip(val) {
			let removeActor = _.remove(this.createdActors, function (value) {
				return value !== val;
			});
			this.createdActors = removeActor;
		},
		fetchGenres() {
			store.dispatch("Global/getAllGenre");
		},
		submit() {
			this.$v.$touch();
			if (this.$v.$pending || this.$v.$error) return;

			// CHECK IF HAS MOVIE PROFILE IMAGE
			if (this.checkIfMovieHasImage) {
				this.movieData.movieProfile = this.movieProfile;
			}

			this.movieData.actor = this.createdActors;

			// FORM DATA
			let formData = new FormData();

			formData.append("movieProfile", this.movieProfile);
			formData.append("title", this.movieData.title);
			formData.append("actor", JSON.stringify(this.createdActors));
			formData.append("genre", JSON.stringify(this.movieData.genre));

			formData.append("inStock", this.movieData.inStock);
			formData.append("rentPrice", this.movieData.rentPrice);
			formData.append("description", this.movieData.description);
			formData.append("plot", this.movieData.plot);

			store.dispatch("Admin/createMovie", formData).then((res) => {
				// console.log("Created successfully");
				// CLOSE FORM
				this.closeMovieForm();
				// CLEAR FORM FIELDS
				this.clearFields();
			});
		},
		clearFields() {
			// default poster image
			this.previewImage = this.defaultMovieUploadImage;
			this.movieProfile = null;
			this.$refs.fileInput.reset();

			this.movieData.title = "";
			this.movieData.genre = "";
			this.movieData.inStock = "";
			this.movieData.rentPrice = "";
			this.movieData.plot = "";
			this.movieData.description = "";
			this.createdActors = [];
		},
	},
	watch: {},
	created() {
		this.fetchGenres();
	},
};
</script>

<style scoped>
.theme--dark.v-system-bar {
	background-color: unset !important;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
	margin-bottom: 0px !important;
}
.v-system-bar .v-icon {
	margin-right: 0px !important;
}
</style>