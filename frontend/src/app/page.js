"use client";
import { useState } from "react";
import Login from "../../components/login";
import SignupForm from "../../components/signup";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to PrepWithMe</h1>
      <div className="grid space-x-8">
        <SignupForm className="p-9" />
        <Login />
      </div>
    </div>
  );
}
