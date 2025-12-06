"use client";

import Image from "next/image";
const url =
  "mongodb+srv://zshariff435:test123@f1connect-test.rruc4ia.mongodb.net/?appName=F1Connect-Test";

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
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          name: data.name,
          country: data.country,
          year: data.year,
          major: data.major,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        alert("Registration failed. " + (json?.error || ""));
        return;
      }

      // registration succeeded -> go to login page
      location.href = "/auth";
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  }

  const countryToRegion: Record<string, string> = {
    // Anglo-American
    "United States": "Anglo-American",
    "Canada": "Anglo-American",
  
    // Latin America
    "Mexico": "Latin America",
    "Guatemala": "Latin America",
    "Honduras": "Latin America",
    "El Salvador": "Latin America",
    "Nicaragua": "Latin America",
    "Costa Rica": "Latin America",
    "Panama": "Latin America",
    "Belize": "Latin America",
    "Cuba": "Latin America",
    "Dominican Republic": "Latin America",
    "Haiti": "Latin America",
    "Jamaica": "Latin America",
    "Brazil": "Latin America",
    "Argentina": "Latin America",
    "Chile": "Latin America",
    "Peru": "Latin America",
    "Colombia": "Latin America",
    "Ecuador": "Latin America",
    "Bolivia": "Latin America",
    "Paraguay": "Latin America",
    "Uruguay": "Latin America",
    "Venezuela": "Latin America",
  
    // Western Europe
    "United Kingdom": "Western Europe",
    "Ireland": "Western Europe",
    "France": "Western Europe",
    "Belgium": "Western Europe",
    "Netherlands": "Western Europe",
    "Luxembourg": "Western Europe",
    "Germany": "Western Europe",
    "Switzerland": "Western Europe",
    "Austria": "Western Europe",
    "Spain": "Western Europe",
    "Portugal": "Western Europe",
    "Italy": "Western Europe",
    "Greece": "Western Europe",
    "Malta": "Western Europe",
    "Liechtenstein": "Western Europe",
    "Monaco": "Western Europe",
  
    // Eastern Europe
    "Poland": "Eastern Europe",
    "Czech Republic": "Eastern Europe",
    "Slovakia": "Eastern Europe",
    "Slovenia": "Eastern Europe",
    "Croatia": "Eastern Europe",
    "Serbia": "Eastern Europe",
    "Bosnia and Herzegovina": "Eastern Europe",
    "Montenegro": "Eastern Europe",
    "North Macedonia": "Eastern Europe",
    "Romania": "Eastern Europe",
    "Bulgaria": "Eastern Europe",
    "Ukraine": "Eastern Europe",
    "Belarus": "Eastern Europe",
    "Russia": "Eastern Europe",
    "Albania": "Eastern Europe",
  
    // Nordic
    "Sweden": "Nordic",
    "Norway": "Nordic",
    "Finland": "Nordic",
    "Denmark": "Nordic",
    "Iceland": "Nordic",
  
    // Middle East / Arab
    "Saudi Arabia": "Middle East / Arab",
    "United Arab Emirates": "Middle East / Arab",
    "Qatar": "Middle East / Arab",
    "Bahrain": "Middle East / Arab",
    "Kuwait": "Middle East / Arab",
    "Oman": "Middle East / Arab",
    "Yemen": "Middle East / Arab",
    "Iraq": "Middle East / Arab",
    "Syria": "Middle East / Arab",
    "Lebanon": "Middle East / Arab",
    "Jordan": "Middle East / Arab",
    "Egypt": "Middle East / Arab",
    "Tunisia": "Middle East / Arab",
    "Algeria": "Middle East / Arab",
    "Morocco": "Middle East / Arab",
  
    // Persian / Central Asian
    "Iran": "Persian / Central Asian",
    "Afghanistan": "Persian / Central Asian",
  
    // Turkic
    "Turkey": "Turkic",
    "Azerbaijan": "Turkic",
    "Kazakhstan": "Turkic",
    "Uzbekistan": "Turkic",
    "Turkmenistan": "Turkic",
    "Kyrgyzstan": "Turkic",
  
    // South Asia
    "India": "South Asia",
    "Pakistan": "South Asia",
    "Bangladesh": "South Asia",
    "Sri Lanka": "South Asia",
    "Nepal": "South Asia",
    "Bhutan": "South Asia",
    "Maldives": "South Asia",
  
    // Southeast Asia
    "Indonesia": "Southeast Asia",
    "Malaysia": "Southeast Asia",
    "Philippines": "Southeast Asia",
    "Singapore": "Southeast Asia",
    "Thailand": "Southeast Asia",
    "Vietnam": "Southeast Asia",
    "Myanmar": "Southeast Asia",
    "Cambodia": "Southeast Asia",
    "Laos": "Southeast Asia",
    "Brunei": "Southeast Asia",
  
    // East Asia
    "China": "East Asia",
    "Japan": "East Asia",
    "South Korea": "East Asia",
    "North Korea": "East Asia",
    "Mongolia": "East Asia",
    "Taiwan": "East Asia",
  
    // Sub-Saharan Africa
    "Nigeria": "Sub-Saharan Africa",
    "Ghana": "Sub-Saharan Africa",
    "Senegal": "Sub-Saharan Africa",
    "Ivory Coast": "Sub-Saharan Africa",
    "Sierra Leone": "Sub-Saharan Africa",
    "Liberia": "Sub-Saharan Africa",
    "Kenya": "Sub-Saharan Africa",
    "Tanzania": "Sub-Saharan Africa",
    "Uganda": "Sub-Saharan Africa",
    "Rwanda": "Sub-Saharan Africa",
    "Burundi": "Sub-Saharan Africa",
    "Ethiopia": "Sub-Saharan Africa",
    "Somalia": "Sub-Saharan Africa",
    "Cameroon": "Sub-Saharan Africa",
    "Chad": "Sub-Saharan Africa",
    "Central African Republic": "Sub-Saharan Africa",
    "Republic of the Congo": "Sub-Saharan Africa",
    "Democratic Republic of the Congo": "Sub-Saharan Africa",
    "South Africa": "Sub-Saharan Africa",
    "Namibia": "Sub-Saharan Africa",
    "Botswana": "Sub-Saharan Africa",
    "Zimbabwe": "Sub-Saharan Africa",
    "Zambia": "Sub-Saharan Africa",
    "Mozambique": "Sub-Saharan Africa",
    "Malawi": "Sub-Saharan Africa",
    "Lesotho": "Sub-Saharan Africa",
    "Eswatini": "Sub-Saharan Africa",
  
    // Oceania / Pacific
    "Australia": "Oceania / Pacific",
    "New Zealand": "Oceania / Pacific",
    "Fiji": "Oceania / Pacific",
    "Samoa": "Oceania / Pacific",
    "Tonga": "Oceania / Pacific",
    "Papua New Guinea": "Oceania / Pacific",
    "Vanuatu": "Oceania / Pacific"
  };

  const collegeMajors: string[] = [
    "Accounting",
    "Agriculture/Natural Resources",
    "Anthropology",
    "Architecture",
    "Art/Fine Arts",
    "Biology/Biological Sciences",
    "Business Administration/Management",
    "Chemical Engineering",
    "Chemistry",
    "Civil Engineering",
    "Communications",
    "Computer Engineering",
    "Computer Science",
    "Criminal Justice",
    "Economics",
    "Education",
    "Electrical Engineering",
    "Engineering (Other)",
    "English/Literature",
    "Environmental Science",
    "Finance",
    "Foreign Languages",
    "Health Sciences",
    "History",
    "Hospitality/Tourism Management",
    "Human Resources",
    "Information Technology/Systems",
    "International Relations",
    "Journalism",
    "Law/Legal Studies",
    "Liberal Arts",
    "Marketing",
    "Mathematics",
    "Mechanical Engineering",
    "Music",
    "Nursing",
    "Philosophy",
    "Physics",
    "Political Science",
    "Psychology",
    "Public Administration",
    "Public Health",
    "Social Work",
    "Sociology",
    "Statistics",
    "Theater/Performing Arts",
    "Other",
    "Undeclared"
  ];

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
          <label htmlFor="major">Major:</label>
          <select id="major" name="major" className="bg-[#232429] text-white">
            <option style={{ backgroundColor: "#232429" }} value="default">
              Select
            </option>
            <option style={{ backgroundColor: "#232429" }} value="cs">
              Computer Science
            </option>
            <option style={{ backgroundColor: "#232429" }} value="ee">
              Electrical Engineering
            </option>
            <option style={{ backgroundColor: "#232429" }} value="me">
              Mechanical Engineering
            </option>
          </select>
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
    </div>
  );
}
