<template>
	<v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app elevation="1" color="white">
		<!-- <v-btn class="mx-2" small fab flat dark color="grey"> -->
		<!-- <v-app-bar-nav-icon @click="toggleDrawer" color="cyan lighten-1" /> -->
		<v-btn class="pa-2" fab dark @click="toggleDrawer" small color="grey lighten-2" elevation="0">
			<v-icon>{{drawerStatus? 'mdi-view-dashboard-outline' : 'mdi-dots-vertical'}}</v-icon>
		</v-btn>
		<!-- </v-btn> -->

		<v-toolbar-title class="ml-0 pl-4">
			<span class="hidden-sm-and-down teal--text">My Dashboard</span>
		</v-toolbar-title>

		<v-spacer />

		<!-- <v-btn icon v-on="on">
      <v-icon>mdi-bell</v-icon>
		</v-btn>-->

		<div class="text-center">
			<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-icon color="teal" large>mdi-account-circle-outline</v-icon>
					</v-btn>
				</template>

				<v-card>
					<v-list>
						<v-list-item>
							<v-list-item-avatar>
								<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title
									class="teal--text font-weight-bold"
								>{{clientData.firstname}} {{clientData.lastname}}</v-list-item-title>
								<v-list-item-subtitle class="font-weight-medium">{{clientData.email}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>

					<v-divider></v-divider>

					<v-list>
						<router-link :to="{name:'ClientProfile'}">
							<v-list-item link>
								<v-list-item-action>
									<v-icon>mdi-account-box</v-icon>
								</v-list-item-action>
								<v-list-item-title class="font-weight-bold">My Profile</v-list-item-title>
							</v-list-item>
						</router-link>

						<v-list-item @click="logout()">
							<v-list-item-action>
								<v-icon color="pink">mdi-power-standby</v-icon>
							</v-list-item-action>
							<v-list-item-title class="font-weight-bold">Logout</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>
		</div>
	</v-app-bar>
</template>

<script>
import session from "Session";
import store from "Store";
export default {
	name: "AdminHeader",
	data: () => ({
		menu: false,
	}),
	methods: {
		toggleDrawer() {
			this.$store.dispatch("Global/toggleDrawer");
		},
		logout() {
			store.commit("Customer/LOGOUT_USER");
			this.$router.push({ name: "main-dashboard" });
		},
	},
	computed: {
		clientData() {
			return store.getters["Customer/getClientProfile"];
		},
		drawerStatus() {
			return this.$store.getters["Global/getDrawerStatus"];
		},
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
}
</style>