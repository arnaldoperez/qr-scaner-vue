import Vue from "vue";
import Router from "vue-router";
import home from "../views/Home";
import listado from "../views/Listado";
import registro from "../views/Registro";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: home
  },
  {
    path: "/listado",
    component: listado
  },
  {
    path: "/registro",
    component: registro
  },
  {
    path: "/registro/:id",
    component: registro,
    props: true
  }
];

export default new Router({
  routes,
  mode: "history"
});
