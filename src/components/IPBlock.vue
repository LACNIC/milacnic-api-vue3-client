<template>
  <div class="ui card product">
    <div class="image">
      <img src="https://img.kytary.com/eshop_es/velky_v2/na/637523577990570000/0a94afbc/64838058/pyramid-bass-cube.jpg"/>
    </div>
    <div class="content">
      <div class="header">{{ bloque.handle }}</div>
      <div class="description">{{ bloque.ipVersion }} </div>
    </div>
   <a class="ui button primary" v-bind:href="'/delegations/detail/' + bloque.handle">
    Ver Delegaciones
    </a>
     <a class="ui button primary" v-bind:href="'/ip/edit/' + bloque.handle">
    Ver/Editar Contactos
    </a>
  </div>
</template>

<script>
import { API_URL } from "../utils/constants";
import { useRouter, useRoute} from "vue-router";

export default {
  name: "IPBlock",
  props: {
    bloque: Object,
  },
   watch: {
    $route(to, from) {
      console.log(to.params.ip);
      console.log(to.params.prefix);

    },
  },
  setup(props) {
    const { params } = useRoute();

    const router = useRouter();

    return {
      API_URL,
      params
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