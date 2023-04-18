import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home/home.vue";
import Inventory from "../pages/inventory/inventory.vue";
import CarLoanApp from "../pages/car-loan-app/car-loan-app.vue";
import PersonalLoanApp from "../pages/personal-loan-app/personal-loan-app.vue";
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
    component: CarLoanApp,
  },
  {
    path: "/personal-loan-application",
    name: "Personal Loan Application",
    component: PersonalLoanApp,
  },
  {
    path: "/dealers",
    name: "Dealers",
    component: Dealers,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

export default router;
