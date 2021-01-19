<template>
	<components :is="layoutComponent">
		<router-view :key="$route.path"></router-view>
		<NotificationAppAction></NotificationAppAction>
		<AppSnackbar></AppSnackbar>
	</components>
</template>

<script>
// LAZY COMPONENTS
const LayoutBlank = () => import(/* webpackChunkName: 'layout blank' */ "Layout/LayoutBlank");
const LayoutDefault = () => import(/* webpackChunkName: 'layout blank' */ "Layout/LayoutDefault");
const LayoutCustom = () => import(/* webpackChunkName: 'layout blank' */ "Layout/LayoutCustom");
// COMPONENTS
import NotificationAppAction from "Components/Notification/NotificationAppAction";
import AppSnackbar from "Components/AppUtilities/AppUtilitiesSnackbar";
export default {
	name: "App",
	components: {
		NotificationAppAction,
		AppSnackbar,
		LayoutBlank,
		LayoutDefault,
		LayoutCustom
	},
	computed: {
		layoutComponent() {
			return this.$route.meta.layout;
		}
	}
};
</script>
