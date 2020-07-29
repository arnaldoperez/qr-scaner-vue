<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4">
          <qr-scanner v-if="!result" @on-decode="onDecode"></qr-scanner>
          <div v-else>
            <person :nombre="nombre" :cedula="cedula" :activo="activo" :found="!!cedula"></person>
            <v-btn block class="elevation-12" color="success" @click="result=''">Activar escaner</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import QrScanner from "../components/Scanner";
import Person from "../components/Person";
import { mapState } from "vuex";
export default {
  components: {
    QrScanner,
    Person
  },
  data() {
    return {
      result: "",
      nombre: "",
      cedula: "",
      activo: false
    };
  },
  methods: {
    onDecode(scanResult) {
      this.result = scanResult;
      let persona = this.personas[this.getCedula];
      if (persona) {
        this.nombre = persona.nombre;
        this.cedula = this.getCedula;
        this.activo = persona.activo;
      } else {
        this.nombre = "Cedula no registrada";
        this.cedula = "";
        this.activo = false;
      }
    }
  },
  computed: {
    getCedula() {
      if (this.result === "") {
        return "";
      } else {
        let arr = this.result.split("/");
        return arr[arr.length - 1];
      }
    },
    ...mapState(["personas"])
  }
};
</script>

<style>
</style>
