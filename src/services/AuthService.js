// src/services/authService.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { getUser } from './UserService'; // Importa la función para obtener el usuario

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUser(userCredential.user.uid); // Obtiene la información del usuario

    if (user) {
      const token = userCredential.user.accessToken;
      const userDataString = JSON.stringify(user);
      localStorage.setItem("user", userDataString);
      localStorage.setItem("token", token); // Considera un almacenamiento más seguro
    }
    return user; // Devuelve el *objeto de usuario* completo, no solo true/false
  } catch (error) {
    console.error("Error in signIn:", error);
     // Relanza el error con un mensaje más descriptivo.
    throw new Error("Error al iniciar sesión: Usuario o contraseña incorrecta.");
  }
};