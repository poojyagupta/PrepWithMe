"use client";

import { useState } from "react";

export default function GenerateSchedulePage() {
  const [form, setForm] = useState({
    userId: "",
    topicsMap: `{
  "Math": ["Algebra", "Geometry"],
  "Science": ["Biology", "Physics"]
}`,
    dailyStudyLimit: 3,
    deadline: "",
    preferredStudyTime: "Morning",
    difficultylevel: "Medium",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Generating schedule...");

    try {
      const topicsMapParsed = JSON.parse(form.topicsMap);

      const res = await fetch("https://opulent-space-sniffle-gjvxgx75xvq2vwg6-5000.app.github.dev/api/schedule/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          topicsMap: topicsMapParsed,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Schedule generated successfully!");
        console.log("✅ Data:", data);
      } else {
        setMessage(`❌ Error: ${data.error || data.details}`);
      }
    } catch (err) {
      setMessage("❌ Failed to generate schedule. Check console.");
      console.error("❌ Error:", err);
    }
  };

  return (
    <main style={styles.container}>
      <h1>📅 Generate Study Schedule</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="topicsMap"
          placeholder='Topics Map as JSON (e.g. {"Math":["Algebra"]})'
          value={form.topicsMap}
          onChange={handleChange}
          rows={6}
          required
          style={styles.textarea}
        />

        <input
          type="number"
          name="dailyStudyLimit"
          placeholder="Daily Study Limit (hours)"
          value={form.dailyStudyLimit}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <select
          name="preferredStudyTime"
          value={form.preferredStudyTime}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>

        <select
          name="difficultylevel"
          value={form.difficultylevel}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button type="submit" style={styles.button}>
          Generate Schedule
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem",
  },
  input: {
    padding: "0.6rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "0.6rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
};
