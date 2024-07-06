import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import 'bootstrap/dist/css/bootstrap.css';
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { httpsCallable, getFunctions, connectFunctionsEmulator } from 'firebase/functions';



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

// console.log('CREATING APP')

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component("font-awesome-icon", FontAwesomeIcon)
// const functions = getFunctions(firebaseInit);

// // Connect your app to the Cloud Functions Emulator running on localhost for local testing
// // When running locally, Cloud Functions will be available at http://localhost:5001/<projectId>/<region>/<functionName>
// // Learn more about testing Cloud Functions locally: https://firebase.google.com/docs/emulator-suite/connect_functions
// if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
//   connectFunctionsEmulator(functions, '127.0.0.1', 5001);
// }

// const sendEmail = httpsCallable(functions, 'sendEmail');

// console.log('SEND EMAIL');
// sendEmail({
//   name: 'Test Name',
//   subject: 'Test Subject',
//   message: 'Test Message',
// })
//   .then((result) => {
//     console.log('Email sent:', result);
//   })
//   .catch((error) => {
//     console.error('Error sending email:', error);
//   });


export { auth, app };
