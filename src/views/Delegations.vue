<template>
  <BasicLayout>
    <h1>Delegaciones para {{$route.params.ip}}/{{$route.params.prefix}}</h1>
    <a v-bind:href="'/delegations/new/' + $route.params.ip + '/' + $route.params.prefix" class="ui button fluid primary" >
          Nueva Delegación
        </a>
    <div class="ui grid">
    <div  class="sixten wide mobile eight wide tablet four wide computer column"
        v-for="delegation in delegations"
        :key="delegation.ipnetwork_range.start_address"
      >
        <Delegation :delegation="delegation" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "../layouts/BasicLayout";
import Delegation from "../components/Delegation";
import { getDelegations } from "../api/api";

export default {
  name: "Delegations",
  components: {
    BasicLayout,
    Delegation,
  },
  watch: {
    $route(to, from) {
      console.log(to.params.ip);
      console.log(to.params.prefix);

      this.getDelegationsC(to.params.ip + to.params.prefix);
    },
  },
  setup() {
    let delegations = ref(null);
    const { params } = useRoute();

    onMounted(() => {
      console.log("mounted" + params.ip + " " + params.prefix)
      getDelegationsC(params.ip + "/" + params.prefix);
    });

    const getDelegationsC = async (category) => {
      const response = await getDelegations(category);
      delegations.value = response;
    };

    return {
      getDelegationsC,
      delegations,
    };
  },
};
</script>

<style>
</style>