<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text icon color="pink" v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{customer.firstname}} {{customer.lastname}}</v-list-item-title>
              <v-list-item-subtitle>{{customer.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list rounded>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-box-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>My Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-playlist-edit</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Records</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon>mdi-power-standby</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),
  methods: {
    logout() {
      this.$store.commit("LOGOUT_USER");
    }
  },
  computed: {
    customer() {
      return this.$store.getters.getClientProfile;
    }
  }
};
</script>