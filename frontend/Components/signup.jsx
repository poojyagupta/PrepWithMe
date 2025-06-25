"use client";
import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const signup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/Components/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await res.json();
    console.log(data);
    alert(data.message || data.error);
  };

  return (
    <form onSubmit={signup}>
      <h2>Signup</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-6 border border-black rounded shadow"
      >
        Signup
      </button>
    </form>
  );
}
