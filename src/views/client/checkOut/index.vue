<template>
	<checkOutPage :account="account" />
</template>

<script>
import checkOutPage from "Components/client/checkout";
import store from "Store";
import { mapGetters } from "vuex";
export default {
	name: "ClientCheckout",
	components: {
		checkOutPage,
	},
	data() {
		return {
			account: {},
		};
	},
	computed: {
		...mapGetters("Customer", {
			clientAccount: "getClientProfile",
			clientSession: "getClientSession",
		}),
	},
	created() {
		if (this.clientSession) {
			this.account = this.clientAccount;
		}
	},
};
</script>

<style>
</style>