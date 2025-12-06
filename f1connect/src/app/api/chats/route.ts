import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://zshariff435:test123@f1connect-test.rruc4ia.mongodb.net/?appName=F1Connect-Test";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, link, country, year, major } = body ?? {};

    if (!name || !link) {
      return NextResponse.json({ error: "Missing name or link" }, { status: 400 });
    }

    // normalize incoming trait values: country/major -> lowercase (keep "any"), year -> string
    const normCountry =
      typeof country === "string" ? (country.trim().toLowerCase() === "any" ? "any" : country.trim().toLowerCase()) : undefined;
    const normMajor =
      typeof major === "string" ? (major.trim().toLowerCase() === "any" ? "any" : major.trim().toLowerCase()) : undefined;
    const normYear = typeof year === "string" ? year.trim() : undefined;

    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("GCs");
    const collection = database.collection("chats");

    const doc: any = {
      name: String(name).trim(),
      link: String(link).trim(),
      createdAt: new Date(),
    };
    if (typeof normCountry !== "undefined") doc.country = normCountry;
    if (typeof normYear !== "undefined") doc.year = normYear;
    if (typeof normMajor !== "undefined") doc.major = normMajor;

    const result = await collection.insertOne(doc);
    await client.close();

    return NextResponse.json({ ok: true, id: result.insertedId.toString() });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// New: explicitly disable DELETE requests to this endpoint so chats cannot be removed
export async function DELETE() {
  return NextResponse.json({ error: "Chat deletion is disabled." }, { status: 405 });
}
