"use client";

import {
  useEffect,
  useState,
  use,
} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BuyArticlePage({
  params,
}) {

  const resolvedParams = use(params);

  const id = resolvedParams.id;

  const [article, setArticle] =
    useState(null);

  const [success, setSuccess] =
    useState(false);

  useEffect(() => {

    if (!id) return;

    fetchArticle();

  }, [id]);

  const fetchArticle = async () => {

    try {

      const response = await fetch(
        `http://localhost:3000/api/articles/${id}`
      );

      const data = await response.json();

      setArticle(data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleBuy = async () => {

    try {

      await fetch(
        "http://localhost:3000/api/article-purchases",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            article_id: article.id,

            buyer_name: "Anonymous User",

            amount: article.price,

            status: "paid",

          }),

        }
      );

      setSuccess(true);

      // AUTO REDIRECT KE ARTICLE
      setTimeout(() => {

        window.location.href =
          `/articles/${article.id}?unlocked=true`;

      }, 2000);

    } catch (error) {

      console.log(error);

    }
  };

  if (!article) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );
  }

  return (

    <main className="bg-black text-white min-h-screen">

      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-24 text-center">

        

        <p className="text-yellow-400 uppercase tracking-[4px] text-sm">

          Premium Article

        </p>

        <h1 className="text-6xl font-black mt-6 leading-tight">

          {article.title}

        </h1>

        <p className="text-gray-400 mt-8 leading-8 text-lg">

          {article.preview}

        </p>

        <div className="bg-[#111] border border-gray-800 rounded-3xl p-12 mt-12">

          <p className="text-gray-400 mb-4">

            Article Price

          </p>

          <h2 className="text-6xl font-black">

            Rp {article.price}

          </h2>

          {
            success ? (

              <div className="mt-10">

                <p className="text-green-400 text-2xl font-bold">

                  Payment Success

                </p>

                <p className="text-gray-500 mt-4">

                  Redirecting to article...

                </p>

              </div>

            ) : (

              <button
                onClick={handleBuy}
                className="mt-10 bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-gray-200 transition"
              >

                Confirm Purchase

              </button>

            )
          }

        </div>

      </section>

      <Footer />

    </main>
  );
}