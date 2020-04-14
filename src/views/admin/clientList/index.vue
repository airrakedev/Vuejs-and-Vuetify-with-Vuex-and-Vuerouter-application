<template>
	<v-container background-color="grey" class="mt-5 ml-5" fluid>
		<v-row align="center" justify="center">
			<v-col>
				<v-card class="mx-auto pa-4 pt-0" elevation="1">
					<v-row>
						<v-col cols="1" justify="center" align="center">
							<v-card color="pink lighten-1" class="card-icon" dark>
								<v-icon large>mdi-account-group-outline</v-icon>
							</v-card>
						</v-col>
						<v-col>
							<h2 class="pt-5 font-weight-light">List of Clients</h2>
						</v-col>
					</v-row>
					<v-card-title class="mr-5 pr-5">
						<v-spacer></v-spacer>
						<v-row>
							<v-col class="pr-5">
								<v-text-field
									v-model="search"
									append-icon="mdi-magnify"
									label="Search"
									class="font-weight-light"
									background-color="grey lighten-4"
									light
									color="primary"
									hide-details
									clearable
									solo
									rounded
								></v-text-field>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text class="pa-5">
						<v-row class="pa-5 pt-0">
							<v-col class="pa-5 pt-0">
								<v-data-table
									:headers="headers"
									:items="desserts"
									sort-by="calories"
									class="font-weight-light"
									id="customBorder"
								>
									<!-- <template v-slot:top>
								<v-toolbar flat color="white"></v-toolbar>
									</template>-->
									<template v-slot:item.actions="{ item }">
										<v-icon class="mr-5" @click="editItem(item)">mdi-square-edit-outline</v-icon>
										<v-icon color="error" @click="deleteItem(item)">mdi-trash-can-outline</v-icon>
									</template>
									<template v-slot:no-data>
										<v-btn color="primary" @click="initialize">Reset</v-btn>
									</template>
								</v-data-table>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "AllClientList",
	data() {
		return {
			dialog: false,
			search: "",
			headers: [
				{
					text: "Dessert (100g serving)",
					class:
						"font-weight-regular subtitle-1 grey lighten-3 pt-5 pb-5 primary--text pt-5 pb-5",
					align: "start",
					sortable: false,
					value: "name"
				},
				{
					text: "Calories",
					value: "calories",
					class:
						"font-weight-regular subtitle-1 grey lighten-3 pt-5 pb-5 primary--text"
				},
				{
					text: "Fat (g)",
					value: "fat",
					class:
						"font-weight-regular subtitle-1 grey lighten-3 pt-5 pb-5 primary--text"
				},
				{
					text: "Carbs (g)",
					value: "carbs",
					class:
						"font-weight-regular subtitle-1 grey lighten-3 pt-5 pb-5 primary--text"
				},
				{
					text: "Protein (g)",
					value: "protein",
					class:
						"font-weight-regular subtitle-1 grey lighten-3 pt-5 pb-5 primary--text"
				},
				{
					text: "Actions",
					value: "actions",
					sortable: false,
					class:
						"font-weight-regular subtitle-1 grey lighten-3 pt-5 pb-5 primary--text"
				}
			],
			desserts: [
				{
					name: "Frozen Yogurt",
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0
				},
				{
					name: "Ice cream sandwich",
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3
				},
				{
					name: "Eclair",
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0
				},
				{
					name: "Cupcake",
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3
				},
				{
					name: "Gingerbread",
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9
				},
				{
					name: "Jelly bean",
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0
				},
				{
					name: "Lollipop",
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0
				},
				{
					name: "Honeycomb",
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5
				},
				{
					name: "Donut",
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9
				},
				{
					name: "KitKat",
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7
				}
			],
			editedIndex: -1,
			editedItem: {
				name: "",
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			},
			defaultItem: {
				name: "",
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			}
		};
	}
};
</script>

<style scoped>
.v-data-table .v-data-table__wrapper table,
.v-data-table table,
#customBorder {
	border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-text-field--solo-inverted.v-input--is-focused
	> .v-input__control
	> .v-input__slot
	input {
	color: #000 !important;
}
.card-icon {
	margin-top: -30px;
	padding-top: 35px;
	padding-bottom: 35px;
}
</style>