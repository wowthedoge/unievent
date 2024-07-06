<template>
    <div class="sign-in-main">
        <div class="sign-in">
            <h1>Sign In</h1>
            <button @click="signIn">Sign In with Google</button>
            <div v-if="user">
                <h2>Welcome, {{ user.displayName }}</h2>
                <img :src="user.photoURL" alt="User Photo" />
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { signIn, useAuthState } from '../services/AuthService' // Adjust the import path as needed
  
  export default {
    name: 'SignInView',
    setup() {
      const { user } = useAuthState()
  
      return {
        signIn,
        user
      }
    }
  }
  </script>
  
  <style scoped>
  .sign-in {
    min-width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  button:hover {
    background-color: #0056b3;
  }

  .sign-in-main {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  