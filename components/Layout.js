import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const [dark, setDark] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") setIsAdmin(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userRole");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>📰 News & Payout Dashboard</h1>

        <div className={styles.actionButtons}>
          {isAdmin && (
            <>
              <button
                onClick={() => router.push("/PayoutSettings")}
                className={styles.payoutButton}
              >
                🧾 Payout Settings
              </button>
              <button
                onClick={() => router.push("/calculate")}
                className={styles.payoutButton}
              >
                💰 Calculate Payout
              </button>
            </>
          )}

          <button onClick={() => setDark(!dark)} className={styles.toggleButton}>
            {dark ? "🌞 Light" : "🌙 Dark"}
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}