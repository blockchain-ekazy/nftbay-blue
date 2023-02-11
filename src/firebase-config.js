import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoFjKuldkZ4yxg3LHMaman7FJuQ4Uynfg",
  authDomain: "nftbay-e53ec.firebaseapp.com",
  projectId: "nftbay-e53ec",
  storageBucket: "nftbay-e53ec.appspot.com",
  messagingSenderId: "97007059420",
  appId: "1:97007059420:web:e6ff1355f3bd8ebc96cf19",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
