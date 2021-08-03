<template>
  <Modal :show="registrationDialog">
    <template #title>
      <v-toolbar
        dark
        elevation="0"
      >
        <v-toolbar-title class="font-weight-bold">
          Create your account
        </v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </template>

    <FormsRegistration
      ref="registrationForm"
      :form="newUser"
      @submit.prevent
      :key="`Form_${formId}`"
    >
      <template #submitted>
        <v-btn
          class="pl-5 pr-5"
          dark
          @click.prevent="submit"
        >Submit</v-btn>
      </template>
    </FormsRegistration>
  </Modal>
</template>

<script>
// EXTERNAL

import { eventEmitter } from "Event";

// COMPONENT
import Modal from "Components/Modal";
import FormsRegistration from "Components/Forms/FormsRegistration";

export default {
  components: {
    Modal,
    FormsRegistration
  },
  name: "client-registration",
  props: ["dialog"],

  data () {
    return {
      formId: 1,
      newUser: {
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        address: ""
      }
    };
  },
  computed: {
    registrationDialog () {
      return this.dialog;
    }
  },
  methods: {
    showLoginForm () {
      eventEmitter.$emit("display-login-form", {});
    },
    submit () {
      // if not validated
      if (this.$refs.registrationForm.$v.$invalid) return;

      try {
        this.$refs.registrationForm
          .submit()
          .then(payload => {
            this.$store
              .dispatch("Customer/submitClientRegistration", payload)
              .then(res => {
                this.closeRegistrationDialog();
                this.showLoginForm();
              })
              .catch(err => {
                console.log(err, "Error client registration.");
              });
          })
          .catch(error => console.log(error.message, "catch error"));
      } catch (error) {
        console.log(error.message, "totally error");
      }
    },

    closeRegistrationDialog () {
      eventEmitter.$emit("close-dialog-registration", {});
    }
  },
  created () {
    // this.displayRegistrationFrom();
  }
};
</script>

<style></style>
