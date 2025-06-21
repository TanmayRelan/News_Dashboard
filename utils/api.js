import axios from 'axios';

export const fetchNewsFromAPI = async () => {
  try {
    const res = await axios.get(
      `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    return res.data.articles;
  } catch (error) {
    console.error("Failed to fetch news:", error.message);
    return [];
  }
};