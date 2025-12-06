"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AuthLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert("Login failed: " + (json?.error || "unknown"));
        return;
      }
      // store user traits locally for client-side filtering
      if (json?.user) {
        try {
          localStorage.setItem("f1_user", JSON.stringify(json.user));
        } catch {}
      }
      // on success go to posts
      location.href = "/posts";
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ backgroundColor: "#232429" }}
      className="min-h-screen flex items-center justify-center p-8"
    >
      <div className="w-full max-w-md bg-white/95 rounded-xl p-6 shadow">
        <div className="text-center mb-4">
          <Image src="/Logo (2).png" alt="Logo" width={140} height={30} />
          <h2 className="text-lg font-semibold mt-3">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border px-3 py-2 rounded"
            placeholder="school email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />

          <div className="flex justify-between items-center mt-2">
            <a href="/" className="text-sm text-indigo-600 underline">
              Back
            </a>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
