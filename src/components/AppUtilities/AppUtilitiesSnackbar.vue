<template>
	<v-snackbar :multi-line="snackbarOtherStatus" v-model="snackStats" :top="snackbarOtherStatus" :centered="snackbarOtherStatus" :color="getSnackStatus.color" dark elevation="24">
		<span class="font-weight-bold">
			{{ getSnackStatus.text }}
		</span>
		<v-btn icon @click="closeSnackBar()">
			<v-icon color="white">mdi-close</v-icon>
		</v-btn>
	</v-snackbar>
</template>

<script>
// EXTERNALS
import { mapGetters } from "vuex";
import store from "Store";
export default {
	data: () => ({
		loginDialog: false,
		snackStats: false,
		snackbarOtherStatus: true
	}),
	computed: {
		getSnackStatus() {
			return store.getters["Global/getSnackBarNotice"];
		}
	},
	watch: {
		getSnackStatus: function(old, newer) {
			this.snackStats = old.status;
		},
		snackStats: function(newValue) {
			if (!newValue) {
				this.closeSnackBar();
			}
		}
	},
	methods: {
		closeSnackBar() {
			let stats = {
				status: false,
				color: "",
				text: ""
			};
			store.commit("Global/UPDATE_SNACKBAR", stats);
		}
	}
};
</script>

<style>
</style>