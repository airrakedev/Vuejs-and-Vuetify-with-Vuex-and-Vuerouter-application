<template>
    <v-card>
        <v-toolbar dark flat>
            <v-toolbar-title>My List</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="closeMe">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list two-line subheader>
            <v-list-item v-for="item in items" :key="item.title">
                <v-list-item-action class="mr-2">
                    <v-list-item-title v-text="item.qty"></v-list-item-title>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="ml-4 mr-4">
                    <v-list-item-action-text>P {{item.unitPrice}}</v-list-item-action-text>
                </v-list-item-action>

                <v-list-item-action class="ml-0">
                    <v-btn-toggle dark dense group>
                        <v-btn icon small>
                            <v-icon small>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn icon small>
                            <v-icon small>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn icon small>
                            <v-icon color="pink" small>mdi-close</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Total -->
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Grand Total</v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-action>
                    <v-list-item-title>P 1340500</v-list-item-title>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: "client-movie-listing",
    data() {
        return {
            items: [
                {
                    iconClass: "grey lighten-1 white--text",
                    title: "Runaway train",

                    qty: 2,
                    unitPrice: 150,
                    unitTotal: 300
                },
                {
                    iconClass: "grey lighten-1 white--text",
                    title: "Listen to your Heart",

                    qty: 3,
                    unitPrice: 100,
                    unitTotal: 300
                },
                {
                    iconClass: "grey lighten-1 white--text",
                    title: "When Love and Hate Collide",

                    qty: 1,
                    unitPrice: 150,
                    unitTotal: 150
                }
            ]
        };
    },
    methods: {
        closeMe() {
            this.$emit("close-me", {});
        }
    }
};
</script>

<style scoped>
</style>
