<template>
	<v-container background-color="grey" class="ma-#">
		<v-row align="center" justify="center">
			<v-col cols="12">
				<v-card class="mx-auto pa-4 pt-0" elevation="1">
					<v-row>
						<v-col cols="1" md="2" sm="2" justify="center" align="center">
							<v-card color="pink lighten-1" class="card-icon" dark elevation="1">
								<v-icon large>mdi-account-group-outline</v-icon>
							</v-card>
						</v-col>
						<v-col>
							<h2 class="pt-5 blue-grey--text">All Clients</h2>
						</v-col>
					</v-row>
					<v-card-title class="pr-0">
						<v-spacer></v-spacer>
						<v-row no-gutters>
							<v-col>
								<v-text-field
									v-model="search"
									append-icon="mdi-magnify"
									placeholder="Search"
									class="font-weight-medium"
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
					<v-card-text class="pl-0 pr-0">
						<v-row class="mt-5" no-gutters>
							<v-col cols="12">
								<v-data-table :headers="headers" :items="allClients" class="font-weight-light" id="customBorder" :search="search">
									<template v-slot:body="{ items }">
										<tbody>
											<tr v-for="(item, i) in items" :key="i">
												<td class="pl-2 pr-1">
													<v-list-item class="pl-1 pr-1 pt-1 pb-2">
														<v-list-item-avatar>
															<v-img :src="getClientAvatar('')"></v-img>
														</v-list-item-avatar>

														<v-list-item-content class="pt-1 pb-1">
															<v-list-item-title>
																<h4 class="teal--text pl-2">{{ item.firstname }} {{ item.lastname }}</h4>
															</v-list-item-title>
															<v-list-item-subtitle class="mt-1">
																<!-- <v-chip class="ma-2 font-weight-bold" color="blue-grey" label text-color="white"> -->
																<span class="blue-grey--text">
																	<v-icon color="blue-grey">mdi-map-marker</v-icon>
																	{{ item.address }}
																</span>
																<!-- </v-chip> -->
															</v-list-item-subtitle>
														</v-list-item-content>
													</v-list-item>
												</td>
												<td class="pl-1 pr-1">
													<v-chip small class="ma-2 font-weight-bold" color="green" label text-color="white">
														<v-icon small>mdi-cellphone-iphone</v-icon>
														+{{ item.phone }}
													</v-chip>
												</td>

												<td class="pl-1 pr-1">
													<v-chip small class="ma-2 font-weight-bold" color="warning" label text-color="white">
														<v-icon small class="mr-1">mdi-email</v-icon>

														{{ item.email }}
													</v-chip>
												</td>
												<td class="pl-1 pr-1">
													<v-chip small class="ma-2 font-weight-medium" color="indigo" text-color="white">{{
														item.status ? "Active" : "Inactive"
													}}</v-chip>
												</td>
												<td class="pl-1 pr-1">
													<v-btn class="mr-1" height="30" width="35" dark small color="green">
														<v-icon small dark>mdi-square-edit-outline</v-icon>
													</v-btn>
													<v-btn class="ml-1" height="30" width="35" dark small color="error">
														<v-icon small dark>mdi-close</v-icon>
													</v-btn>
												</td>
											</tr>
										</tbody>
									</template>
									<!-- <template v-slot:no-data>
										<span>No data available</span>
									</template>-->
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
import store from "Store";
import numeral from "numeral";
export default {
	name: "AdminMovieList",
	data() {
		return {
			dialog: false,
			search: "",
			headers: [
				{
					text: "Client",
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text pt-5 pb-5",
					align: "",
					sortable: false,
					value: "firstname",
					width: "100",
				},
				{
					text: "Phone",
					value: "phone",
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text",
					width: "90",
				},
				{
					text: "Email",
					value: "lastname",
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text",
					width: "90",
				},
				{
					text: "Status",
					value: "actor",
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text",
					width: "70",
				},
				{
					text: "Actions",
					value: "",
					sortable: false,
					class: "font-weight-bold grey lighten-4 pt-5 pb-5 blue-grey--text",
					width: "90",
				},
			],

			movies: [],
		};
	},
	computed: {
		allClients() {
			const getAllClients = store.getters["Admin/getAllClients"];
			return getAllClients.docs;
		},
	},
	methods: {
		randomColor() {
			const r = () => Math.floor(256 * Math.random());

			return `rgb(${r()}, ${r()}, ${r()})`;
		},
		getClientAvatar(poster) {
			let url = process.env.NODE_ENV !== "development" ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_API_URL;
			let image = !poster.length
				? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=="
				: `${url}/uploads/${image}`;
			return image;
		},
		async getAllClients() {
			const params = {
				limit: 500,
				page: 1,
				sort: { firstname: 1 },
			};
			const clients = await store.dispatch("Admin/gettingAllClient", params);
		},
	},
	created() {
		this.getAllClients();
	},
	filters: {
		formatNumber(val) {
			if (!val) return "";
			return numeral(val).format("0.00");
		},
	},
};
</script>

<style scoped>
.v-data-table .v-data-table__wrapper table,
.v-data-table table,
#customBorder {
	border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-text-field--solo-inverted.v-input--is-focused > .v-input__control > .v-input__slot input {
	color: #000 !important;
}
.card-icon {
	margin-top: -30px;
	padding-top: 35px;
	padding-bottom: 35px;
}
.v-btn:not(.v-btn--round).v-size--small {
	min-width: unset;
}
</style>