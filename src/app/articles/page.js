"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesPage() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {

    fetchArticles();

  }, []);

  const fetchArticles = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/api/articles"
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

            All Articles

          </p>

          <h1 className="text-6xl font-black mt-4">

            Explore Every Story

          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl leading-8">

            Semua artikel terbaru,
            trending,
            dan premium dari AKSARA.

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