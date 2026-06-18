"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

export default function TrendingPage() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {

    fetchTrending();

  }, []);

  const fetchTrending = async () => {

    try {

      const response = await fetch(
        "/api/statistics/trending"
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

        <div className="mb-16">

          <p className="uppercase tracking-[5px] text-gray-500 text-sm">

            Trending Now

          </p>

          <h1 className="text-6xl font-black mt-4 leading-tight">

            Most Popular Articles
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl leading-8">

            Artikel dengan views tertinggi
            dan paling banyak dibaca di AKSARA.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {articles.map((article) => (

            <ArticleCard
              key={article.id}
              article={article}
            />

          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}