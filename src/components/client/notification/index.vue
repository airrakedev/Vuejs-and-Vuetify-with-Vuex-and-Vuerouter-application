<template>
	<v-row align="center" justify="space-around">
		<v-menu v-if="countMyMovieList.length" v-model="clientNotice" :close-on-content-click="false" :nudge-width="200" offset-x>
			<template v-slot:activator="{ on }">
				<v-btn v-on="on" color="gray" icon class="mr-2">
					<v-badge bordered color="primary" left overlap :content="countMyMovieList.length">
						<v-icon color="blue-grey">mdi-cart-outline</v-icon>
					</v-badge>
				</v-btn>
			</template>

			<!-- CLIENT MOVIE LISTING -->
			<myMovieListing @close-me="clientNotice = false"></myMovieListing>
		</v-menu>

		<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
			<template v-slot:activator="{ on }">
				<v-btn color="gray" icon>
					<v-icon v-on="on" color="blue-grey">mdi-account-circle</v-icon>
				</v-btn>
			</template>

			<v-card>
				<v-list dark>
					<v-list-item>
						<v-list-item-avatar>
							<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title class="font-weight-bold">{{ customer.firstname }} {{ customer.lastname }}</v-list-item-title>
							<v-list-item-subtitle class="font-weight-light">{{ customer.email }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-list>
					<v-list-item-group color="primary">
						<router-link :to="{ name: 'ClientProfile' }">
							<v-list-item>
								<v-list-item-icon>
									<v-icon color="blue-grey">mdi-account-box-outline</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold">My Profile</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</router-link>
						<router-link :to="{ name: 'MovieRecord' }">
							<v-list-item>
								<v-list-item-icon>
									<v-icon color="blue-grey">mdi-filmstrip</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold">My Records</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</router-link>
						<v-list-item @click="logout()">
							<v-list-item-icon>
								<v-icon color="error">mdi-power-standby</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title class="font-weight-bold">Logout</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-card>
		</v-menu>
	</v-row>
</template>

<script>
import myMovieListing from "Components/client/movie-listing";
import store from "Store";
export default {
	components: {
		myMovieListing,
	},
	data: () => ({
		fav: true,
		menu: false,
		clientNotice: false,
		message: false,
		hints: true,
		countlist: 10,
	}),
	methods: {
		async logout() {
			await store.commit("Customer/LOGOUT_USER");
		},
	},
	computed: {
		customer() {
			return store.getters["Customer/getClientProfile"];
		},
		countMyMovieList() {
			return store.getters["Customer/getClientList"];
		},
	},
};
</script>
<style scoped>
.v-application a {
	text-decoration: none;
}
</style>