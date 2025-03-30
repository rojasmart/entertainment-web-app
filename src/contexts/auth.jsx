import { useState, createContext, useEffect, useCallback } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
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
        bookmarks,
        bookmarksLoaded,
        signInWithEmailPassword,
        signOut,
        addBookmark,
        removeBookmark,
        fetchBookmarks,
        toggleBookmark,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
