<template>
	<v-app style="background-color:#eee">
		<!-- ROUTER VIEW -->
		<router-view></router-view>

		<notifications group="movie" animation-type="velocity" :animation="animation" />
		<v-footer app>
			<span class="primary--text caption">&copy; Airrake 2020</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: "App",

	data: () => ({
		loginDialog: false,
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
	methods: {},
};
</script>
<style >
body {
	/* zoom: 0.95; */
	font-family: "Quicksand", sans-serif;
	font-size: 12px !important;
}
.v-chip.v-size--default {
	font-size: 11px !important;
}
.v-input {
	font-size: 13px !important;
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
</style>
