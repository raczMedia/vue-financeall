import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home/home.vue";
import Inventory from "../pages/inventory/inventory.vue";
import FreeCreditCheck from "../pages/free-credit-check/free-credit-check.vue";
import ValueMyTradeIn from "../pages/value-my-trade-in/value-my-trade-in.vue";
import FinanceApp from "../pages/finance-app/finance-app.vue"

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
    path: "/finance-app",
    name: "FinanceApp",
    component: FinanceApp,
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

export default router;
