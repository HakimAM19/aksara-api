"use client";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import PremiumBanner from "@/components/PremiumBanner";

export default function HomePage() {

  const [freeArticles, setFreeArticles] =
    useState([]);

  const [premiumArticles, setPremiumArticles] =
    useState([]);


  // =====================================
  // FITUR BARU: UTILITY DATA ROLE UNTUK HERO
  // =====================================
  const [role, setRole] =
    useState(null);

  const [mounted, setMounted] =
    useState(false);


  useEffect(() => {

    fetchArticles();

  }, []);

  useEffect(() => {

    const hash =
      window.location.hash;

    if (hash) {

      const id =
        hash.replace("#", "");

      setTimeout(() => {

        const element =
          document.getElementById(id);

        if (element) {

          element.scrollIntoView({
            behavior: "smooth",
          });

        }

      }, 100);

    }

  }, []);


  // =====================================
  // EFFECT UNTUK MENANGKAP ROLE USER
  // =====================================
  useEffect(() => {

    const userRole =
      localStorage.getItem(
        "aksara_role"
      );

    setRole(userRole);

    setMounted(true);

  }, []);





  // =====================================
  // FETCH ALL ARTICLES
  // =====================================

const fetchArticles = async () => {

  try {

    // FREE ARTICLES
    const freeResponse = await fetch(
      "/api/articles"
    );

    const freeResult =
      await freeResponse.json();

    if (freeResult.success) {

      setFreeArticles(
        freeResult.data.slice(0, 6)
      );

    }

    // PREMIUM ARTICLES
    const premiumResponse = await fetch(
      "/api/statistics/premium"
    );

    const premiumResult =
      await premiumResponse.json();

    setPremiumArticles(
      premiumResult
    );

  } catch (error) {

    console.log(error);

  }

};




  return (

    <main className="bg-black text-white min-h-screen overflow-x-hidden">

      <Navbar />



      {/* HERO */}
      {/* Sekarang melemparkan props data role dan mounted ke komponen Hero */}
      <Hero 
        role={role} 
        mounted={mounted} 
      />





      {/* FREE ARTICLES */}

      <section
        id="articles"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <div className="mb-16">

          <p className="uppercase tracking-[5px] text-gray-500 text-sm">

            Free Articles

          </p>

          <h2 className="text-5xl md:text-6xl font-black mt-4 leading-tight">

            Latest Free Stories

          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-8">

            <p className="text-gray-400 max-w-2xl leading-8">

              Artikel gratis yang dapat dibaca
              semua orang tanpa subscription
              maupun pembelian premium.

            </p>

            <a
              href="/articles"
              className="border border-gray-700 px-6 py-3 rounded-full hover:bg-white hover:text-black transition w-fit"
            >

              Explore Articles

            </a>

          </div>

        </div>



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {freeArticles.map((article) => (

            <ArticleCard
              key={article.id}
              article={article}
            />

          ))}

        </div>

      </section>





      {/* PREMIUM */}

      <section
        id="premium"
        className="max-w-7xl mx-auto px-6 py-16"
      >

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-gray-500 text-sm">

            Premium Access

          </p>

          <h2 className="text-5xl md:text-6xl font-black mt-4 leading-tight">

            Exclusive Premium Articles

          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">

            Investigasi eksklusif,
            data journalism,
            deep analysis,
            dan report premium
            hanya untuk member AKSARA.

          </p>

        </div>



       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {premiumArticles.map((article) => (

            <div
              key={article.id}
              className="bg-[#111] border border-yellow-500 rounded-3xl overflow-hidden hover:border-yellow-300 transition flex flex-col h-full"
            >

              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-60 object-cover flex-shrink-0"
              />

              <div className="p-6 flex flex-col flex-grow justify-between">

                <div>

                  <p className="text-yellow-400 text-sm mb-3 uppercase tracking-[3px]">

                    Premium Article

                  </p>

                  <h3 className="text-2xl font-black leading-snug line-clamp-2 min-h-[4rem]">

                    {article.title}

                  </h3>

                  <p className="text-gray-400 mt-4 leading-7 line-clamp-3">

                    {article.preview}

                  </p>

                </div>


                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-900/50">

                  {/* ======================================================== */}
                  {/* LOGIKA PERUBAHAN TAMPILAN JIKA USER ADALAH ADMIN */}
                  {/* ======================================================== */}
                  {mounted && role === "admin" ? (

                    <>
                      {/* Sembunyikan nominal harga dan ganti dengan badge akses penuh */}
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                        Full Access (Admin)
                      </span>

                      {/* Arahkan tombol langsung ke halaman baca artikel, bukan halaman beli */}
                      <a
                        href={`/articles/${article.id}`}
                        className="bg-emerald-500 text-black px-5 py-3 rounded-full font-bold hover:bg-emerald-400 transition"
                      >
                        Read Article
                      </a>
                    </>

                  ) : (

                    <>
                      {/* Tampilan normal untuk reader biasa atau yang belum melakukan login */}
                      <p className="text-3xl font-black">

                        Rp {article.price}

                      </p>

                      <a
                        href={`/buy/${article.id}`}
                        className="bg-white text-black px-5 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
                      >

                        Buy Article

                      </a>
                    </>

                  )}
                  {/* ======================================================== */}

                </div>

              </div>

            </div>

          ))}

        </div>


        <div className="flex justify-center mt-14">

          <a
            href="/premium"
            className="border border-gray-700 px-7 py-4 rounded-full hover:bg-white hover:text-black transition"
          >

            View All Premium Articles

          </a>

        </div>

      </section>




      {mounted && role === "admin" ? null : (

        <section className="max-w-7xl mx-auto px-6 py-20">

          <PremiumBanner />

        </section>

      )}
      {/* ======================================================== */}


      <Footer />

    </main>
  );
}