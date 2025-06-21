import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNdNX5_rmB-PJSiAg9M7cWvSXJunzCX30",
  authDomain: "news-payout-dashboard-62afc.firebaseapp.com",
  projectId: "news-payout-dashboard-62afc",
  storageBucket: "news-payout-dashboard-62afc.firebasestorage.app",
  messagingSenderId: "114371449412",
  appId: "1:114371449412:web:78c012b7534ce00a1ee211",
  measurementId: "G-C42VE8C21M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Safe Analytics Initialization (only on client side)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, provider, analytics };