"use client";

import Image from "next/image";

export default function Home() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(form) as Record<string, string>;

    if (
      !data.email ||
      !data.username ||
      !data.name ||
      !data.country ||
      !data.year ||
      !data.major ||
      !data.password ||
      !data.passwordRepeat
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (!data.email.endsWith(".edu")) {
      alert("Please use a valid school email.");
      return;
    }
    if (data.password !== data.passwordRepeat) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Replace with actual registration logic
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      //Set after stuff
    }
  }
  return (
    <div
      style={{ backgroundColor: "#232429" }}
      className=" font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <main className="bg-black-500 flex flex-col gap-[32px] row-start-2 items-center sm:items-start justify-items-center">
        <Image
          className="mx-auto"
          src="/Logo (2).png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-white text-2xl text-center mx-auto">
          Welcome to F1 Connect!
        </h1>
        {/* <form action={formAction}> */}
        <form
          onSubmit={handleSubmit}
          className="text-white flex flex-col gap-4 mx-auto"
        >
          <input
            className="text-white"
            type="text"
            placeholder="school email"
            name="email"
          />
          <input
            className="text-white"
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            className="text-white"
            type="text"
            placeholder="name"
            name="name"
          />
          <label htmlFor="countries">Your country of origin:</label>
          <select id="countries" name="country">
            <option style={{ backgroundColor: "#232429" }} value="default">
              Select
            </option>
            <option style={{ backgroundColor: "#232429" }} value="china">
              China
            </option>
            <option style={{ backgroundColor: "#232429" }} value="korea">
              South Korea
            </option>
            <option style={{ backgroundColor: "#232429" }} value="india">
              India
            </option>
          </select>
          <label htmlFor="year">Grad year:</label>
          <select id="year" name="year">
            <option style={{ backgroundColor: "#232429" }} value="default">
              Select
            </option>
            <option style={{ backgroundColor: "#232429" }} value="2026">
              2026
            </option>
            <option style={{ backgroundColor: "#232429" }} value="2027">
              2027
            </option>
            <option style={{ backgroundColor: "#232429" }} value="2028">
              2028
            </option>
            <option style={{ backgroundColor: "#232429" }} value="2029">
              2029
            </option>
          </select>
          <input type="text" placeholder="major" name="major" />
          <input type="password" placeholder="password" name="password" />
          <input
            type="password"
            placeholder="repeat password"
            name="passwordRepeat"
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#000000] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Register
          </button>

          {/* {state?.error} */}
        </form>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
