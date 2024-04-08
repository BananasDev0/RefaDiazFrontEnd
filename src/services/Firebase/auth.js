import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from './firebase';
import { getUser } from '../UserService';


export const signIn = async (email, password) => {

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = await getUser(userCredential.user.uid);

    if (user) {
      const token = userCredential.user.accessToken;
      const userDataString = JSON.stringify(user);
      const userTokenString = JSON.stringify(token);

      localStorage.setItem("user", userDataString);
      localStorage.setItem("token", userTokenString);
    }



    return user;
  } catch (error) {
    console.log('Error in auth.js/signIn : ' + error);
    return false
  }
};

