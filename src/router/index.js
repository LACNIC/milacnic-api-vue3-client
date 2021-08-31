import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Delegations from "../views/Delegations.vue";
import NewDelegation from "../views/NewDelegation.vue";

import EditOrg from "../views/EditOrg.vue";
import EditDelegation from "../views/EditOrg.vue";

import RPKICertificate from "../views/RPKICertificate.vue";
import RPKIROAs from "../views/RPKIROAs.vue";
import EditIp from "../views/EditIp.vue";
import EditAsn from "../views/EditAsn.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/delegations/new/:ip/:prefix",
    name: "NewDelegation",
    component: NewDelegation,
  },
  {
    path: "/rpki/certificate",
    name: "RPKICertificate",
    component: RPKICertificate,
  },
  {
    path: "/rpki/roas",
    name: "RPKIROAs",
    component: RPKIROAs,
  },
  {
    path: "/delegations/detail/:ip/:prefix",
    name: "Delegations",
    component: Delegations,
  },
  {
    path: "/organization/edit",
    name: "EditOrg",
    component: EditOrg,
  },
  {
    path: "/ip/edit/:ip/:prefix",
    name: "EditIp",
    component: EditIp,
  },
  {
    path: "/asn/edit/:asn",
    name: "EditAsn",
    component: EditAsn,
  },
  {
    path: "/delegations/edit/:ip/:prefix",
    name: "EditDelegation",
    component: EditDelegation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
