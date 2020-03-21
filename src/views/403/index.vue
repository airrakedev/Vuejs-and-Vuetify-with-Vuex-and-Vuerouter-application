<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-5">
          <v-card-text class="pt-5">
            <h1 class="display-4 text-lg-center font-weight-black">
              4
              <span class="primary--text">0</span> 3
            </h1>
            <h4 class="headline text-lg-center mt-3">The page you requested could not be found</h4>
          </v-card-text>
          <v-card-actions class="pb-5 mb-5">
            <v-spacer />

            <router-link to="/">
              <v-btn dark class="pl-5 pr-5 mt-4">HOME</v-btn>
            </router-link>

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>