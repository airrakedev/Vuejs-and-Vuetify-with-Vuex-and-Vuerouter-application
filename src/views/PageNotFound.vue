<template>
  <v-container
    fluid
    class="mt-8"
  >
    <v-row
      class="fill-height mt-8"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card class="pa-5">
          <v-card-text class="pt-5">
            <h1 class="display-4 text-lg-center font-weight-black">
              4
              <span class="primary--text">0</span> 3
            </h1>
            <h4 class="headline text-lg-center mt-3">
              {{errorMessage}}
            </h4>
          </v-card-text>
          <v-card-actions class="pb-5 mb-5">
            <v-spacer />

            <router-link to="/">
              <v-btn class="pa-6 mt-4 blue darken-2 white--text">HOME</v-btn>
            </router-link>

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageNotFound',
  props: {
    errorMessage: {
      type: String,
      default: "The page you requested could not be found!"
    },
  }
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>