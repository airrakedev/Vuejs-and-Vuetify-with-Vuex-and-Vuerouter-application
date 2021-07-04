<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        lg="5"
        sm="8"
        md="5"
      >
        <v-card class="elevation-1 pa-5 pl-7 pr-7">
          <v-row no-gutters>
            <v-col class="text-center">
              <h2 class="pt-1 pb-2 font-weight-bold teal--text">Welcome</h2>
              <p class="font-weight-bold blue-grey--text">Signin to your account</p>
              <v-icon
                color="info"
                large
              >mdi-account-key-outline</v-icon>
            </v-col>
          </v-row>

          <v-card-text class="pa-0 mt-5">
            <form
              class="pa-0"
              @submit.prevent="submit"
            >
              <label class="font-weight-bold grey--text">Email</label>
              <v-text-field
                placeholder="email@email.com"
                append-icon="mdi-email-outline"
                solo
                type="text"
                class="mt-1 mb-0"
                v-model="newUser.email"
                @input="$v.newUser.email.$touch()"
                @blur="$v.newUser.email.$touch()"
                :error-messages="emailErrors"
              />
              <label class="font-weight-bold grey--text">Password</label>
              <v-text-field
                placeholder="Password"
                append-icon="mdi-lock-outline"
                solo
                class="mt-1"
                type="password"
                v-model="newUser.password"
                @input="$v.newUser.password.$touch()"
                @blur="$v.newUser.password.$touch()"
                :error-messages="passwordErrors"
              />
              <div
                class="pb-5 pr-0 pl-0 mt-3"
                align="center"
                justify="center"
              >
                <v-btn
                  outlined
                  tile
                  block
                  height="50"
                  width="150"
                  dark
                  color="teal"
                  class="login-button font-weight-bold pl-0 pr-0 mb-0 mt-0"
                  type="submit"
                >Login</v-btn>
              </div>
            </form>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, email } = require("vuelidate/lib/validators");

export default {
  mixins: [validationMixin],
  validations: {
    newUser: {
      password: { required },
      email: { required, email }
    }
  },
  data () {
    return {
      newUser: {
        password: "",
        email: ""
      }
    };
  },
  computed: {
    passwordErrors () {
      const errors = [];
      if (!this.$v.newUser.password.$dirty) return errors;
      !this.$v.newUser.password.required && errors.push("Password is required.");
      return errors;
    },
    emailErrors () {
      const errors = [];
      if (!this.$v.newUser.email.$dirty) return errors;
      !this.$v.newUser.email.required && errors.push("Email is required.");
      !this.$v.newUser.email.email && errors.push("Provide valid email.");
      return errors;
    }
  },
  methods: {
    submit () {

      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      this.$store
        .dispatch("Admin/adminLogin", this.newUser)
        .then(res => {
          console.log(this.$store.getters["Admin/getAdminSessionStatus"], "Admin Login");
        })
        .catch(err => console.log(err, "From login page error control"));
    }
  }
};
</script>

<style scoped>
.login-button {
  border-width: 2px;
}
.v-text-field__details {
  margin-bottom: 0px !important;
}
</style>