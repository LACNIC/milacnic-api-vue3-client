<template>
  <BasicLayout>
    <h1>Certificado para <span style="color:blue"> {{orga}}</span></h1>
    <a class="ui button primary"  @click="crearCertificadoC()">
    Crear Certificado
    </a>
    <div class="ui grid">
    <div  class="sixten wide mobile eight wide tablet four wide computer column">
    <div v-if="delegations?.length>0" class="ui card product">
    <div class="image">
      <img src="https://c0.klipartz.com/pngpicture/23/412/gratis-png-iconos-informaticos-certificacion-profesional-curso-de-negocios-certificados-thumbnail.png"/>
    </div>
    <div class="content">
      <div class="header">Certificado

</div>
      <div class="description">  {{orga}}  </div>
    </div>
     <a href="/rpki/roas" class="ui button primary" >
    Ver ROAs
    </a>
  </div>
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter} from "vue-router";
import BasicLayout from "../layouts/BasicLayout";
import { getCertificado, crearCertificado } from "../api/api";
import { getOrgId } from "../api/token";

export default {
  name: "RPKICertificate",
  components: {
    BasicLayout,
  },
  watch: {
    $route(to, from) {
      console.log(to.params.ip);
      console.log(to.params.prefix);

      this.getCertificadoC;
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
      getCertificadoC(orgId);
    });

    const getCertificadoC = async (category) => {
      const response = await getCertificado(category);
      delegations.value = response;
    };

    const crearCertificadoC = async () => {

      try {
        
          console.log("va a crear cert");
          const response = await crearCertificado(orga.value);
          console.log(response);
          //if (!response?.jwt) throw "El org-id o el token no son válidos";
         
          //router.push("/");
          console.log("params" + params.ip + params.prefix);
          router.push('/rpki/certificate');
          
        } catch (error) {
          console.log(error);
        }
      
    };

    return {
      getCertificadoC,
      crearCertificadoC,
      delegations,
      orga,
    };
  },
};
</script>

<style>
</style>