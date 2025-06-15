import { useState, createContext, useEffect, useCallback } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, updateDoc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { app } from "../services/firebaseConfig";
import { getFirestore } from "firebase/firestore";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false);

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

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    setSigned(isAuthenticated);
    setLoading(false);
  }, []);

  // Memoize fetchBookmarks to prevent it from changing reference between renders
  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      console.error("No user signed in");
      return [];
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.bookmarks) {
          setBookmarks(userData.bookmarks);
          setBookmarksLoaded(true);
          return userData.bookmarks;
        } else {
          // Initialize empty bookmarks array if it doesn't exist
          await updateDoc(userRef, { bookmarks: [] });
          setBookmarks([]);
          setBookmarksLoaded(true);
          return [];
        }
      } else {
        // Create user document if it doesn't exist
        await setDoc(userRef, { bookmarks: [] });
        setBookmarks([]);
        setBookmarksLoaded(true);
        return [];
      }
    } catch (e) {
      console.error("Error fetching bookmarks: ", e);
      setBookmarksLoaded(true);
      return [];
    }
  }, [user, db]);

  // Load bookmarks when user changes
  useEffect(() => {
    if (user && !bookmarksLoaded) {
      fetchBookmarks();
    }
  }, [user, fetchBookmarks, bookmarksLoaded]);

  const toggleBookmark = useCallback(
    async (item) => {
      if (!user) {
        console.error("No user signed in");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // Create user document if it doesn't exist
          await setDoc(userRef, { bookmarks: [] });
        }

        // Get current bookmarks
        const userData = (await getDoc(userRef)).data();
        const currentBookmarks = userData?.bookmarks || [];

        // Check if the bookmark already exists by ID
        const existingIndex = currentBookmarks.findIndex((b) => b.id === item.id);

        if (existingIndex >= 0) {
          // Remove existing bookmark
          const updatedBookmarks = [...currentBookmarks];
          updatedBookmarks.splice(existingIndex, 1);

          await updateDoc(userRef, {
            bookmarks: updatedBookmarks,
          });

          setBookmarks(updatedBookmarks);
          return updatedBookmarks;
        } else {
          // Create new bookmark object with consistent structure
          const newBookmark = {
            id: item.id,
            title: item.title || item.name || item.original_name,
            type: item.isMovie ? "movie" : "tv",
            poster_path: item.poster_path || null,
            backdrop_path: item.backdrop_path || null,
          };

          // Add bookmark
          const updatedBookmarks = [...currentBookmarks, newBookmark];

          await updateDoc(userRef, {
            bookmarks: updatedBookmarks,
          });

          setBookmarks(updatedBookmarks);
          return updatedBookmarks;
        }
      } catch (e) {
        console.error("Error toggling bookmark: ", e);
        throw e; // Propagate error
      }
    },
    [user, db]
  );

  // Legacy functions for backward compatibility
  const addBookmark = useCallback(
    async (bookmark) => {
      if (!user) {
        console.error("No user signed in");
        return;
      }

      try {
        // Create a standardized bookmark object
        const standardBookmark = {
          id: bookmark.id,
          title: bookmark.title || "",
          type: bookmark.type || "unknown",
        };

        const updatedBookmarks = await toggleBookmark({
          ...standardBookmark,
          isMovie: standardBookmark.type === "movie",
        });

        return updatedBookmarks;
      } catch (e) {
        console.error("Error adding bookmark: ", e);
        throw e;
      }
    },
    [user, toggleBookmark]
  );

  const removeBookmark = useCallback(
    async (bookmark) => {
      if (!user) {
        console.error("No user signed in");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const currentBookmarks = userData.bookmarks || [];

          // Find bookmark by ID instead of using arrayRemove
          const filteredBookmarks = currentBookmarks.filter((b) => b.id !== bookmark.id);

          await updateDoc(userRef, {
            bookmarks: filteredBookmarks,
          });

          setBookmarks(filteredBookmarks);
          return filteredBookmarks;
        }
      } catch (e) {
        console.error("Error removing bookmark: ", e);
        throw e;
      }
    },
    [user, db]
  );

  // Verify current password (for reauthentication)
  const verifyPassword = useCallback(
    async (password) => {
      if (!user) {
        throw new Error("No user signed in");
      }

      try {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        console.error("Error verifying password: ", error);
        throw error;
      }
    },
    [user]
  );
  // Update user profile (displayName, photoURL)
  const updateUserProfile = useCallback(
    async (profileData) => {
      if (!user) {
        throw new Error("No user signed in");
      }

      try {
        console.log("Auth context: Atualizando perfil com dados:", profileData);
        console.log("Auth context: Usuário atual:", user);

        // Garantir que temos um objeto auth.currentUser atualizado
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("Firebase could not get current user");
        }

        console.log("Auth context: Firebase currentUser:", currentUser);

        // Tente atualizar o perfil com o Firebase
        await updateProfile(currentUser, profileData);
        console.log("Auth context: Perfil atualizado com sucesso no Firebase");

        // Update the user object in session storage with the new profile data
        const updatedUser = { ...user, ...profileData };
        updatedUser.displayName = profileData.displayName;
        updatedUser.photoURL = profileData.photoURL;

        setUser(updatedUser);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(updatedUser));
        console.log("Auth context: Estado local e session storage atualizados");

        return true;
      } catch (error) {
        console.error("Auth context: Erro na atualização de perfil:", error);
        console.error("Auth context: Tipo de erro:", typeof error);
        console.error("Auth context: Mensagem:", error.message);
        console.error("Auth context: Stack:", error.stack);
        throw error;
      }
    },
    [user]
  );

  // Update user email
  const updateUserEmail = useCallback(
    async (newEmail) => {
      if (!user) {
        throw new Error("No user signed in");
      }

      try {
        await updateEmail(user, newEmail);

        // Update the user object in session storage with the new email
        const updatedUser = { ...user, email: newEmail };
        setUser(updatedUser);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(updatedUser));

        return true;
      } catch (error) {
        console.error("Error updating email: ", error);
        throw error;
      }
    },
    [user]
  );

  // Update user password
  const updateUserPassword = useCallback(
    async (newPassword) => {
      if (!user) {
        throw new Error("No user signed in");
      }

      try {
        await updatePassword(user, newPassword);
        return true;
      } catch (error) {
        console.error("Error updating password: ", error);
        throw error;
      }
    },
    [user]
  );

  // Delete user account and associated data
  const deleteUserAccount = useCallback(async () => {
    if (!user) {
      throw new Error("No user signed in");
    }

    try {
      // First, delete user data from Firestore
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(userRef);

      // Then delete the user account
      await deleteUser(user);
      return true;
    } catch (error) {
      console.error("Error deleting account: ", error);
      throw error;
    }
  }, [user, db]);

  async function signInWithEmailPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
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
    setBookmarks([]);
    setBookmarksLoaded(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        bookmarks,
        bookmarksLoaded,
        signInWithEmailPassword,
        signOut,
        addBookmark,
        removeBookmark,
        fetchBookmarks,
        toggleBookmark,
        verifyPassword,
        updateUserProfile,
        updateUserEmail,
        updateUserPassword,
        deleteUserAccount,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
