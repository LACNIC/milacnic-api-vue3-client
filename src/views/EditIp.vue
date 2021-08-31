<template>
  <BasicLayout>
    <div>
      <h2>Editar Bloque <span style="color:blue"> {{$route.params.ip}}/{{$route.params.prefix}}</span></h2>
      <form class="ui form" @submit.prevent="editarIpC">
       

<table class="ui definition table">
  <tbody>
    <tr>
      <td class="two wide column">Contacto abuso</td>
      <td><input type="text"  v-model="formData.abuseContact"></td>
    </tr>
    <tr>
      <td>Contacto técnico</td>
      <td> <input type="text"  v-model="formData.techContact"></td>
    </tr>
    <tr>
      <td>ASN</td>
      <td> <input type="text"  v-model="formData.asn"></td>
    </tr>
  </tbody>
    </table>


        <button
          type="submit"
          class="ui button fluid primary" >
          Editar
        </button>
      </form>
     <!-- <router-link to="/register"> Crear una cuenta </router-link>-->
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import * as Yup from "yup";
import BasicLayout from "../layouts/BasicLayout";
import { getOrgData} from "../api/api";
import { getOrgId} from "../api/token";
import { editarIp, getInfoIP} from "../api/api";


export default {
  name: "EditIp",
  components: {
    BasicLayout,
  },






  setup() {
    const orgId =  getOrgId();
    
    let orga = ref({});

    orga.value = orgId;
    const { params } = useRoute();
    console.log(orgId);
    let formData = ref({});
    console.log("en la vista" + JSON.stringify(formData));
    console.log(formData);
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();

    onMounted(() => {
      getIpInfoC(params.ip + "/" + params.prefix);
    });

    const schemaForm = Yup.object().shape({
      cidrs: Yup.string().required(true),
      hostnames: Yup.string().required(true),
    });

    
    const getIpInfoC = async (org) => {
      const response = await getInfoIP(org);
      console.log("ACÁ" + JSON.stringify(response));
      formData.value = response;
    };

    const editarIpC = async () => {
      formError.value = {};

      try {
          console.log(JSON.stringify(formData));
        try {
            console.log("va a editar ip");
          const response = await editarIp(formData.value, params.ip, params.prefix);
          console.log(response);
          window.location="/";            
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }
    };

    return {
      formData,
      formError,
      getIpInfoC,
      editarIpC,
      orga,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  > h2 {
    margin: 50px 0 30px 0;
  }

  .ui.form {
    max-width: 300px !important;
    margin: 0 auto;
    margin-bottom: 10px;

    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
}
</style>