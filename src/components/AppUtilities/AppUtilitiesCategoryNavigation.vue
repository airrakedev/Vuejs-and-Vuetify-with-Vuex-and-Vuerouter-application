<template>
	<v-row>
		<v-col cols="12">
			<v-card flat color="#eee">
				<v-card-actions>
					<template v-for="(navcat, index) in categoryNavigation">
						<v-btn
							:ref="`active`"
							:key="navcat.name"
							text
							class="dynamic-category ma-sm-0 light-blue--text text--darken-2 font-weight-bold"
							@click="navcat.event(navcat.params, index)"
						>
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
	},
	data() {
		return {
			clickActive: "category-active"
		};
	}
};
</script>
