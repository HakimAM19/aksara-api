"use client";

import {
  useEffect,
  useState,
  use,
} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArticleDetail({
  params,
}) {

  const resolvedParams = use(params);

  const id = resolvedParams.id;

  const [article, setArticle] = useState(null);

  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  useEffect(() => {

    if (!id) return;

    fetchArticle();

    fetchComments();

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

  const fetchComments = async () => {

    try {

      const response = await fetch(
        `http://localhost:3000/api/comments/article/${id}`
      );

      const data = await response.json();

      setComments(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.log(error);

      setComments([]);

    }
  };

  const submitComment = async () => {

    if (!comment) {

      return alert("Komentar kosong");

    }

    try {

      await fetch(
        "http://localhost:3000/api/comments",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            article_id: Number(id),

            user_id: 1,

            comment: comment,

          })
        }
      );

      setComment("");

      fetchComments();

    } catch (error) {

      console.log(error);

    }
  };

  const deleteComment = async (
    commentId
  ) => {

    try {

      await fetch(

        `http://localhost:3000/api/comments/${commentId}`,

        {
          method: "DELETE",
        }
      );

      setComments((prev) =>
        prev.filter(
          (item) =>
            item.id !== commentId
        )
      );

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

  const searchParams =
    new URLSearchParams(
      window.location.search
    );

  const unlocked =
    searchParams.get("unlocked");

  const isPremium =
    Number(article.price) > 0 &&
    unlocked !== "true";

  return (

    <main className="bg-black text-white min-h-screen">

      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-20">

      

        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-[500px] object-cover rounded-3xl"
        />

        <div className="mt-12">

          <p className="text-gray-500 mb-4">

            👁 {article.views} views

          </p>

          <h1 className="text-6xl font-black leading-tight">

            {article.title}

          </h1>

          <p className="text-gray-400 mt-6 leading-8 text-lg">

            {article.preview}

          </p>

          {
            !isPremium ? (

              <div
                className="text-gray-300 leading-9 text-lg mt-12"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              />

            ) : (

              <div className="mt-12 bg-[#111] border border-yellow-500 rounded-3xl p-10 text-center">

                <p className="text-yellow-400 uppercase tracking-[4px] text-sm">

                  Premium Article

                </p>

                <h2 className="text-4xl font-black mt-4">

                  Unlock Full Access

                </h2>

                <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">

                  Artikel ini merupakan
                  konten premium eksklusif.

                </p>

                <div className="mt-10">

                  <p className="text-5xl font-black text-white mb-8">

                    Rp {article.price}

                  </p>

                  <a
                    href={`/buy/${article.id}`}
                    className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition"
                  >

                    Buy Article

                  </a>

                </div>

              </div>

            )
          }

        </div>

      </section>

      {/* COMMENTS */}

      <section className="max-w-4xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-black mb-10">

          Discussion

        </h2>

        <div className="space-y-6 mb-10">

          {
            comments.length > 0 ? (

              comments.map((item) => (

                <div
                  key={item.id}
                  className="bg-[#111] border border-gray-800 rounded-2xl p-6"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="font-bold text-lg text-white">
                      Anonymous
                    </h3>

                    <button
                      onClick={() =>
                        deleteComment(item.id)
                      }
                      className="text-red-400 hover:text-red-300"
                    >

                      Delete

                    </button>

                  </div>

                  <p className="text-gray-400 mt-4 leading-7">

                    {item.comment}

                  </p>

                </div>

              ))

            ) : (

              <div className="bg-[#111] border border-gray-800 rounded-2xl p-10 text-center">

                <p className="text-gray-500">

                  Belum ada komentar.

                </p>

              </div>

            )
          }

        </div>

        <div className="space-y-4">

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your comment..."
            rows="5"
            className="w-full bg-[#111] border border-gray-800 rounded-2xl p-6 outline-none text-white"
          />

          <button
            onClick={submitComment}
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition"
          >

            Submit Comment

          </button>

        </div>

      </section>

      <Footer />

    </main>
  );
}