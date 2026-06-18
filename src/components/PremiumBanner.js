import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PremiumBanner() {
  return (
    <section
      id="premium"
      className="bg-black text-white py-20 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">

        <p className="uppercase tracking-[6px] text-gray-400 mb-4 text-sm">
          Premium Experience
        </p>

        <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          Unlock Exclusive Journalism
        </h2>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Nikmati artikel premium, analisis mendalam,
          diskusi eksklusif, dan pengalaman membaca tanpa batas.
        </p>

        <Link href="/subscribe">
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition">
            Subscribe Now
          </button>
        </Link>

      </div>
    </section>
  );
}