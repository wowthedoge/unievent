<template>
  <div>
    <div ref="firebaseui" class="firebaseui-container"></div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';

export default {
  mounted() {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/',
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
    };

    const auth = getAuth();
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start(this.$refs.firebaseui, uiConfig);
  },
};
</script>

<style scoped>

</style>


