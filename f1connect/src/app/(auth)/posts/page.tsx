"use client";
import React, { useEffect, useState } from "react";
import AddChatClient from "./AddChatClient";

type Chat = {
  _id: string;
  name?: string;
  link?: string;
  country?: string;
  year?: string;
  major?: string;
  matchCount?: number;
  matchedTraits?: { key: string; value: any }[];
};

function normalizeUrl(raw: string | undefined) {
  if (!raw) return "#";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

export default function DataPage() {
  const [posts, setPosts] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  // new: store logged-in user for display
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    country?: string;
    year?: string;
    major?: string;
  } | null>(null);

  async function fetchFilteredChats() {
    setLoading(true);
    try {
      // ensure we always have latest user available for display too
      const rawUser =
        typeof window !== "undefined" ? localStorage.getItem("f1_user") : null;
      const storedUser = rawUser ? JSON.parse(rawUser) : null;
      if (storedUser) setUser(storedUser);
      const traits = {
        country: storedUser?.country ?? null,
        year: storedUser?.year ?? null,
        major: storedUser?.major ?? null,
      };
      const res = await fetch("/api/chats/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ traits }),
      });
      if (res.ok) {
        const json = await res.json();
        setPosts(json || []);
      } else {
        setPosts([]);
      }
    } catch (err) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  // ensure user state is populated on mount (in case fetch isn't called immediately)
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem("f1_user") : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    fetchFilteredChats();
    // listen for a simple reload event when AddChatClient finishes (keeps things simple)
    const onReload = () => fetchFilteredChats();
    window.addEventListener("f1:chats:changed", onReload);
    return () => window.removeEventListener("f1:chats:changed", onReload);
  }, []);

  // remove any "delete"/"remove" UI elements and prevent them from reappearing
  useEffect(() => {
    function removeDeleteElements() {
      try {
        // remove by visible text (case-insensitive)
        const els = Array.from(document.querySelectorAll("button, a, [role='button']"));
        els.forEach((el) => {
          const txt = (el.textContent || "").trim().toLowerCase();
          if (txt === "delete" || txt === "remove" || txt === "✕" || txt === "x") {
            el.remove();
            return;
          }
          const aria = (el.getAttribute && el.getAttribute("aria-label") || "").toLowerCase();
          if (aria === "delete" || aria === "remove") {
            el.remove();
            return;
          }
          const dataAction = (el.getAttribute && el.getAttribute("data-action") || "").toLowerCase();
          if (dataAction === "delete") {
            el.remove();
            return;
          }
          if (el.className && String(el.className).toLowerCase().includes("delete")) {
            el.remove();
            return;
          }
        });
      } catch {}
    }

    removeDeleteElements();
    const mo = new MutationObserver(removeDeleteElements);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#232429" }}
      className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-black">All Chats</h1>
          </div>
          <a href="/auth" className="text-sm text-indigo-600 underline">
            Back to Login
          </a>
        </div>

        {/* Chats list */}
        <div className="flex flex-col items-center gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-600">No chats available.</div>
          ) : (
            <>
              {/* matched chats (matchCount > 0) */}
              {posts
                .filter((p) => (p.matchCount || 0) > 0)
                .map((post) => (
                  <div
                    key={post._id?.toString() ?? Math.random()}
                    className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-sm border w-full sm:w-80 md:w-96 h-56 relative"
                  >
                    {/* match badge */}
                    {typeof post.matchCount === "number" && (
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded">
                        {post.matchCount} match
                        {post.matchCount !== 1 ? "es" : ""}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                        {post.name ? post.name.charAt(0).toUpperCase() : "C"}
                      </div>
                      <h2 className="text-lg font-semibold truncate">
                        {post.name}
                      </h2>
                    </div>

                    {/* matched trait pills */}
                    <div className="mt-2">
                      {post.matchedTraits && post.matchedTraits.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {post.matchedTraits.map((t, idx) => {
                            const label =
                              t.key === "country"
                                ? `Country: ${String(t.value)}`.replace(
                                    /^any$/i,
                                    "Any"
                                  )
                                : t.key === "year"
                                ? `Year: ${String(t.value)}`
                                : t.key === "major"
                                ? `Major: ${String(t.value)}`
                                : `${t.key}: ${String(t.value)}`;
                            return (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">
                          No traits matched
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 truncate mt-3">
                      {post.link}
                    </p>
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-xs text-gray-500">
                        {post.country
                          ? post.country + (post.year ? " • " : "")
                          : ""}
                        {post.year ? post.year + (post.major ? " • " : "") : ""}
                        {post.major ? post.major : ""}
                      </div>
                      <a
                        href={normalizeUrl(post.link)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        Open
                      </a>
                    </div>
                  </div>
                ))}

              {/* separator for other chats */}
              {posts.some((p) => (p.matchCount || 0) === 0) && (
                <div className="w-full flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300" />
                  <div className="px-4 text-sm text-gray-600">
                    Other chats below
                  </div>
                  <div className="flex-grow border-t border-gray-300" />
                </div>
              )}

              {/* other chats (matchCount === 0) */}
              {posts
                .filter((p) => (p.matchCount || 0) === 0)
                .map((post) => (
                  <div
                    key={post._id?.toString() ?? Math.random()}
                    className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-sm border w-full sm:w-80 md:w-96 h-56 relative"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                        {post.name ? post.name.charAt(0).toUpperCase() : "C"}
                      </div>
                      <h2 className="text-lg font-semibold truncate">
                        {post.name}
                      </h2>
                    </div>

                    {/* matched trait pills OR 'No traits matched' */}
                    <div className="mt-2">
                      {post.matchedTraits && post.matchedTraits.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {post.matchedTraits.map((t, idx) => {
                            const label =
                              t.key === "country"
                                ? `Country: ${String(t.value)}`.replace(
                                    /^any$/i,
                                    "Any"
                                  )
                                : t.key === "year"
                                ? `Year: ${String(t.value)}`
                                : t.key === "major"
                                ? `Major: ${String(t.value)}`
                                : `${t.key}: ${String(t.value)}`;
                            return (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">
                          No traits matched
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 truncate mt-3">
                      {post.link}
                    </p>
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-xs text-gray-500">
                        {post.country
                          ? post.country + (post.year ? " • " : "")
                          : ""}
                        {post.year ? post.year + (post.major ? " • " : "") : ""}
                        {post.major ? post.major : ""}
                      </div>
                      <a
                        href={normalizeUrl(post.link)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        Open
                      </a>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>

      {/* client-side add-chat UI (fixed bottom-right) */}
      <AddChatClient />

      {/* bottom-left user info box */}
      {user && (
        <div className="fixed left-6 bottom-6 z-50 bg-white/95 text-black rounded-lg shadow p-3 w-56">
          <div className="font-semibold text-sm truncate">
            {user.name || user.username || user.email}
          </div>
          <div className="text-xs text-gray-600 mt-2">
            {user.country ? <div>Country: {user.country}</div> : null}
            {user.year ? <div>Year: {user.year}</div> : null}
            {user.major ? <div>Major: {user.major}</div> : null}
          </div>
        </div>
      )}
    </div>
  );
}
