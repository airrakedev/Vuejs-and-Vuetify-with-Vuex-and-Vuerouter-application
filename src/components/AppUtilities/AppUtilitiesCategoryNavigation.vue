<template>
	<v-row>
		<v-col cols="12">
			<v-card flat color="#eee">
				<v-card-actions>
					<template v-for="navcat in categoryNavigation">
						<v-btn :key="navcat.name" text class="ma-sm-0 light-blue--text text--darken-2 font-weight-bold" @click="navcat.event(navcat.params)">
							{{ navcat.name }}
						</v-btn>
					</template>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import store from "Store";
export default {
	name: "AppUtilitiesCategoryNavigation",
	props: {
		categoryNavigation: {
			type: Array,
			required: true
		}
	}
};
</script>

<style>
</style>