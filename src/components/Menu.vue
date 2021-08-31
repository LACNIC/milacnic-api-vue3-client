<template>
  <div class="ui secondary menu">
    <div class="ui container">
      <div class="left menu">
        <router-link class="item" to="/">
          <img
            class="ui small image"
            src="../assets/logo.png"
            alt="LACNIC API Client"
          />
        </router-link>
      </div>

      <div class="right menu">
        <a class="item" href="/login" v-if="!token">
          Iniciar sesión
        </a>
        <template v-if="token">
          <a class="item" href="/">Recursos</a>
          <a class="item" href="/organization/edit">ORG</a>
          <a class="item" href="/rpki/certificate">RPKI</a>
          <!--span class="ui item cart" @click="openCart">
            <i class="shopping cart icon"></i>
          </span-->
          <span class="ui item logout" @click="logout">
            <i class="sign-out icon"></i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getTokenApi, getOrgId, deleteTokenApi } from "../api/token";

export default {
  name: "Menu",



  setup() {
    const router = useRouter();
    const token = getTokenApi();
    const store = useStore();

    

    const logout = () => {
      deleteTokenApi();
      window.location="/login";
    };

    const openCart = () => {
      store.commit("setShowCart", true);
    };

    return {
      token,
      logout,
      openCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.menu.secondary {
  background-color: #16202b;

  .item {
    color: #fff;
    &:hover {
      color: #1fa1f1;
    }
  }

  .menu.left {
    width: 50%;
    .ui.image {
      width: 40px;
    }
  }

  .menu.right {
    width: 50%;
    justify-content: flex-end;

    .logout,
    .cart {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>