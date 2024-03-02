import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export function SignOut() {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        console.log('Usuario deslogeado')
    }).catch((error) => {
        console.log('Error in firebase/signOut.js' + error)
    });
}