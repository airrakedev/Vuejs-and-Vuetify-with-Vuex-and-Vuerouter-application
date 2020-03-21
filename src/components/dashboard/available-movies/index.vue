<template>
  <v-container fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-col v-for="(card, i) in cards" :key="i" md="2">
        <v-card dark>
          <v-img :src="`https://picsum.photos/200/300?image=${getImage()}`" height="300px"></v-img>
          <v-card-title class="pb-1">Cafe Badilico</v-card-title>
          <v-card-text class="pb-1">
            <div>P 150</div>
          </v-card-text>
          <v-card-text class="pt-2">
            <v-row align="center" class="mx-0">
              <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>
          <v-card-actions dark>
            <v-btn icon small>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded @click="registerUser">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { eventEmitter } from "Event";

export default {
  name: "available-movies",
  data() {
    return {
      fav: true,

      message: false,
      hints: true,

      cards: [
        {
          title: "Good"
        },
        {
          title: "Best"
        },
        {
          title: "Finest"
        },
        {
          title: "Mode"
        },
        {
          title: "Mode"
        },
        {
          title: "Mode"
        }
      ]
    };
  },
  methods: {
    registerUser() {
      eventEmitter.$emit("open-registration", {});
    },
    getImage() {
      const min = 550;
      const max = 560;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>

<style scoped>
</style>