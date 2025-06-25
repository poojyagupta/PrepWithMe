"use client";
import { use, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/Components/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
    alert(data.message || data.error);
  };

  return (
    <form onSubmit={login}>
      <h2>login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-6 border border-black rounded shadow"
      >
        Login
      </button>
    </form>
  );
}
