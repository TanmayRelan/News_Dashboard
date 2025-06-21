import { useEffect, useState } from "react";
import { fetchNewsFromAPI } from "../utils/api";
import Layout from "../components/Layout";
import NewsCard from "../components/NewsCard";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [error, setError] = useState(null); // 🔴 NEW: For handling fetch error

  useEffect(() => {
    setHasMounted(true);

    const loadNews = async () => {
      try {
        const data = await fetchNewsFromAPI();
        setArticles(data);
        localStorage.setItem("cachedNews", JSON.stringify(data));
      } catch (err) {
        const cached = localStorage.getItem("cachedNews");
        if (cached) {
          setArticles(JSON.parse(cached));
          setError("⚠️ Unable to fetch latest news. Showing cached data.");
        } else {
          setError("❌ Unable to load news. Please check your internet connection.");
        }
      }
    };

    loadNews();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!hasMounted) return null;

  return (
    <Layout>
      {isOffline && (
        <div
          style={{
            background: "#f87171",
            color: "white",
            padding: "0.75rem",
            textAlign: "center",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        >
          🚫 You are currently offline. Cached content is being displayed.
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#fde047",
            color: "#1f2937",
            padding: "0.75rem",
            textAlign: "center",
            borderRadius: "6px",
            marginBottom: "1rem",
            fontWeight: "500",
          }}
        >
          {error}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">📰 Top Headlines in India</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </Layout>
  );
}