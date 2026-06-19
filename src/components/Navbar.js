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

  const [role, setRole] =
    useState(null);

  // 1. TAMBAHKAN STATE MOUNTED UNTUK MENJAGA SINKRONISASI SERVER & CLIENT
  const [mounted, setMounted] =
    useState(false);

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

  useEffect(() => {

    const userRole =
      localStorage.getItem(
        "aksara_role"
      );

    setRole(userRole);

    // 2. SET MOUNTED JADI TRUE JIKA KODE SUDAH BERJALAN DI BROWSER
    setMounted(true);

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

  const logout = () => {

    localStorage.removeItem(
      "aksara_token"
    );

    localStorage.removeItem(
      "aksara_role"
    );

    localStorage.removeItem(
      "aksara_user"
    );

    window.location.href = "/";

  };


  // 3. JIKA BELUM SELESAI RENDERING DI BROWSER, TAMPILKAN STRUKTUR NAVBAR KOSONG DULU
  // Ini trik jitu biar Server dan Client tidak tabrakan render logika di bawah
  if (!mounted) {

    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-gray-900 h-[73px]"></nav>
    );

  }


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
        ${showNavbar
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

          {(role === "admin" ||
            role === "writer") && (

              <Link
                href="/writer"
                className="hover:text-gray-300 transition"
              >
                Write
              </Link>

            )}


          {/* ======================================================== */}
          {/* PERUBAHAN DISINI: SEMBUNYIKAN TOMBOL PREMIUM JIKA ADMIN */}
          {/* ======================================================== */}
          {role !== "admin" && (

            <button
              onClick={() =>
                goToSection("premium")
              }
              className="
                bg-white
                text-black
                px-5
                py-2
                rounded-full
                font-semibold
              "
            >
              Premium
            </button>

          )}
          {/* ======================================================== */}


          {!role ? (

            <Link
              href="/login"
              className="
        border
        border-gray-700
        px-5
        py-2
        rounded-full
      "
            >
              Login
            </Link>

          ) : (

            <button
              onClick={logout}
              className="
        border
        border-red-500
        text-red-400
        px-5
        py-2
        rounded-full
      "
            >
              Logout
            </button>

          )}

        </div>

      </div>

    </nav>

  );

}