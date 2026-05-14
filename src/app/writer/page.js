"use client";

import { useState } from "react";

import Editor from "@/components/Editor";

export default function WriterPage() {

  const [form, setForm] = useState({

    user_id: 1,

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

      const response = await fetch(

        "http://localhost:3000/api/articles",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(form),

        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Artikel berhasil dipublish!");

      } else {

        alert(data.error);
      }

    } catch (error) {

      console.log(error);

      alert("Terjadi kesalahan");
    }
  };

  return (

    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black mb-4">
          Become Writer
        </h1>

        <p className="text-gray-400 mb-12 leading-8">

          Bagikan perspektif,
          analisis,
          dan tulisan terbaikmu di AKSARA.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <select
            name="topic_id"
            value={form.topic_id}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#111] border border-gray-800"
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
            className="w-full p-4 rounded-xl bg-[#111] border border-gray-800"
          />

          <textarea
            name="preview"
            value={form.preview}
            placeholder="Short Preview"
            rows="3"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#111] border border-gray-800"
          />

          <Editor
            content={form.content}
            setContent={(value) =>
              setForm({
                ...form,
                content: value,
              })
            }
          />

          <input
            type="text"
            name="image_url"
            value={form.image_url}
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#111] border border-gray-800"
          />

          <select
            name="article_type"
            value={form.article_type}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#111] border border-gray-800"
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

          <input
            type="number"
            name="price"
            value={form.price}
            placeholder="Article Price"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#111] border border-gray-800"
          />

          <select
            name="is_premium"
            value={form.is_premium}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#111] border border-gray-800"
          >

            <option value="0">
              Free Article
            </option>

            <option value="1">
              Premium Article
            </option>

          </select>

          <button
            type="submit"
            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition"
          >

            Publish Article

          </button>

        </form>

      </div>

    </main>
  );
}