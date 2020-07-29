<template>
  <v-app>
    <v-main class="main">
      <navbar></navbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    navbar
  },
  created() {
    this.$store.dispatch("loadData");
  }
};
</script>
<style>
.main {
  background: url("https://firebasestorage.googleapis.com/v0/b/gfwebhook-test.appspot.com/o/IMAGENQRZODI.png?alt=media&token=6e1ec761-f3a7-4df8-b9ed-c2c5838350e4")
    no-repeat fixed center;
}
</style>
