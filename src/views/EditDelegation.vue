<template>
  <BasicLayout>
    <div class="login">
      <h2>Editando Delegación {{$route.params.ip}}/{{$route.params.prefix}}</h2>
      <form class="ui form" @submit.prevent="delegarC">
        <div class="field">
          <input
            type="text"
            placeholder="Ej: 200.3.12.0/22, 200.0.86.0/24"
            v-model="formData.cidrs"
            :class="{ error: formError.cidrs }"
          />
        </div>
        <div class="field">
          <input
            type="text"
            placeholder="Ej: NS.LACNIC.NET, NS2.LACNIC.NET, DNS.ANYCAST.LACNIC.NET"
            v-model="formData.hostnames"
            :class="{ error: formError.hostnames }"
          />
        </div>
        <button
          type="submit"
          class="ui button fluid primary"
        >
          Delegar
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
import { delegar} from "../api/api";

export default {
  name: "NewDelegation",
  components: {
    BasicLayout,
  },

  watch: {
    $route(to, from) {
        this.$router.push('/delegations/detail/' + to.params.ip + '/' + to.params.prefix);
        this.$router.go(0);
    },
  },
  setup() {
    const { params } = useRoute();
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();

    onMounted(() => {
      
    });

    const schemaForm = Yup.object().shape({
      cidrs: Yup.string().required(true),
      hostnames: Yup.string().required(true),
    });

    const delegarC = async () => {
      formError.value = {};

      try {
          console.log(JSON.stringify(formData));
        await schemaForm.validate(formData.value, { abortEarly: false });

        try {
            console.log("va a delegar");
          const response = await delegar(formData.value);
          console.log(response);
          //if (!response?.jwt) throw "El org-id o el token no son válidos";
         
          //router.push("/");
          console.log("params" + params.ip + params.prefix);
          router.push('/delegations/detail/' + params.ip + '/' + params.prefix);
          
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
      delegarC,
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