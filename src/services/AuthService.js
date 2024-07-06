import { ref, onMounted } from 'vue'
import { auth } from '@/main'
import { useRouter } from 'vue-router'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const provider = new GoogleAuthProvider()

const signIn = () =>
  signInWithPopup(auth, provider)
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode, 'Failed log in:', errorMessage, email, credential)
    })

const useAuthState = () => {
  const user = ref(null)
  const router = useRouter()
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
              uid: uid
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
            router.push('/edit-profile');
          }
        } catch (error) {
          console.error('Error saving user data to Firestore:', error);
        }
      }
    });
  });

  const modifyUser = async (displayName, photoURL) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(firestore, 'users', currentUser.uid);
      try {
        await setDoc(userDocRef, {
          displayName,
          photoURL,
        });
        console.log('User updated in Firestore');
        user.value = {
          displayName,
          photoURL,
          uid: currentUser.uid
        };
        // Optional: You can perform additional actions after updating user data
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
    console.log('Returning user', user);
    return { user, modifyUser };
  };

  console.log('Returning user', user);
  return { user, modifyUser }
}

export { signIn, useAuthState }
