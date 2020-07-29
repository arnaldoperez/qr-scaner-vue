<template functional>
  <v-card class="elevation-12">
    <v-toolbar class="d-flex justify-center" color="primary" dark flat>
      <v-toolbar-title>{{props.nombre}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text v-if="props.found">
      <v-container>
        <v-row>
          <v-col cols="6" class="text-right">Cedula</v-col>
          <v-col cols="6" class="font-weight-black text-left">{{props.cedula}}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="text-right">Autorizado</v-col>
          <v-col cols="6" class="text-left">
            <v-icon v-if="props.activo" color="green" dark>mdi-checkbox-marked-circle</v-icon>
            <v-icon v-else color="red" dark>mdi-close-circle</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
