<template>
  <BasicLayout>
    <div>
      <h2>Editar Bloque <span style="color:blue"> {{$route.params.ip}}/{{$route.params.prefix}}</span></h2>
      <form class="ui form" @submit.prevent="editarOrgC">
       

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
          class="ui button fluid primary"
        >
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
import { editarOrg} from "../api/api";


export default {
  name: "EditIP",
  components: {
    BasicLayout,
  },


watch: {
    $route(to, from) {
        this.$router.push('/');
        this.$router.go(0);
    },
  },



  setup() {
    const orgId =  getOrgId();
    let orga = ref({});
    orga.value = orgId;
    console.log(orgId);
    let formData = ref({"address": {}, "phone":{}});
    console.log("en la vita" + JSON.stringify(formData));
    console.log(formData);
    const { params } = useRoute();
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();


    const schemaForm = Yup.object().shape({
      cidrs: Yup.string().required(true),
      hostnames: Yup.string().required(true),
    });

    
    const getIPInfoC = async (org) => {
      const response = await getIPInfo(org);
      console.log("ACÁ" + JSON.stringify(response));
      formData.value = response;
    };

    const editarIP = async () => {
      formError.value = {};

      try {
          console.log(JSON.stringify(formData));
        //await schemaForm.validate(formData.value, { abortEarly: false });

        try {
            console.log("va a delegar");
          const response = await editarIP(formData.value);
          console.log(response);
          //if (!response?.jwt) throw "El org-id o el token no son válidos";
         
          router.push("/");
          
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
      getOrgC,
      editarOrgC,
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