<template>
  <!-- AVAILABLE MOVIES -->
  <availableMovies></availableMovies>
</template>

<script>
// COMPONENTS
import availableMovies from "Components/dashboard/available-movies";

export default {
  name: "main-dashboard",
  components: {
    availableMovies
  },
  data () {
    return {};
  }
};
</script>
