<script>
import store from "Store";
export default {
	name: "RenderlessMovieOnly",
	props: {
		movieId: {
			type: String,
			required: true
		}
	},
	render() {
		if (!this.getMovie()) {
			return this.$router.push({ name: "main-dashboard" });
		}
		return this.$scopedSlots.default({
			movie: this.getMovie()
		});
	},
	methods: {
		getMovie() {
			const getAllMovies = store.getters["Admin/getAllMovies"];
			const { docs } = getAllMovies;
			const checkMovie = docs.filter(item => item._id == this.movieId)[0];
			if (checkMovie) {
				return checkMovie;
			}
			return false;
		}
	},
	mounted() {
		console.log("boom");
	}
};
</script>
