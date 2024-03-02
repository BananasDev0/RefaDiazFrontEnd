import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { isCurrentUser } from './stateAuth';



export const signIn = async (email, password) => {

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userAuthenticate = isCurrentUser();

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,

    }
    const token = user.accessToken;
    const userDataString = JSON.stringify(userData);
    const userTokenString = JSON.stringify(token);

    if (userAuthenticate) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem("user", userDataString);
      localStorage.setItem("token", userTokenString);
    } else {
      localStorage.setItem("user", userDataString);
      localStorage.setItem("token", userTokenString);
    }


    
    return user;
  } catch (error) {
    console.log('Error in auth.js/signIn : ' + error);
    return false
  }
};

