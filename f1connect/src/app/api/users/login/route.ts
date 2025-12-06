import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import crypto from "crypto";

const uri =
  "mongodb+srv://zshariff435:test123@f1connect-test.rruc4ia.mongodb.net/?appName=F1Connect-Test";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const passwordHash = crypto.createHash("sha256").update(String(password)).digest("hex");

    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db("F1Users");
    const collection = database.collection("users");

    const user = await collection.findOne({ email: String(email).trim().toLowerCase(), passwordHash });

    await client.close();

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // return traits so client can store them
    return NextResponse.json({
      ok: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name,
        country: user.country,
        year: user.year,
        major: user.major,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
