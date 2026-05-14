"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PremiumPage() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {

    fetchPremium();

  }, []);

  const fetchPremium = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/api/statistics/premium"
      );

      const data = await response.json();

      setArticles(data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <main className="bg-black text-white min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[5px] text-gray-500 text-sm">

            Premium Access

          </p>

          <h1 className="text-6xl font-black mt-4 leading-tight">

            Exclusive Premium Content

          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">

            Akses artikel eksklusif,
            insight mendalam,
            dan analisis premium dari AKSARA.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {articles.map((article) => (

            <div
              key={article.id}
              className="bg-[#111] rounded-3xl overflow-hidden border border-gray-800"
            >

              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <p className="text-yellow-400 text-sm mb-3">

                  PREMIUM ARTICLE

                </p>

                <h2 className="text-2xl font-black leading-snug">

                  {article.title}

                </h2>

                <p className="text-gray-400 mt-4 leading-7">

                  {article.preview}

                </p>

                <div className="flex justify-between items-center mt-8">

                  <p className="text-3xl font-black">

                    Rp {article.price}

                  </p>

                  <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">

                    Buy Access

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}