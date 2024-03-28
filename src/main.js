import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import 'bootstrap/dist/css/bootstrap.css';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_REALTIME_DATABASE_URL,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
}

const firebaseInit = initializeApp(firebaseConfig)
const auth = getAuth(firebaseInit)

const app = createApp(App)
app.use(router)
app.mount('#app')

export { auth, app };
