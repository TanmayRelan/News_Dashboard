import styles from "./NewsCard.module.css";

export default function NewsCard({ article }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={article.image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={article.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.description}>{article.description || "No description"}</p>
        <a href={article.url} className={styles.readMore} target="_blank">
          Read More →
        </a>
      </div>
    </div>
  );
}