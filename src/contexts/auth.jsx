import { useState, createContext, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "../services/firebaseConfig";
import { getFirestore } from "firebase/firestore";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  // Initialize Firestore
  const db = getFirestore(app);

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadStorageData();
  }, []);

  async function addUserWithBookmark(user, bookmark) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        bookmarks: [bookmark],
      });
    } catch (e) {
      console.error("Error adding user with bookmark: ", e);
    }
  }

  async function addBookmark(bookmark) {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        bookmarks: arrayUnion(bookmark),
      });
    } catch (e) {
      console.error("Error adding bookmark: ", e);
    }
  }

  async function signInWithEmailPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

      // Add user with a bookmark to Firestore
      const bookmark = { title: "My Bookmark", url: "https://example.com" };
      addUserWithBookmark(user, bookmark);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error code: ${errorCode}, message: ${errorMessage}`);
      throw error; // Re-throw the error so it can be caught by the caller
    }
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
        addBookmark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
