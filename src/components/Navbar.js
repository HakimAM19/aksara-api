"use client";

import Link from "next/link";
import {
  useRouter,
  usePathname,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();
  

  const [showNavbar, setShowNavbar] =
    useState(true);

  useEffect(() => {

    let lastScroll = 0;

    const handleScroll = () => {

      const currentScroll =
        window.scrollY;

      if (currentScroll < 100) {

        setShowNavbar(true);

      } else {

        if (currentScroll > lastScroll) {

          setShowNavbar(false);

        } else {

          setShowNavbar(true);

        }

      }

      lastScroll = currentScroll;

    };

    const handleMouseMove = (e) => {

      if (e.clientY < 80) {

        setShowNavbar(true);

      }

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

    };

  }, []);

  const goToSection = (id) => {

    if (pathname === "/") {

      const section =
        document.getElementById(id);

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
        });

      }

      return;

    }

    router.push(`/#${id}`);

  };

  return (

    <nav
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-300
        ${
          showNavbar
            ? "translate-y-0"
            : "-translate-y-full"
        }
        bg-black/90
        backdrop-blur-xl
        border-b
        border-gray-900
      `}
    >

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <Link href="/">

          <h1 className="text-3xl font-black tracking-tight">

            AKSARA

          </h1>

        </Link>

        <div className="flex gap-8 items-center">

          <Link
            href="/"
            className="hover:text-gray-300 transition"
          >
            Home
          </Link>

          <button
            onClick={() =>
              goToSection("articles")
            }
            className="hover:text-gray-300 transition"
          >
            Articles
          </button>

      <button  onClick={() =>
              goToSection("premium")
            } className="bg-white text-black px-5 py-2 rounded-full font-semibold">
  Premium
</button>

        </div>

      </div>

    </nav>

  );

}