import { useState, createContext, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebaseConfig";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      const storageToken = sessionStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  });

  function signInWithEmailPassword(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error code: ${errorCode}, message: ${errorMessage}`);
      });
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    // Navigate to the home page
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signInWithEmailPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
