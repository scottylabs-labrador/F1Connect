import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://zshariff435:test123@f1connect-test.rruc4ia.mongodb.net/?appName=F1Connect-Test";

function equalVal(a: any, b: any) {
  if (a == null || b == null) return false;
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const traits = (body && body.traits) || {};
    const traitKeys = ["country", "year", "major"];

    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("GCs");
    const collection = database.collection("chats");

    const chats = await collection.find({}).toArray();

    // compute matchCount per chat and which traits matched
    const enriched = chats.map((chat: any) => {
      const matchedTraits: { key: string; value: any }[] = [];
      for (const k of traitKeys) {
        if (traits[k] && traits[k] !== "default" && traits[k] !== null && traits[k] !== "") {
          const chatVal = chat[k];
          if (Array.isArray(chatVal)) {
            // array case: match if array contains "any" or contains value equal to user's trait
            const hasAny = chatVal.some((v: any) => String(v).trim().toLowerCase() === "any");
            if (hasAny) {
              matchedTraits.push({ key: k, value: "any" });
            } else {
              const matched = chatVal.find((v: any) => equalVal(v, traits[k]));
              if (typeof matched !== "undefined") matchedTraits.push({ key: k, value: matched });
            }
          } else if (typeof chatVal !== "undefined" && chatVal !== null) {
            const cv = String(chatVal).trim().toLowerCase();
            if (cv === "any") {
              matchedTraits.push({ key: k, value: "any" });
            } else if (equalVal(chatVal, traits[k])) {
              matchedTraits.push({ key: k, value: chatVal });
            }
          }
        }
      }
      const matchCount = matchedTraits.length;
      return { ...chat, matchCount, matchedTraits };
    });

    // Always return all chats, but sorted by matchCount desc so matches come first
    const result = enriched.sort((a: any, b: any) => (b.matchCount || 0) - (a.matchCount || 0));

    await client.close();

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
