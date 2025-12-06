"use client";

import { NextResponse } from "next/server";
//import User from "f1connect/src/types/user.ts";
//import { connectDB } from "@/lib/mongodb";
//import jwt from "jsonwebtoken";
//const nodemailer = require("nodemailer");
import bcrypt from "bcryptjs";

const uri =
  "mongodb+srv://zshariff435:sUQtFpy0bee8B8Sb@f1connect-test.rruc4ia.mongodb.net/?appName=F1Connect-Test";

/*const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, username, password, name, country, year, major } = body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    // Create user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      name,
      country,
      year,
      major,
      verificationToken,
      isVerified: false,
    });

    // Send verification email
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your F1 Connect account",
      html: `
        <h1>Welcome to F1 Connect!</h1>
        <p>Click the link below to verify your account:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    });

    return NextResponse.json(
      {
        message:
          "Registration successful. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
*/
const RegisterForm = () => {
  /* //Uncomment when we have a database set up
    const [state, formAction] = useFormState(register, undefined);

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router]);
    */

  return (
    <div>
      {/* <form action={formAction}> */}
      <form className="flex flex-col gap-4 mx-auto">
        <input type="text" placeholder="school email" name="email" />
        <input type="text" placeholder="username" name="username" />
        <input type="text" placeholder="name" name="name" />
        <label htmlFor="countries">Your country of origin:</label>
        <select id="countries" name="country">
          <option value="default">Select</option>
          <option value="china">China</option>
          <option value="korea">South Korea</option>
          <option value="india">India</option>
        </select>
        <label htmlFor="year">Grad year:</label>
        <select id="year" name="year">
          <option value="default">Select</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
        <input type="text" placeholder="major" name="major" />
        <input type="password" placeholder="password" name="password" />
        <input
          type="text"
          placeholder="repeat password"
          name="passwordRepeat"
        />
        <button>Register</button>

        {/* {state?.error} */}
      </form>
    </div>
  );
};

export default RegisterForm;
