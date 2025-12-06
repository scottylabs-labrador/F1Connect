"use client";

import React, { useState } from "react";

export default function AddChatClient() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [country, setCountry] = useState("any");
  const [year, setYear] = useState("any");
  const [major, setMajor] = useState("any");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !link.trim()) {
      alert("Please fill in required fields (name and link).");
      return;
    }

    setLoading(true);
    try {
      // normalize trait values before sending
      const payload: Record<string, any> = {
        name: name.trim(),
        link: link.trim(),
      };

      // include selected values; normalize country/major to lowercase; keep 'any' as-is
      if (country)
        payload.country =
          country === "any" ? "any" : String(country).trim().toLowerCase();
      if (year) payload.year = String(year).trim();
      if (major)
        payload.major =
          major === "any" ? "any" : String(major).trim().toLowerCase();

      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert("Failed to add chat. " + (err?.error || ""));
        return;
      }
      // success: close and trigger refresh event
      setOpen(false);
      setName("");
      setLink("");
      setCountry("any");
      setYear("any");
      setMajor("any");
      // dispatch an event so posts page can re-fetch
      window.dispatchEvent(new Event("f1:chats:changed"));
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700"
        aria-label="Add chat"
        title="Add chat"
        type="button"
      >
        +
      </button>

      {/* small form panel */}
      {open && (
        <div className="fixed bottom-6 right-20 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-72">
            <div className="mb-3">
              <h3 className="text-sm font-semibold">New Chat</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                className="border px-2 py-1 rounded text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border px-2 py-1 rounded text-sm"
                placeholder="Link (e.g. example.com)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              {/* dropdowns with "Any" as the default */}
              <select
                className="border px-2 py-1 rounded text-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="china">China</option>
                <option value="korea">South Korea</option>
                <option value="india">India</option>
              </select>

              <select
                className="border px-2 py-1 rounded text-sm"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>

              <select
                className="border px-2 py-1 rounded text-sm"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
              </select>

              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm px-3 py-1 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white text-sm px-3 py-1 rounded"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
