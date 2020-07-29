import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    personas: {}
  },
  actions: {},
  getters: {
    personsList() {}
  },
  mutations: {
    serPersons(state) {
      state.count++;
    }
  }
});

export default store;
