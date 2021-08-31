<template>
  <BasicLayout>
    <h1>Mis Recursos</h1>
     <div class="ui grid">
      <div
        class="sixten wide mobile eight wide tablet four wide computer column"
        v-for="asn in asns"
        :key="asn.handle">
         <div class="ui card product">
    <div class="image">
      <img src="https://definicion.mx/wp-content/uploads/2014/01/network.jpg"/>
    </div>
    <div class="content">
      <div class="header">{{ asn.handle }}</div>
      <div class="description">{{ asn.objectClassName }} </div>
    </div>
       <a class="ui button primary" v-bind:href="'/asn/edit/' + asn.handle.split('AS')[1]">
    Ver/Editar Contactos
    </a>
  </div>
      </div>
    </div>
    <div class="ui grid">
      <div
        class="sixten wide mobile eight wide tablet four wide computer column"
        v-for="resource in resources"
        :key="resource.handle"
      >
        <IPBlock :bloque="resource" />
      </div>
    </div>
   
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "../layouts/BasicLayout";
import { getResources } from "../api/api";
import IPBlock from "../components/IPBlock";
import { getTokenApi } from "../api/token";


export default {
  name: "Home",
  components: {
    BasicLayout,
    IPBlock,
  },
  setup() {
    let resources = ref(null);
    let asns = ref(null);
    const token = getTokenApi();

    onMounted(async () => {
      if (!token)
      
      window.location="/login";
     
      const response = await getResources();
      resources.value = response.networks;
      asns.value = response.autnums;
    });

    return {
      resources,
      asns,
    };
  },
};
</script>

<style lang="scss" scoped>
.product {
  &:hover {
    .ui.button {
      min-height: 36px;
    }
  }

  .ui.button {
    max-height: 0;
    min-height: 0;
    overflow: hidden;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: min-height 0.6s ease;
  }
}
</style>