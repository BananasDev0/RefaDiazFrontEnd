import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase';

export const signIn = async (email, password) => {
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user)
    return user;
  } catch (error) {
    console.log('Error in auth.js/signIn :' + error);
    return false
  }
};
