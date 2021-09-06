<template>
  <q-page padding>
    <container>
      <h3>Registrarse</h3>
      <form @submit.prevent.stop="onSubmit">
        <q-input 
          ref="txtName"
          type="text"
          outlined 
          v-model="userForm.name"
          class="q-mb-xs"
          placeholder="Nombre"
          :rules="[val => !!val || '* requerido']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
        </q-input>
        <q-input 
          ref="txtEmail"
          type="email"
          outlined 
          v-model="userForm.email"
          placeholder="Email"
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
          v-model="userForm.password"
          placeholder="Contaseña"
          :rules="[val => !!val || '* requerido']">
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
        </q-input>

        <q-btn color="primary" label="Crear cuenta" type="submit" />

        <div class="blok q-mt-md">
          <router-link :to="{name: 'login'}">
            ¿Ya tienes una cuenta?
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
			const { createUser } = useAuth();
			const router = useRouter();

			const userForm = reactive({
        name: '',
				email: '',
				password: '',
			});

      const txtName = ref(null);
      const txtEmail = ref(null);
      const txtPassword = ref(null);

      const $q = useQuasar();

      const onSubmit = async () => {
          
          txtName.value.validate();
          txtEmail.value.validate();
          txtPassword.value.validate();

          if(txtName.value.hasError || txtEmail.value.hasError || txtPassword.value.hasError) return;

					const { ok, message } = await createUser(userForm);
					if (!ok) return $q.notify({type: 'negative', message});
					router.push({ name: "todo" });
				}

			return {
				userForm,
        txtName,
        txtEmail,
        txtPassword,
				onSubmit
			};
		},
}
</script>
