import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home/home.vue";
import Inventory from "../pages/inventory/inventory.vue";
import FinanceApp from "../pages/finance-app/finance-app.vue";
import Dealers from "../pages/dealers/dealers.vue";

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
    path: "/car-loan-application",
    name: "Car Loan Application",
    component: FinanceApp,
  },
  {
    path: "/personal-loan-application",
    name: "Personal Loan Application",
    component: FinanceApp,
  },
  {
    path: "/dealers",
    name: "Dealers",
    component: Dealers,
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
