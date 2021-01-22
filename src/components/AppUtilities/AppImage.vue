<template>
	<v-img :src="image" :position="position" aspect-ratio="1" :contain="contain">
		<slot></slot>
	</v-img>
</template>

<script>
export default {
	name: "AppImage",
	props: {
		image: {
			type: String
		},
		position: {
			type: String
		},
		contain: {
			type: String
		}
	}
};
</script>
