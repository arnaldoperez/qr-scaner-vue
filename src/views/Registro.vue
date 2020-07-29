<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Registro</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-form ref="form">
              <v-card-text>
                <v-text-field
                  v-model="nombre"
                  :rules="nombreRules"
                  :counter="50"
                  prepend-inner-icon="mdi-border-color"
                  label="Nombre y apellido"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="cedula"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  :rules="cedulaRules"
                  :readonly="!!id"
                  :counter="9"
                  label="Cedula"
                  required
                ></v-text-field>
                <v-switch v-model="activo" class="ma-4" label="Autorizado"></v-switch>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="submit" :enabled="!loading" color="success" class="white--text">
                  <v-icon>mdi-pencil</v-icon>Guardar
                </v-btn>
                <v-btn
                  @click="submitDelete"
                  :enabled="!loading"
                  v-if="!!id"
                  color="error"
                  class="white--text"
                >
                  <v-icon>mdi-delete</v-icon>Eliminar
                </v-btn>
              </v-card-actions>
            </v-form>
            <v-progress-linear v-show="loading" indeterminate color="primary darken-2"></v-progress-linear>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ mensaje }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">Ok</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "registro",
  created() {
    if (this.id) {
      this.cedula = this.id;
      this.nombre = this.personas[this.id].nombre;
      this.activo = this.personas[this.id].activo;
    }
  },
  data() {
    return {
      nombre: "",
      nombreRules: [v => !!v || "El nombre es requerido"],
      cedula: "",
      cedulaRules: [
        v => !!v || "La cedula es requerida",
        v =>
          /[VEPvep]\d+/.test(v) ||
          "La cedula debe empezar con V, E o P seguido del número"
      ],
      activo: false,
      mensaje: "",
      snackbar: false,
      loading: false
    };
  },
  props: ["id"],
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        axios
          .put(
            `https://gfwebhook-test.firebaseio.com/zodi/${this.cedula}.json`,
            this.apiData
          )
          .then(result => {
            this.mensaje = "Datos guardados";
            this.snackbar = true;
            this.$store.dispatch("loadData");
          })
          .catch(error => {
            this.mensaje = error.message;
            this.snackbar = true;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    submitDelete() {
      if (this.id) {
        this.loading = true;
        axios
          .delete(
            `https://gfwebhook-test.firebaseio.com/zodi/${this.cedula}.json`
          )
          .then(result => {
            this.mensaje = "Datos eliminados";
            this.snackbar = true;
            this.cedula = "";
            this.nombre = "";
            this.$store.dispatch("loadData");
          })
          .catch(error => {
            this.mensaje = error.message;
            this.snackbar = true;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  },
  computed: {
    apiData() {
      return {
        nombre: this.nombre,
        activo: this.activo
      };
    },
    ...mapState(["personas"])
  },
  watch: {
    snackbar(oldVal, newVal) {
      if (newVal === true) {
        this.$router.push("/listado");
      }
    }
  }
};
</script>

<style>
</style>
