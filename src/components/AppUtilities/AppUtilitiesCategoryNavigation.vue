<template>

  <v-row v-if="getAllMovies.docs.length > 0">
    <v-col cols="12">
      <v-card
        flat
        color="#eee"
      >
        <v-card-actions>
          <template v-for="(navcat, index) in categoryNavigation">
            <v-btn
              :ref="`active`"
              :key="navcat.name"
              text
              :class="{'light-blue darken-2 white--text': navcat.params.length < 1, 'light-blue--text text--darken-2':navcat.params.length > 0}"
              class="dynamic-category ma-sm-0  font-weight-bold"
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
import { mapGetters } from 'vuex'
export default {
  name: "AppUtilitiesCategoryNavigation",
  props: {
    categoryNavigation: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('Admin', ['getAllMovies'])
  },
  data () {
    return {
      clickActive: "category-active"
    };
  },
};
</script>
