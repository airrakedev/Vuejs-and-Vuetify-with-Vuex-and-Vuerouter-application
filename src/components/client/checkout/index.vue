<template>
	<v-container background-color="grey" class="mt-5 ml-5" fluid>
		<v-row align="center" justify="center">
			<v-col cols="7">
				<v-card class="mx-auto pa-10" elevation="1">
					<h2 class="blue--text mb-5">Billing Details</h2>
					<v-row>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text">Firstname</label>
							<v-text-field class="mt-1" placeholder="Firstname" solo></v-text-field>
						</v-col>

						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text">Lastname</label>

							<v-text-field class="mt-1" placeholder="Lastname" solo></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="12" class="pt-0 pb-0">
							<label for class="blue-grey--text">Email address</label>

							<v-text-field class="mt-1" placeholder="email" solo></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="12" class="pt-0 pb-0">
							<label for class="blue-grey--text">Street</label>
							<v-text-field class="mt-1" placeholder="street" solo></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text">City</label>
							<v-text-field class="mt-1" placeholder="City" solo></v-text-field>
						</v-col>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text">State</label>
							<v-text-field class="mt-1" placeholder="State" solo></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text">Country</label>
							<v-text-field class="mt-1" placeholder="Country" solo></v-text-field>
						</v-col>
						<v-col cols="6" md="6" class="pt-0 pb-0">
							<label for class="blue-grey--text">Zipcode</label>
							<v-text-field class="mt-1" placeholder="Zipcode" solo></v-text-field>
						</v-col>
					</v-row>
					<h2 class="blue--text mb-5">Payment Method</h2>
					<v-row justify="center">
						<v-col cols="12" md="12" class="pt-0 pb-0">
							<v-expansion-panels accordion>
								<v-expansion-panel>
									<v-expansion-panel-header>Credit Card</v-expansion-panel-header>
									<v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
								</v-expansion-panel>
								<v-expansion-panel>
									<v-expansion-panel-header>Paypal</v-expansion-panel-header>
									<v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="5">
				<v-card class="mx-auto pa-4" elevation="1">
					<h1>Boom</h1>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import store from "Store";
import numeral from "numeral";
export default {
	name: "clientCheckOutPage",
	data() {
		return {};
	},
};
</script>

<style scoped>
.v-expansion-panel .v-expansion-panel-header__icon {
	display: none !important;
}
</style>
