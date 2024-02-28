// import { getAuth } from 'firebase/auth';
// import { firebaseApp } from '../main'; // Import the Firebase app instance

// const auth = getAuth(firebaseApp);

export default {
  isAuthenticated() {
    return true;
    // return auth.currentUser !== null;
  }
};