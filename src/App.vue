<template>
	<v-app style="background-color: #eee">
		<!-- ROUTER VIEW -->
		<v-main>
			<router-view></router-view>

			<!-- Notification Action -->
			<NotificationAppAction></NotificationAppAction>
			<!-- Snackbar -->
			<AppSnackbar></AppSnackbar>
		</v-main>
		<v-footer app>
			<span class="primary--text caption">&copy; Airrake 2020</span>
		</v-footer>
	</v-app>
</template>

<script>
// COMPONENTS
import NotificationAppAction from "Components/Notification/NotificationAppAction";
import AppSnackbar from "Components/AppUtilities/AppUtilitiesSnackbar";
export default {
	name: "App",
	components: {
		NotificationAppAction,
		AppSnackbar
	}
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
