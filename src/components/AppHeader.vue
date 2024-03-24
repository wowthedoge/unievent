<template>
  <header class="app-header">
    <div class="logo-text" @click="logoOnClick">
      <span class="font-light">UNI</span><span class="font-bold">EVENT</span>
    </div>
    <div v-if="user" class="user-display">
      <img class="user-photo" :src="user.photoURL" alt="user-image"/>    
      <p class="user-name">{{ user.displayName }}</p>
    </div>
    <button v-else class="sign-in-button" @click="onSignInButtonClick">Sign In</button>
  </header>
</template>

<script setup>
import '../assets/theme.css'
import { useRouter } from 'vue-router'
import { signIn, useAuthState } from '../services/AuthService'

const { user } = useAuthState()

const router = useRouter()
const logoOnClick = () => {
  console.log('logo on click')
  router.push('/')
}

const onSignInButtonClick = () => {
  signIn()
}
</script>

<style scoped>
/* Scoped CSS for your header */
.app-header {
  background-color: var(--color-dark);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 50px;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header .logo-text {
  color: var(--color-light);
  margin: 0;
  line-height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: inline-block;
}

.sign-in-button {
  background-color: var(--color-yellow);
  border-radius: 20px;
  height: 30px;
  border: none;
  color: var(--color-dark);
  padding: 0 30px;
}

.user-display {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.user-name {
  color: var(--color-light);
  margin: 0;
}

.user-photo {
  border-radius: 50%;
  height: 30px;
  object-fit: cover;
}

.font-light {
  font-weight: 300;
}

.font-bold {
  font-weight: 700;
  color: var(--color-yellow);
}
</style>
