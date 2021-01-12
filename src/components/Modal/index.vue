<template>
	<v-dialog v-model="show" persistent :max-width="maxWidth">
		<v-card flat>
			<slot name="title"></slot>
			<slot></slot>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true
		},
		maxWidth: {
			type: String,
			default: "800px"
		}
	}
};
</script>

<style>
</style>