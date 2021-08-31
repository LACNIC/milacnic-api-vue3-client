<template>
  <BasicLayout>
    <div>
      <h2>Editar organización <span style="color:blue"> {{orga}}</span></h2>
      <form class="ui form" @submit.prevent="editarOrgC">
       
<h4 class="ui horizontal divider header">
  Dirección
</h4>
<table class="ui definition table">
  <tbody>
    <tr>
      <td class="two wide column">Ciudad</td>
      <td><input type="text"  v-model="formData.address.city"></td>
    </tr>
    <tr>
      <td>País</td>
      <td> <input type="text"  v-model="formData.address.country"></td>
    </tr>
    <tr>
      <td>Calle</td>
      <td> <input type="text"  v-model="formData.address.street_address"></td>
    </tr>
     <tr>
      <td>Número de puerta</td>
      <td> <input type="text"  v-model="formData.address.number_address"></td>
    </tr>
    <tr>
      <td>Dirección complemento</td>
      <td> <input type="text"  v-model="formData.address.complement_address"></td>
    </tr>
    <tr>
      <td>Código postal</td>
      <td> <input type="text"  v-model="formData.address.pc"></td>
    </tr>
    <tr>
      <td>Estado/Provincia</td>
      <td> <input type="text"  v-model="formData.address.state"></td>
    </tr>
  </tbody>
    </table>
<h4 class="ui horizontal divider header">
  Contactos
</h4>
    <table class="ui definition table">
  <tbody>
    <tr>
      <td class="two wide column">ID contacto administrador</td>
      <td> <input type="text"  v-model="formData.admin_contact"></td>
    </tr>
    <tr>
      <td>ID contacto cobranza</td>
      <td> <input type="text"  v-model="formData.mem_contact"></td>
    </tr>
    <tr>
      <td>ID contacto membresía</td>
      <td> <input type="text"  v-model="formData.cob_contact"></td>
    </tr>
  </tbody>
    </table>
<h4 class="ui horizontal divider header">
  Teléfono
</h4>
    <table class="ui definition table">
  <tbody>
    <tr>
      <td class="two wide column">Código país</td>
      <td> <input type="text"  v-model="formData.phone.country_code"></td>
    </tr>
    <tr>
      <td>Extensión</td>
      <td> <input type="text"  v-model="formData.phone.phone_extension"></td>
    </tr>
     <tr>
      <td>Número de teléfono</td>
      <td> <input type="text"  v-model="formData.phone.phone_number"></td>
    </tr>
   <tr>
      <td>Responsable</td>
      <td> <input type="text"  v-model="formData.responsible"></td>
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
  name: "EditOrg",
  components: {
    BasicLayout,
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

    onMounted(() => {
      getOrgC(orgId);
    });

    const schemaForm = Yup.object().shape({
      cidrs: Yup.string().required(true),
      hostnames: Yup.string().required(true),
    });

    
    const getOrgC = async (org) => {
      const response = await getOrgData(org);
      console.log("ACÁ" + JSON.stringify(response));
      formData.value = response;
    };

    const editarOrgC = async () => {
      formError.value = {};

      try {
          console.log(JSON.stringify(formData));
        //await schemaForm.validate(formData.value, { abortEarly: false });

        try {
            console.log("va a delegar");
          const response = await editarOrg(formData.value);
          console.log(response);
          //if (!response?.jwt) throw "El org-id o el token no son válidos";
         
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