import { useState, useEffect } from "react";

export default function PayoutSettings() {
  const [rates, setRates] = useState({ article: "", blog: "" });
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("payoutRates"));
    if (saved) setRates(saved);

    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setAuthorized(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("payoutRates", JSON.stringify(rates));
    alert("✅ Payout rates saved!");
  };

  if (!authorized) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        <h2>🚫 Access Denied</h2>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "2rem auto"
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#1e3a8a" }}>💰 Set Payout Rates</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.3rem" }}>
          Article Payout (₹):
        </label>
        <input
          type="number"
          value={rates.article}
          onChange={(e) => setRates({ ...rates, article: e.target.value })}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.3rem" }}>
          Blog Payout (₹):
        </label>
        <input
          type="number"
          value={rates.blog}
          onChange={(e) => setRates({ ...rates, blog: e.target.value })}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      <button
        onClick={handleSave}
        style={{
          backgroundColor: "#2563eb",
          color: "#fff",
          padding: "0.6rem 1.2rem",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600"
        }}
      >
        Save Rates
      </button>
    </div>
  );
}