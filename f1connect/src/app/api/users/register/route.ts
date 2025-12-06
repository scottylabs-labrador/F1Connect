import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import crypto from "crypto";

const uri =
  "mongodb+srv://zshariff435:test123@f1connect-test.rruc4ia.mongodb.net/?appName=F1Connect-Test";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { email, username, name, country, year, major, password } = body ?? {};

    if (!email || !username || !name || !country || !year || !major || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // basic email check
    if (!String(email).endsWith(".edu")) {
      return NextResponse.json({ error: "Use a valid school email (.edu)" }, { status: 400 });
    }

    // normalize incoming strings
    email = String(email).trim().toLowerCase();
    username = String(username).trim();
    name = String(name).trim();
    // normalize trait values to lowercase so they match inserted chat traits
    country = String(country).trim().toLowerCase();
    year = String(year).trim();
    major = String(major).trim().toLowerCase();

    const passwordHash = crypto.createHash("sha256").update(String(password)).digest("hex");

    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db("F1Users"); // separate DB
    const collection = database.collection("users");

    // Prevent duplicate emails
    const existing = await collection.findOne({ email });
    if (existing) {
      await client.close();
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const result = await collection.insertOne({
      email,
      username,
      name,
      country,
      year,
      major,
      passwordHash,
      createdAt: new Date(),
    });

    await client.close();

    return NextResponse.json({ ok: true, id: result.insertedId.toString() });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
