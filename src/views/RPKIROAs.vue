<template>
  <BasicLayout>
    <h1>ROAS para <span style="color:blue"> {{orga}}</span></h1>
    <div class="ui grid">
    <div  class="sixten wide mobile eight wide tablet four wide computer column"
        v-for="delegation in delegations"
        :key="delegation.name"
      >
        <Roa :delegation="delegation" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BasicLayout from "../layouts/BasicLayout";
import Roa from "../components/Roa";

import { getROAs } from "../api/api";
import { getOrgId } from "../api/token";

export default {
  name: "RPKICertificate",
  components: {
    BasicLayout,
    Roa,
  },
  watch: {
    $route(to, from) {
      console.log(to.params.ip);
      console.log(to.params.prefix);

    },
  },
  setup() {
    let delegations = ref(null);
    const orgId =  getOrgId();
    let orga = ref({});
    orga.value = orgId;
    const router = useRouter();
    const { params } = useRoute();

    onMounted(() => {
      console.log("mounted" + params.ip + " " + params.prefix)
      getROAsC(orgId);
    });

    const getROAsC = async (category) => {
      const response = await getROAs(category);
      delegations.value = response;
    };

    

    return {
      getROAsC,
      delegations,
      orga,
    };
  },
};
</script>

<style>
</style>