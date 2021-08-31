<template>
  <BasicLayout>
    <div class="login">
      <h2>Iniciar sesión</h2>
      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <input
            type="text"
            placeholder="ORG-ID"
            v-model="formData.identifier"
            :class="{ error: formError.identifier }"
          />
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Token"
            v-model="formData.password"
            :class="{ error: formError.password }"
          />
        </div>
        <!--div class="field">
          <input
            type="text"
            placeholder="Username"
            v-model="formData.username"
            :class="{ error: formError.username }"
          />
        </div>
         <div class="field">
          <input
            type="password"
            placeholder="Password"
            v-model="formData.password"
            :class="{ error: formError.password }"
          />
        </div>
         <div class="field">
          <input
            type="text"
            placeholder="Client ID"
            v-model="formData.client_id"
            :class="{ error: formError.client_id }"
          />
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Client Secret"
            v-model="formData.client_secret"
            :class="{ error: formError.client_secret }"
          />
        </div-->
        <button
          type="submit"
          class="ui button fluid primary"
          :class="{ loading }"
        >
          Entrar
        </button>
      </form>
     <!-- <router-link to="/register"> Crear una cuenta </router-link>-->
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as Yup from "yup";
import BasicLayout from "../layouts/BasicLayout";
import { loginApi2} from "../api/user";
import { setTokenApi, getTokenApi, setOrgId } from "../api/token";

export default {
  name: "Login",
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
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();
    

    const schemaForm = Yup.object().shape({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });

    const login = async () => {
      formError.value = {};

      try {
        await schemaForm.validate(formData.value, { abortEarly: false });

        try {
          const response = await loginApi2(formData.value);
          console.log(response);
          setTokenApi(formData.value.password);
          setOrgId(formData.value.identifier);
          window.location="/";
        
        } catch (error) {
          console.log(error);
          router.push("/");

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
      loading,
      login,
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