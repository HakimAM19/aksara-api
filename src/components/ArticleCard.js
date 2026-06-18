import Link from "next/link";

export default function ArticleCard({
  article,
}) {

  // DETEKSI LOGIKA: Apakah artikel berbayar/premium atau gratis?
  const isPremium =
    Number(article.price) > 0;

  return (

    <div
      className={`
        flex flex-col justify-between
        bg-[#0c0c0e]
        rounded-3xl
        overflow-hidden
        p-6
        transition-all
        duration-300
        group
        hover:-translate-y-1
        shadow-xl

        ${
          isPremium
            ? "border border-zinc-800 hover:border-yellow-500/50"
            : "border border-zinc-900 hover:border-zinc-700"
        }
      `}
    >

      {/* BAGIAN ATAS: GAMBAR, VIEWS, DAN JUDUL/PREVIEW */}
      <div>

        {/* Rasio gambar dikunci 16:10 agar tinggi kotak seragam di semua card */}
        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 relative mb-5">

          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Pengaman otomatis jika link gambar di database kosong/rusak
              e.target.src =
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600";
            }}
          />

          {
            isPremium && (
              <span className="absolute top-4 left-4 bg-yellow-500/10 backdrop-blur-md text-yellow-400 border border-yellow-500/20 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Premium
              </span>
            )
          }

        </div>



        {/* Viewers Log: Hanya tampil untuk artikel gratis agar bersih */}
        {
          !isPremium && (
            <p className="text-zinc-500 text-sm mb-3">
              👁 {article.views || 0} views
            </p>
          )
        }



        {/* Judul dikunci maksimal 2 baris agar layout teks selalu simetris */}
        <h2
          className={`
            text-2xl
            font-black
            leading-snug
            line-clamp-2
            transition-colors

            ${
              isPremium
                ? "text-white group-hover:text-yellow-400"
                : "text-zinc-100 group-hover:text-yellow-500"
            }
          `}
        >
          {article.title}
        </h2>



        {/* Deskripsi singkat dikunci maksimal 2 baris */}
        <p className="text-zinc-400 mt-4 leading-7 line-clamp-2">
          {article.preview}
        </p>

      </div>



      {/* BAGIAN BAWAH: HARGA DAN BUTTON ACTION (Posisinya lurus sejajar di paling bawah kartu) */}
      <div
        className={`
          mt-8
          pt-4
          flex
          items-center
          justify-between

          ${
            isPremium
              ? "border-t border-zinc-900"
              : ""
          }
        `}
      >

        {
          isPremium ? (

            <>
              <div>

                <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">
                  Price
                </p>

                <p className="text-lg font-black text-white mt-0.5">
                  Rp {Number(article.price).toLocaleString("id-ID")}
                </p>

              </div>

              <Link href={`/articles/${article.id}`}>

                <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-md">

                  Buy Article

                </button>

              </Link>
            </>

          ) : (

            <Link href={`/articles/${article.id}`} className="w-full">

              <button className="w-full text-center bg-zinc-900 border border-zinc-800 text-zinc-300 py-3 rounded-xl font-semibold hover:bg-zinc-100 hover:text-black transition-all duration-300 text-sm">

                Read More

              </button>

            </Link>

          )
        }

      </div>

    </div>
  );
}