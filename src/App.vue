<template>
  <h1 v-if="authStatus === 'authenticating'">Espere por favor...</h1>
  <router-view v-else/>
</template>

<script>
import { defineComponent } from 'vue';
import useAuth from "./composables/useAuth";
export default defineComponent({
  name: 'App',
  setup(){
    const { authStatus, checkAuthStatus } = useAuth();
			checkAuthStatus();

			return {
				authStatus,
			};
  }
})
</script>
