// pages/_app.js
import '../styles/globals.css'; // ✅ Tailwind base setup
import 'flowbite/dist/flowbite.css'; // ✅ Flowbite styles


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}