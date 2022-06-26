import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home/home.vue";
import Inventory from "../pages/inventory/inventory.vue";
import Resources from "../pages/resources/resources.vue";
import FreeCreditCheck from "../pages/free-credit-check/free-credit-check.vue";
import ValueMyTradeIn from "../pages/value-my-trade-in/value-my-trade-in.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory,
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources,
  },
  {
    path: "/value-my-trade-in",
    name: "ValueMyTradeIn",
    component: ValueMyTradeIn,
  },
  {
    path: "/free-credit-check",
    name: "FreeCreditCheck",
    component: FreeCreditCheck,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;