<template>
	<v-app style="background-color: #eee">
		<!-- ROUTER VIEW -->
		<v-main>
			<slot></slot>
		</v-main>
		<app-footer>
			<span class="primary--text caption">&copy; Airrake 2021</span>
		</app-footer>
	</v-app>
</template>

<script>
import AppFooter from "Components/AppLayout/AppLayoutFooter";
export default {
	name: "AppLayoutBlank",
	components: {
		AppFooter
	}
};
</script>
