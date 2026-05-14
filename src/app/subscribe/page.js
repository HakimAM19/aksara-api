export default function SubscribePage() {

  const plans = [
    {
      name: "Basic",
      price: "19K",
      benefit: [
        "Akses artikel biasa",
        "Komentar artikel",
      ],
    },

    {
      name: "Premium",
      price: "49K",
      benefit: [
        "Semua artikel premium",
        "Diskusi eksklusif",
        "Tanpa iklan",
      ],
    },

    {
      name: "VIP",
      price: "99K",
      benefit: [
        "Semua fitur premium",
        "Early access article",
        "Analytics eksklusif",
        "Prioritas komunitas",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5] py-20 px-10">

      <div className="text-center">

        <h1 className="text-6xl text-black">
          Choose Your Plan
        </h1>

        <p className="text-gray-600 mt-6">
          Tingkatkan pengalaman membaca Anda di AKSARA.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-20">

        {plans.map((plan, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl p-10 shadow-sm"
          >

            <h2 className="text-3xl font-black">
              {plan.name}
            </h2>

            <p className="text-5xl font-black mt-6">
              Rp {plan.price}
            </p>

            <div className="mt-8 space-y-4">

              {plan.benefit.map((item, i) => (
                <p key={i}>
                  ✅ {item}
                </p>
              ))}

            </div>

            <button className="mt-10 w-full bg-black text-white py-4 rounded-full font-bold">

              Choose Plan

            </button>

          </div>

        ))}

      </div>

    </main>
  );
}