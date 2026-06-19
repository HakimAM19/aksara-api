"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {

  const [role, setRole] = useState(null);

  const [mounted, setMounted] = useState(false);


  useEffect(() => {

    const userRole = localStorage.getItem("aksara_role");

    setRole(userRole);

    setMounted(true);

  }, []);


  return (
    <footer className="bg-black text-white border-t border-gray-900">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          AKSARA
        </h2>

        <p className="text-gray-400 mt-3 max-w-lg leading-7 text-sm md:text-base">

          Platform media modern berbasis premium journalism,
          data, dan diskusi publik digital.

        </p>

        <div className="border-t border-gray-800 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-gray-500 text-sm">
            © 2026 Aksara. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm text-gray-400">


            {mounted && role === "admin" ? null : (

              <Link
                href="/subscribe"
                className="hover:text-white transition font-bold border border-white px-4 py-2 rounded-full"
              >
                Subscribe
              </Link>

            )}

          </div>

        </div>

      </div>

    </footer>
  );
}