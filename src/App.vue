<template>
    <router-view></router-view>
</template>

<script>
import router from "./Routes";
import axios from "axios";

export default {
  name: "app",
  methods: {
    logout: function() {
      axios.get("/api/logout").then(() => {
        this.$store.commit('updateUser', '');
        router.push("/");
      });
    },
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat|Raleway|Roboto:300,400,700");
@import url("https://use.fontawesome.com/releases/v5.8.2/css/all.css");
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css");
@import url("./assets/styles/master.css");
</style>
