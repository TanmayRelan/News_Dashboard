import { useEffect, useState } from "react";
import styles from "../styles/PayoutCalculator.module.css";
import Papa from "papaparse";
import { saveAs } from "file-saver";

export default function PayoutCalculator() {
  const [data, setData] = useState([]);
  const [rates, setRates] = useState({ article: 10, blog: 20 });
  const [newEntry, setNewEntry] = useState({ title: "", type: "article" });

  useEffect(() => {
    const savedRates = JSON.parse(localStorage.getItem("payoutRates"));
    const savedData = JSON.parse(localStorage.getItem("payoutData"));
    if (savedRates) setRates(savedRates);
    if (savedData) setData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("payoutData", JSON.stringify(data));
  }, [data]);

  const calculateTotal = () => {
    return data.reduce((sum, item) => {
      const rate = item.type === "article" ? rates.article : rates.blog;
      return sum + Number(rate);
    }, 0);
  };

  const addEntry = () => {
    if (!newEntry.title.trim()) return alert("Title cannot be empty");
    const newItem = {
      id: Date.now(),
      ...newEntry,
    };
    setData([...data, newItem]);
    setNewEntry({ title: "", type: "article" });
  };

  const deleteEntry = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const exportToCSV = () => {
    const csvData = data.map((item) => ({
      ID: item.id,
      Title: item.title,
      Type: item.type,
      Payout: item.type === "article" ? rates.article : rates.blog,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "payout-report.csv");
  };

  return (
    <div className={styles.wrapper}>
      <h2>📋 Payout Calculation</h2>
      <p>Total Articles: {data.filter((d) => d.type === "article").length}</p>
      <p>Total Blogs: {data.filter((d) => d.type === "blog").length}</p>
      <p>
        <strong>💰 Total Payout: ₹{calculateTotal()}</strong>
      </p>

      <div style={{ marginTop: "1rem" }}>
        <h3>Add Entry</h3>
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <select
          value={newEntry.type}
          onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
        >
          <option value="article">Article</option>
          <option value="blog">Blog</option>
        </select>
        <button onClick={addEntry}>➕ Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Payout</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const payout = item.type === "article" ? rates.article : rates.blog;
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>₹{payout}</td>
                <td>
                  <button onClick={() => deleteEntry(item.id)}>❌ Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={exportToCSV}>📤 Export CSV</button>
      </div>
    </div>
  );
}