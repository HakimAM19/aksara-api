import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white border-b">

      <div className="max-w-7xl mx-auto px-6 py-24">

        <p className="uppercase tracking-[4px] text-gray-400 text-sm">
          Digital Journalism Platform
        </p>

        <h1 className="text-black text-5xl md:text-7xl font-black leading-tight mt-6 max-w-5xl">

          Masa Depan
          Jurnalisme Digital
          Dimulai di AKSARA. TES 123

        </h1>

        <p className="text-gray-600 text-lg mt-8 max-w-2xl leading-8">

          Platform artikel modern dengan
          premium subscription,
          diskusi pembaca,
          dan analisis isu sosial berbasis data.

        </p>

        <div className="flex gap-4 mt-10">

          <a href="#articles">

            <button className="bg-black text-white px-8 py-4 rounded-full font-semibold">
              Explore Articles
            </button>

          </a>

          <Link href="/writer">

            <button className="text-black border border-black px-8 py-4 rounded-full font-semibold">
              Become Writer
            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}