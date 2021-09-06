<template>
  <q-page padding>
    <container>
      <h3>Login</h3>
      <form @submit.prevent.stop="onSubmit">
        <q-input 
          ref="txtEmail"
          type="email"
          placeholder="Email"
          outlined 
          v-model="userForm.email"
          :rules="[val => !!val || '* requerido']"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
        </q-input>
        <q-input 
          ref="txtPassword"
          type="password"
          outlined 
          class="q-mt-xs q-mb-xs"
          placeholder="Contraseña"
          :rules="[val => !!val || '* requerido']"
          v-model="userForm.password">
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
        </q-input>

        <q-btn color="primary" label="Iniciar sesion" type="submit" />

        <div class="blok q-mt-md">
          <router-link :to="{name: 'register'}">
            ¿No tienes una cuenta aun?
          </router-link>
        </div>

      </form>
    </container>
  </q-page>
</template>

<script>
import Container from 'src/components/Container.vue'
import useAuth from 'src/composables/useAuth';
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useQuasar } from 'quasar'

export default {
  name: 'Login',
	components: { Container },
  setup() {
			const { loginUser } = useAuth();
			const router = useRouter();

      const userForm = reactive({
				email: '',
				password: '',
			});

      const txtEmail = ref(null);
      const txtPassword = ref(null);

      const $q = useQuasar();

      const onSubmit = async () => {
          txtEmail.value.validate();
          txtPassword.value.validate();

          if(txtEmail.value.hasError || txtPassword.value.hasError) return;
					const { ok, message } = await loginUser(userForm);
					
          if (!ok) return $q.notify({type: 'negative', message});
					router.push({ name: "todo" });
				}

			return {
				userForm,
        txtEmail,
        txtPassword,
				onSubmit
			};
		},
}
</script>
