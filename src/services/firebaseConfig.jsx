import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGF08cHmbjK26egFhMbOOifacmk4yE78w",
  authDomain: "entertainment-app-93f48.firebaseapp.com",
  projectId: "entertainment-app-93f48",
  storageBucket: "entertainment-app-93f48.appspot.com",
  messagingSenderId: "470358200380",
  appId: "1:470358200380:web:47014fc9bc40d3d431b339",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
