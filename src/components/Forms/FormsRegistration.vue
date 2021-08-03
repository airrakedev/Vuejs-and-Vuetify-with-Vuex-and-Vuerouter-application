<template>
  <v-card-text class="pb-0">
    <v-container class="pb-0">
      <form class="pb-4">
        <v-row>
          <template v-for="field in registrationFields">
            <v-col
              :cols="field.width.cols"
              :md="field.width.md"
              :sm="field.width.sm"
              :key="field.id"
            >
              <label
                for
                class="blue-grey--text font-weight-bold"
              >{{ field.name }}</label>
              <v-text-field
                :type="field.subType"
                v-model="newUser[field.id]"
                @input="newUser[field.errorMessage] ? $v.newUser[field.id].$touch() : ''"
                @blur="newUser[field.errorMessage] ? $v.newUser[field.id].$touch() : ''"
                :rules="[formRulesValidation(field.id)]"
                :placeholder="`${field.name} is required`"
                :append-icon="field.icon"
                solo
                autofocus
                class="mt-1"
              ></v-text-field>
            </v-col>
          </template>
        </v-row>

        <v-card-actions class="pa-3 pt-1">
          <span class="font-weight-medium grey--text">
            Have account already?
            <a
              href="#"
              @click.prevent="alreadyHasAccount"
            >Login Here</a>
          </span>
          <v-spacer></v-spacer>
          <v-btn
            class="pl-5 pr-5"
            dark
            @click="closeRegistrationDialog"
          >Close</v-btn>
          <slot name="submitted"></slot>
        </v-card-actions>
      </form>
    </v-container>
  </v-card-text>
</template>	

<script>
// EXTERNAL
import { validationMixin } from "vuelidate";
const { required, email, sameAs } = require("vuelidate/lib/validators");
import { eventEmitter } from "Event";

export default {
  name: "client-registration",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  mixins: [validationMixin],
  validations: {
    newUser: {
      firstname: { required },
      lastname: { required },
      password: { required },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: { required, email },
      phone: { required }
    }
  },
  data () {
    return {
      newUser: { ...this.form },
      registrationFields: [
        {
          id: "firstname",
          name: "Firstname",
          type: "text",
          subType: "text",
          errorMessage: true,
          icon: "mdi-account-circle",
          width: {
            md: "6",
            sm: "12",
            cols: "12"
          }
        },
        {
          id: "lastname",
          name: "Lastname",
          errorMessage: true,
          type: "text",
          subType: "text",
          icon: "mdi-account-circle",
          width: {
            md: "6",
            sm: "12",
            cols: "12"
          }
        },
        {
          id: "password",
          name: "Password",
          errorMessage: true,
          type: "text",
          subType: "password",
          icon: "mdi-lock-open",
          width: {
            md: "6",
            sm: "12",
            cols: "12"
          }
        },
        {
          id: "confirmPassword",
          name: "Confirm Password",
          errorMessage: true,
          type: "text",
          subType: "password",
          icon: "mdi-lock",
          width: {
            md: "6",
            sm: "12",
            cols: "12"
          }
        },
        {
          id: "email",
          name: "Email",
          errorMessage: true,
          type: "text",
          subType: "text",
          icon: "mdi-email",
          width: {
            md: "6",
            sm: "12",
            cols: "12"
          }
        },
        {
          id: "phone",
          name: "Phone",
          errorMessage: true,
          type: "text",
          subType: "text",
          icon: "mdi-phone",
          width: {
            md: "6",
            sm: "12",
            cols: "12"
          }
        },
        {
          id: "address",
          name: "Address",
          errorMessage: false,
          type: "text",
          subType: "text",
          icon: "mdi-map-marker",
          width: {
            md: "12",
            sm: "12",
            cols: "12"
          }
        }
      ]
    };
  },
  computed: {
    registrationDialog () {
      return this.dialog;
    }
    // firstnameErrors() {
    // 	let errors = "";
    // 	if (!this.$v.newUser.firstname.$dirty) return errors;
    // 	if (!this.$v.newUser.firstname.required) return (errors = "Firstname is required.");
    // 	return errors;
    // },
    // lastnameErrors() {
    // 	let errors = "";
    // 	if (!this.$v.newUser.lastname.$dirty) return errors;
    // 	if (!this.$v.newUser.lastname.required) return (errors = "Lastname is required.");
    // 	return errors;
    // },
    // passwordErrors() {
    // 	let errors = "";
    // 	if (!this.$v.newUser.password.$dirty) return errors;
    // 	if (!this.$v.newUser.password.required) return (errors = "Password is required.");
    // 	return errors;
    // },
    // confirmPasswordErrors() {
    // 	let errors = "";
    // 	if (!this.$v.newUser.confirmPassword.$dirty) return errors;
    // 	if (!this.$v.newUser.confirmPassword.required) return (errors = "Confirm password is required.");
    // 	if (!this.$v.newUser.confirmPassword.sameAsPassword) return (errors = "Please confirm your password.");
    // 	return errors;
    // },
    // phoneErrors() {
    // 	let errors = "";
    // 	if (!this.$v.newUser.phone.$dirty) return errors;
    // 	if (!this.$v.newUser.phone.required) return (errors = "Phone is required.");
    // 	return errors;
    // },
    // emailErrors() {
    // 	let errors = "";
    // 	if (!this.$v.newUser.email.$dirty) return errors;
    // 	if (!this.$v.newUser.email.required) return (errors = "Email is required.");
    // 	if (!this.$v.newUser.email.email) return (errors = "Provide valid email.");
    // 	return errors;
    // }
  },
  methods: {
    formRulesValidation (fieldName) {
      let upper = fieldName.toUpperCase();

      if (!this.$v.newUser[fieldName]) return true;

      if (!this.$v.newUser[fieldName].required) return `${upper} is required`;

      if (!this.$v.newUser[fieldName].email && fieldName === "email") return `${upper} should be valid`;

      if (!this.$v.newUser[fieldName].sameAsPassword && fieldName === "confirmPassword") return "Confirm password should be same as password above";

      return true;
    },

    submit () {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      delete this.newUser.confirmPassword;

      return new Promise((resolve, reject) => {
        if (this.$v.$invalid) {
          return reject("There are required fields.");
        }

        return resolve({ ...this.newUser });
      });
    },
    alreadyHasAccount () {
      this.closeRegistrationDialog();
      this.showLoginForm();
    },

    closeRegistrationDialog () {
      eventEmitter.$emit("close-dialog-registration", {});
    },
    showLoginForm () {
      eventEmitter.$emit("display-login-form", {});
    }
  },
  created () {
    // this.displayRegistrationFrom();
  }
};
</script>

<style></style>
