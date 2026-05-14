import Link from "next/link";

export default function ArticleCard({
  article,
}) {

  return (

    <div className="bg-[#111] rounded-3xl overflow-hidden border border-gray-800 hover:border-gray-600 transition">

      <img
        src={article.image_url}
        alt={article.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-6">

        <p className="text-gray-500 text-sm mb-3">
          👁 {article.views || 0} views
        </p>

        <h2 className="text-2xl font-black leading-snug">

          {article.title}

        </h2>

        <p className="text-gray-400 mt-4 leading-7">

          {article.preview}

        </p>

        <Link href={`/articles/${article.id}`}>

          <button className="mt-8 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">

            Read More

          </button>

        </Link>

      </div>

    </div>
  );
}