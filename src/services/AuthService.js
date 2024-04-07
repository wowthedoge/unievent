import { ref, onMounted } from 'vue'
import { auth } from '@/main'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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
  const user = ref(null)

  const firestore = getFirestore()

  onMounted(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const { displayName, photoURL, uid } = firebaseUser;
        const userDocRef = doc(firestore, 'users', uid); // Reference to the user document
        
        try {
          const userSnapshot = await getDoc(userDocRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            user.value = {
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              uid: userData.uid
            };
          } else {
            await setDoc(userDocRef, {
              displayName,
              photoURL,
            });
            user.value = {
              displayName,
              photoURL,
              uid
            };
            console.log('User saved to Firestore');
          }
        } catch (error) {
          console.error('Error saving user data to Firestore:', error);
        }
      }
    });
  });

  return { user }
}

export { signIn, useAuthState }
