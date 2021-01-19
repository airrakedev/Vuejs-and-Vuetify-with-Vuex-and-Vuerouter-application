<template>
	<v-col cols="4" md="6" justify="center" align="center">
		<v-card :color="color" class="card-icon" dark>
			<slot></slot>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: "AppUtilitiesCardIcon",
	props: {
		color: {
			type: String,
			default: "warning lighten-1"
		}
	}
};
</script>
<style scoped>
.card-icon {
	margin-top: -35px;
	padding-top: 30px;
	padding-bottom: 30px;
}
</style>