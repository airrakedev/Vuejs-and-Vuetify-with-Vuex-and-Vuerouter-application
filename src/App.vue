<template>
	<v-app style="background-color: #eee">
		<!-- ROUTER VIEW -->
		<router-view></router-view>

		<notifications group="movie" animation-type="velocity" :animation="animation" width="28%">
			<template slot="body" slot-scope="props">
				<v-card class="ma-2">
					<v-list two-line subheader :color="props.item.type" dark>
						<v-list-item>
							<v-list-item-avatar>
								<v-icon class="white" :class="props.item.type != 'error' ? 'success--text' : 'error--text'">
									{{ props.item.type != "error" ? "mdi-check-outline" : "mdi-alert-octagon-outline" }}
								</v-icon>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title class="font-weight-bold">
									{{ props.item.title }}
								</v-list-item-title>
								<v-list-item-subtitle v-text="props.item.text" class="mt-1"></v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn icon small @click="props.close">
									<v-icon color="white">mdi-close</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-card>
			</template>
		</notifications>
		<!-- Snackbar -->
		<v-snackbar
			:multi-line="snackbarOtherStatus"
			v-model="snackStats"
			:top="snackbarOtherStatus"
			:centered="snackbarOtherStatus"
			:color="getSnackStatus.color"
			dark
			elevation="24"
		>
			<span class="font-weight-bold">
				{{ getSnackStatus.text }}
			</span>
			<v-btn icon @click="closeSnackBar()">
				<v-icon color="white">mdi-close</v-icon>
			</v-btn>
		</v-snackbar>
		<v-footer app>
			<span class="primary--text caption">&copy; Airrake 2020</span>
		</v-footer>
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";
import store from "Store";
export default {
	name: "App",

	data: () => ({
		loginDialog: false,
		snackStats: false,
		snackbarOtherStatus: true,

		animation: {
			enter(element) {
				let height = element.clientHeight;
				return {
					height: [height, 0],
					opacity: [Math.random() * 0.85 + 0.85, 0],
				};
			},
			leave: {
				height: 0,
				opacity: 0,
			},
		},
	}),
	computed: {
		getSnackStatus() {
			return store.getters["Global/getSnackBarNotice"];
		},
	},
	watch: {
		getSnackStatus: function (old, newer) {
			this.snackStats = old.status;
		},
		snackStats: function (newValue) {
			if (!newValue) {
				this.closeSnackBar();
			}
		},
	},
	methods: {
		closeSnackBar() {
			let stats = {
				status: false,
				color: "",
				text: "",
			};
			store.commit("Global/UPDATE_SNACKBAR", stats);
		},
	},
};
</script>
<style >
body {
	/* zoom: 0.95; */
	font-family: "Quicksand", sans-serif !important;
	font-size: 12px !important;
}
.v-chip.v-size--default {
	font-size: 11px !important;
}
.v-input {
	font-size: 13px !important;
}
.v-btn {
	letter-spacing: unset !important;
}
.v-list-item__title {
	font-size: 0.85rem !important;
}
.v-application {
	font-family: "Quicksand", sans-serif !important;
	/* font-weight: 700 !important; */
}
.blend-color {
	background-color: #121212 !important;
}
h1,
h2,
h3,
h4,
h5,
h6,
.v-application,
.v-application .subtitle-1,
.v-application .subtitle-2,
.v-application .v-content .body-1,
.v-list-item .v-list-item__title,
.v-list-item__content .font-weight-bold,
.v-application .body-2,
.v-application .button,
body .caption,
.v-application .caption,
.v-btn__content,
.v-application .overline,
.v-application .title,
.v-application .body-1 {
	font-family: "Quicksand", sans-serif !important;
}

.v-menu__content {
	overflow-y: unset !important;
	overflow-x: unset !important;
}
</style>
