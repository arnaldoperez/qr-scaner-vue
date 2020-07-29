<template>
  <v-app-bar :prominent="$vuetify.breakpoint.xsOnly">
    <v-toolbar-title :style="$vuetify.breakpoint.xsOnly?'position:absolute':''">ZODI Barinas</v-toolbar-title>

    <v-btn to="/">
      <v-icon>mdi-qrcode</v-icon>Escaner
    </v-btn>
    <v-btn to="/listado">
      <v-icon>mdi-view-list</v-icon>Listado
    </v-btn>
    <v-btn to="/registro">
      <v-icon>mdi-account-multiple</v-icon>Registro
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "playground",
  data: () => ({
    //
  })
};
</script>
