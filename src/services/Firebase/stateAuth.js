import { auth } from "./firebase";

export function isCurrentUser() {
    const currentUser = auth.currentUser;
    if (currentUser) {
        try {
            console.log('');
            return true;
        } catch(error) {
            console.error('Error al obtener el token:', error);
            return false;
        }
    } else {


        return false;

    }
}
