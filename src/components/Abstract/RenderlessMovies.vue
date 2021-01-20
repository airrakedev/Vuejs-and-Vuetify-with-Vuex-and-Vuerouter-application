<script>
import store from "Store";
export default {
	name: "RenderlessMovies",
	methods: {
		allMovies() {
			const getAllMovies = store.getters["Admin/getAllMovies"];
			const { docs } = getAllMovies;
			return docs;
		}
	},
	render() {
		return this.$scopedSlots.default({
			movies: this.allMovies()
		});
	}
};
</script>
