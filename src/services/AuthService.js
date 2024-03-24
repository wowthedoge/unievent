import { ref, onMounted } from 'vue';
import { auth } from '@/main'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'

const provider = new GoogleAuthProvider()

const signIn = () =>
  signInWithPopup(auth, provider)
    // .then((result) => {})
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode, 'Failed log in:', errorMessage, email, credential)
    })



const useAuthState = () => {
  const user = ref(null);

  onMounted(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });
  });

  return { user };
}

export { signIn, useAuthState }
