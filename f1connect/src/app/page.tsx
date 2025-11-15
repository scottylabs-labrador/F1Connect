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
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <main className="w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Image
            className="mx-auto mb-6"
            src="/Logo.png"
            alt="F1 Connect logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Welcome to F1 Connect!
          </h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                School Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your school email"
                name="email"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                name="username"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                name="name"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Two Column Layout for Country and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country Select */}
              <div>
                <label htmlFor="countries" className="block text-sm font-medium text-gray-300 mb-2">
                  Country of Origin
                </label>
                <div className="relative">
                  <select
                    id="countries"
                    name="country"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer hover:border-gray-600"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '3rem'
                    }}
                  >
                    {Object.keys(countryToRegion).map((country) => (
                      <option key={country} value={country} className="bg-gray-950 text-white py-2">
                        {country}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Grad Year Select */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
                  Graduation Year
                </label>
                <div className="relative">
                  <select
                    id="year"
                    name="year"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer hover:border-gray-600"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '3rem'
                    }}
                  >
                    <option value="default" className="bg-gray-950 text-white py-2">
                      Select Year
                    </option>
                    <option value="2026" className="bg-gray-950 text-white py-2">
                      2026
                    </option>
                    <option value="2027" className="bg-gray-950 text-white py-2">
                      2027
                    </option>
                    <option value="2028" className="bg-gray-950 text-white py-2">
                      2028
                    </option>
                    <option value="2029" className="bg-gray-950 text-white py-2">
                      2029
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Major Input */}
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-300 mb-2">
                Major
              </label>
              <div className="relative">
                  <select
                    id="countries"
                    name="country"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer hover:border-gray-600"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '3rem'
                    }}
                  >
                    {collegeMajors.map((major) => (
                      <option key={major} value={major} className="bg-gray-950 text-white py-2">
                        {major}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                name="password"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Repeat Password Input */}
            <div>
              <label htmlFor="passwordRepeat" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordRepeat"
                placeholder="Repeat your password"
                name="passwordRepeat"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              Register
            </button>

            {/* Error Message Placeholder */}
            {/* {state?.error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {state.error}
              </div>
            )} */}
          </form>
        </div>
      </main>
    </div>
  );
}
