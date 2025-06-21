import { useState } from "react";
import { useRouter } from "next/router";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles/Login.module.css";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminEmail = "tanmayrelan2003@gmail.com"; // ✅ your admin email

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let user;
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        user = result.user;
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        user = result.user;
      }

      // ✅ Set role in localStorage
      if (user.email === adminEmail) {
        localStorage.setItem("userRole", "admin");
      } else {
        localStorage.setItem("userRole", "user");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Set role for Google sign-in
      if (user.email === adminEmail) {
        localStorage.setItem("userRole", "admin");
      } else {
        localStorage.setItem("userRole", "user");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heroBg}></div>

      <div className={styles.card}>
        <h1 className={styles.heading}>🗞️ News Dashboard</h1>
        <h2 className={styles.subheading}>
          {isLogin ? "Login to your account" : "Create your account"}
        </h2>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleAuth} className={styles.form}>
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="🔐 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>

        <p className={styles.toggleText}>
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className={styles.link}>
            {isLogin ? "Create one" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}