import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    personas: {}
  },
  actions: {
    loadData(context) {
      axios
        .get("https://gfwebhook-test.firebaseio.com/zodi.json")
        .then(result => {
          store.commit("serPersons", result.data);
        })
        .catch(error => {
          store.commit("serPersons", {});
        });
    }
  },
  getters: {
    personsList(state) {
      let lista = [];
      Object.keys(state.personas).forEach((val, index) => {
        lista.push({ ...state.personas[val], cedula: val });
      });
      return lista;
    }
  },
  mutations: {
    serPersons(state, data) {
      state.personas = data;
    }
  }
});

export default store;
