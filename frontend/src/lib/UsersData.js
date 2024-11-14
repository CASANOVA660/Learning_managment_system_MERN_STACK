import jwtDecode from "jwt-decode";

export function getUserData(userKey) {
    const token = localStorage.getItem(userKey);
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.error("Token decoding error:", error);
        }
    }
    return null;
}


export function setUserData(userKey, token) {
    localStorage.setItem(userKey, token);
}

export function removeUserData(userKey) {
    localStorage.removeItem(userKey);
}
