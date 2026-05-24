"use client";

import Link from "next/link";

export default function Navbar() {

  const scrollToSection = (id) => {

    const section = document.getElementById(id);

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (

    <nav className="bg-black/90 backdrop-blur-md text-white px-10 py-6 flex justify-between items-center sticky top-0 z-50 border-b border-gray-900">

      <Link href="/">

        <h1 className="text-5xl font-black cursor-pointer tracking-tight">

          AKSARA

        </h1>

      </Link>

      <div className="flex gap-8 items-center text-sm md:text-base">

        <Link
          href="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>

        <button
          onClick={() => scrollToSection("articles")}
          className="hover:text-gray-300 transition"
        >
          {/* Trending
        </button>

        <button
          onClick={() => scrollToSection("premium")}
          className="hover:text-gray-300 transition"
        > */}
          Articles
        </button>

        <button
          onClick={() => scrollToSection("premium")}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >

          Subscribe

        </button>

      </div>

    </nav>
  );
}