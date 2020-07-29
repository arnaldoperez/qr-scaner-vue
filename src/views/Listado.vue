<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Listado</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Busqueda"
                single-line
                hide-details
              ></v-text-field>
            </v-card-text>
            <v-data-table
              :page.sync="page"
              :items-per-page="itemsPerPage"
              :headers="headers"
              :items="personsList"
              :search="search"
              class="elevation-1"
              loading-text="Cargando datos"
              :loading="!personsList"
              hide-default-footer
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
              <template v-slot:item.activo="{ item }">
                <v-icon v-if="item.activo" color="green" dark>mdi-checkbox-marked-circle</v-icon>
                <v-icon v-else color="red" dark>mdi-close-circle</v-icon>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon :to="'/registro/'+ item.cedula">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "listado",
  data() {
    return {
      headers: [
        {
          text: "Cedula",
          value: "cedula"
        },
        {
          text: "Nombre y apellido",
          value: "nombre"
        },
        {
          text: "Autorizado",
          value: "activo"
        },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      page: 1,
      itemsPerPage: 10,
      search: ""
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.personsList.length / this.itemsPerPage, 10);
    },
    ...mapGetters(["personsList"])
  }
};
</script>