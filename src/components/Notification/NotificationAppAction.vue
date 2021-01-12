<template>
	<notifications group="movie" animation-type="velocity" :animation="animation" width="28%">
		<template slot="body" slot-scope="props">
			<v-card class="ma-2">
				<v-list two-line subheader :color="props.item.type" dark>
					<v-list-item>
						<v-list-item-avatar>
							<v-icon class="white" :class="props.item.type != 'error' ? 'success--text' : 'error--text'">
								{{ props.item.type != "error" ? "mdi-check-outline" : "mdi-alert-octagon-outline" }}
							</v-icon>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title class="font-weight-bold">
								{{ props.item.title }}
							</v-list-item-title>
							<v-list-item-subtitle v-text="props.item.text" class="mt-1"></v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-action>
							<v-btn icon small @click="props.close">
								<v-icon color="white">mdi-close</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-card>
		</template>
	</notifications>
</template>

<script>
export default {
	name: "NotificationAppAction",
	data() {
		return {
			animation: {
				enter(element) {
					let height = element.clientHeight;
					return {
						height: [height, 0],
						opacity: [Math.random() * 0.85 + 0.85, 0]
					};
				},
				leave: {
					height: 0,
					opacity: 0
				}
			}
		};
	}
};
</script>

<style>
</style>