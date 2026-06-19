"use client";

import { useState, useEffect } from "react"; // <-- Ditambahkan useEffect untuk proteksi halaman

import { useRouter } from "next/navigation"; // <-- Ditambahkan useRouter untuk redirect

import Swal from "sweetalert2"; // <-- Ditambahkan SweetAlert2 untuk alert modern

import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";

export default function WriterPage() {

  const router = useRouter(); // <-- Inisialisasi router di baris pertama komponen


// ==========================================
  // PROTEKSI DIAM-DIAM (TANPA POP-UP ALERTS)
  // ==========================================
  useEffect(() => {

    const role = localStorage.getItem("aksara_role");

    if (role !== "admin" && role !== "writer") {

      // Langsung lempar ke login atau home tanpa kasih alert hitam yang mengganggu
      router.push("/");

    }

  }, [router]);


  const [form, setForm] = useState({

    topic_id: "",

    title: "",

    preview: "",

    content: "",

    image_url: "",

    article_type: "news",

    price: 0,

    is_premium: 0,

  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({

      ...form,

      [name]: value,

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const token = localStorage.getItem("aksara_token");


      if (!token) {


        Swal.fire({
          title: "Sesi Berakhir!",
          text: "Token tidak ditemukan, silakan login ulang.",
          icon: "warning",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#3085d6"
        });

        return;

      }


      const response = await fetch(

        "/api/articles",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            "authorization": token,

          },


          body: JSON.stringify(form),

        }
      );


      const data = await response.json();


      if (response.ok) {


        Swal.fire({
          title: "Berhasil!",
          text: "Artikel berhasil dipublish!",
          icon: "success",
          background: "#111",
          color: "#fff",
          timer: 2500,
          showConfirmButton: false
        });


        setForm({

          topic_id: "",

          title: "",

          preview: "",

          content: "",

          image_url: "",

          article_type: "news",

          price: 0,

          is_premium: 0,

        });


      } else {


        Swal.fire({
          title: "Gagal!",
          text: data.message || data.error || "Gagal mempublikasikan artikel.",
          icon: "error",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#3085d6"
        });

      }


    } catch (error) {

      console.log(error);


      Swal.fire({
        title: "Terjadi Kesalahan!",
        text: "Sistem mengalami gangguan, coba lagi nanti.",
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#3085d6"
      });

    }

  };


return (

  <main className="min-h-screen bg-[#0a0a0a] text-white">

    <Navbar />

    <div className="max-w-7xl mx-auto px-6 py-24">

      {/* HEADER */}

      <div className="mb-12">

        <p className="uppercase tracking-[5px] text-gray-500 text-sm">

          Writer Studio

        </p>

        <h1 className="text-6xl font-black mt-4">

          Create New Article

        </h1>

        <p className="text-gray-400 mt-6 max-w-3xl leading-8">

          Tulis artikel, analisis, investigasi, opini
          dan konten premium untuk pembaca AKSARA.

        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-[#111] border border-gray-800 rounded-3xl p-6">

          <p className="text-gray-500">

            Article Type

          </p>

          <h3 className="text-3xl font-black mt-2">

            {form.article_type}

          </h3>

        </div>

        <div className="bg-[#111] border border-gray-800 rounded-3xl p-6">

          <p className="text-gray-500">

            Status

          </p>

          <h3 className="text-3xl font-black mt-2">

            {Number(form.is_premium) === 1
              ? "Premium"
              : "Free"}

          </h3>

        </div>

        <div className="bg-[#111] border border-gray-800 rounded-3xl p-6">

          <p className="text-gray-500">

            Price

          </p>

          <h3 className="text-3xl font-black mt-2">

            Rp {form.price || 0}

          </h3>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8">

              <h2 className="text-2xl font-black mb-6">

                Article Information

              </h2>

              <div className="space-y-5">

                <select
                  name="topic_id"
                  value={form.topic_id}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-black border border-gray-700"
                >

                  <option value="">
                    Select Topic
                  </option>

                  <option value="1">
                    Sosial Politik
                  </option>

                  <option value="2">
                    Ekonomi
                  </option>

                  <option value="3">
                    Teknologi
                  </option>

                  <option value="4">
                    AI
                  </option>

                  <option value="5">
                    Olahraga
                  </option>

                  <option value="6">
                    Pendidikan
                  </option>

                  <option value="7">
                    Sosial
                  </option>

                  <option value="8">
                    Kesehatan
                  </option>

                  <option value="9">
                    Startup
                  </option>

                  <option value="10">
                    Lingkungan
                  </option>

                </select>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  placeholder="Article Title"
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-black border border-gray-700"
                />

                <textarea
                  name="preview"
                  value={form.preview}
                  placeholder="Short Preview"
                  rows="4"
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-black border border-gray-700"
                />

              </div>

            </div>

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8">

              <h2 className="text-2xl font-black mb-6">

                Article Content

              </h2>

              <Editor
                content={form.content}
                setContent={(value) =>
                  setForm({
                    ...form,
                    content: value,
                  })
                }
              />

            </div>

            <button
              type="submit"
              className="
              w-full
              bg-white
              text-black
              py-5
              rounded-2xl
              font-black
              text-lg
              hover:bg-gray-200
              transition
              "
            >

              Publish Article

            </button>

          </form>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-6">

            <h3 className="text-xl font-black mb-4">

              Thumbnail Preview

            </h3>

            {
              form.image_url ? (

                <img
                  src={form.image_url}
                  alt="preview"
                  className="
                  w-full
                  h-56
                  object-cover
                  rounded-2xl
                  "
                />

              ) : (

                <div className="
                  h-56
                  rounded-2xl
                  bg-black
                  border
                  border-dashed
                  border-gray-700
                  flex
                  items-center
                  justify-center
                  text-gray-500
                ">

                  No Image

                </div>

              )
            }

            <input
              type="text"
              name="image_url"
              value={form.image_url}
              placeholder="Image URL"
              onChange={handleChange}
              className="
              mt-4
              w-full
              p-4
              rounded-xl
              bg-black
              border
              border-gray-700
              "
            />

          </div>

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-6">

            <h3 className="text-xl font-black mb-5">

              Publishing Settings

            </h3>

            <div className="space-y-4">

              <select
                name="article_type"
                value={form.article_type}
                onChange={handleChange}
                className="
                w-full
                p-4
                rounded-xl
                bg-black
                border
                border-gray-700
                "
              >

                <option value="news">
                  News
                </option>

                <option value="explainer">
                  Explainer
                </option>

                <option value="opinion">
                  Opinion
                </option>

              </select>

              <select
                name="is_premium"
                value={form.is_premium}
                onChange={handleChange}
                className="
                w-full
                p-4
                rounded-xl
                bg-black
                border
                border-gray-700
                "
              >

                <option value="0">
                  Free Article
                </option>

                <option value="1">
                  Premium Article
                </option>

              </select>

              <input
                type="number"
                name="price"
                value={form.price}
                placeholder="Article Price"
                onChange={handleChange}
                className="
                w-full
                p-4
                rounded-xl
                bg-black
                border
                border-gray-700
                "
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  </main>

);

}