<template>
  <BasicLayout>
    <div class="login">
      <h2>Iniciar sesión</h2>
      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <input
            type="text"
            placeholder="Nombre de usuario"
            v-model="formData.identifier"
            :class="{ error: formError.identifier }"
          />
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Contraseña"
            v-model="formData.password"
            :class="{ error: formError.password }"
          />
        </div>
        <button
          type="submit"
          class="ui button fluid primary"
          :class="{ loading }"
        >
          Iniciar Sesión
        </button>
      </form>
      <router-link to="/register">Crear cuenta</router-link>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BasicLayout from "../Layouts/BasicLayout";
import { loginApi } from "../api/user";
import { setTokenApi, getTokenApi } from "../api/token";
import * as Yup from "yup";

export default {
  name: "Login",
  components: {
    BasicLayout,
  },

  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (token) router.push("/");
    });

    const schemeForm = Yup.object().shape({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });

    const login = async () => {
      formError.value = {};
      loading.value = true;
      try {
        await schemeForm.validate(formData.value, { abortEarly: false });
        try {
          const response = await loginApi(formData.value);
          if (!response?.jwt) throw "El usuario o contraseña son inválidos";
          console.log(response);
          setTokenApi(response.jwt);
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }

      loading.value = false;
    };

    return {
      formData,
      formError,
      login,
      loading,
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
