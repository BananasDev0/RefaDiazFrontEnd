import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

 async function isAuthUser() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });
}

export async function checkAuth() {
    const user = await isAuthUser();
    if (user) {
        
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            phoneNumber:user.phoneNumber,
            photoURL : user.photoURL,

        }
        const userDataString = JSON.stringify(userData);
        if(!localStorage.getItem("user")){
            localStorage.setItem("user",userDataString);
        }
        
    } else {
        localStorage.removeItem("user");
        window.location.href = '/login'
    }
}

