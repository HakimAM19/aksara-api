"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesPage() {

  const [articles, setArticles] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {

    fetchArticles();

  }, [page]);



  const fetchArticles = async () => {

    try {

      const response = await fetch(

        `http://localhost:3000/api/articles?page=${page}`

      );

      const result =
        await response.json();

      if (result.success) {

        setArticles(
          result.data
        );

        setTotalPages(
          result.totalPages
        );

      }

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



        <div className="flex justify-center items-center gap-3 mt-16">

          <button

            onClick={() =>
              setPage(page - 1)
            }

            disabled={page === 1}

            className="
              px-4 py-2
              border border-gray-700
              rounded-lg
              disabled:opacity-30
            "

          >

            Previous

          </button>



          {Array.from(
            { length: totalPages },
            (_, index) => (

              <button

                key={index}

                onClick={() =>
                  setPage(index + 1)
                }

                className={`

                  px-4 py-2
                  rounded-lg

                  ${
                    page === index + 1

                      ? "bg-white text-black"

                      : "border border-gray-700"

                  }

                `}

              >

                {index + 1}

              </button>

            )
          )}



          <button

            onClick={() =>
              setPage(page + 1)
            }

            disabled={
              page === totalPages
            }

            className="
              px-4 py-2
              border border-gray-700
              rounded-lg
              disabled:opacity-30
            "

          >

            Next

          </button>

        </div>

      </section>

      <Footer />

    </main>

  );

}