<template>
  <div class="main">
    <div class="title">Sign In With Google</div>
    <div>
      <div ref="firebaseui" class="firebaseui-container"></div>
    </div>
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
        signInSuccessWithAuthResult: (authResult) => {
          console.log('Signed in as:', authResult.user);
          return true; // Prevent FirebaseUI from redirecting
        }
      }
    };

    const auth = getAuth();
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start(this.$refs.firebaseui, uiConfig);
  },
};
</script>

<style scoped>
.main {
  background-color: var(--color-light);
  height: 100vh;
  padding-top: 50px; /* Adjust this value based on your header's height */
}

.title {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(40px, 5vw, 50px);  
  color: var(--color-black);
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: 40px;
}

.firebaseui-container {
  background-color: var(--color-light);
  margin-top: 10%;
}
</style>


