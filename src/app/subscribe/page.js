export default function SubscribePage() {

  const plans = [

    {
      name: "Basic",

      price: "19K",

      description:
        "Untuk pembaca kasual yang ingin menikmati artikel pilihan.",

      benefit: [
        "Akses artikel gratis",
        "Komentar artikel",
        "Bookmark artikel",
      ],

      badge: "STARTER",
    },



    {
      name: "Premium",

      price: "49K",

      description:
        "Nikmati seluruh artikel premium dan pengalaman membaca tanpa batas.",

      benefit: [
        "Semua artikel premium",
        "Diskusi eksklusif",
        "Tanpa iklan",
        "Akses investigasi khusus",
      ],

      badge: "MOST POPULAR",

      featured: true,
    },



    {
      name: "VIP",

      price: "99K",

      description:
        "Akses penuh seluruh fitur eksklusif AKSARA untuk pembaca serius.",

      benefit: [
        "Semua fitur premium",
        "Early access article",
        "Analytics eksklusif",
        "Prioritas komunitas",
        "VIP discussion room",
      ],

      badge: "ULTIMATE",
    },

  ];



  return (

    <main className="min-h-screen bg-black text-white py-24 px-6">




      {/* HEADER */}

      <section className="text-center max-w-3xl mx-auto">

        <p className="uppercase tracking-[5px] text-gray-500 text-sm">

          Subscription Plans

        </p>

        <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">

          Choose Your Plan

        </h1>

        <p className="text-gray-400 mt-8 leading-8 text-lg">

          Tingkatkan pengalaman membaca Anda
          dengan akses premium,
          investigative journalism,
          dan diskusi eksklusif di AKSARA.

        </p>

      </section>





      {/* PLANS */}

      <section className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-24">

        {plans.map((plan, index) => (

          <div
            key={index}
            className={`

              rounded-[32px]
              p-10
              border
              transition
              hover:-translate-y-2
              duration-300

              ${plan.featured
                ? "bg-white text-black border-white scale-105"
                : "bg-[#111] border-gray-800"}

            `}
          >




            {/* BADGE */}

            <div>

              <span
                className={`

                  text-xs
                  tracking-[3px]
                  font-bold
                  px-4
                  py-2
                  rounded-full

                  ${plan.featured
                    ? "bg-black text-white"
                    : "bg-white text-black"}

                `}
              >

                {plan.badge}

              </span>

            </div>





            {/* PLAN */}

            <div className="mt-8">

              <h2 className="text-4xl font-black">

                {plan.name}

              </h2>

              <p
                className={`

                  mt-5
                  leading-7

                  ${plan.featured
                    ? "text-gray-700"
                    : "text-gray-400"}

                `}
              >

                {plan.description}

              </p>

            </div>





            {/* PRICE */}

            <div className="mt-10 flex items-end gap-3">

              <h3 className="text-6xl font-black">

                Rp {plan.price}

              </h3>

              <span
                className={plan.featured
                  ? "text-gray-600 mb-2"
                  : "text-gray-500 mb-2"}
              >

                / month

              </span>

            </div>





            {/* BENEFITS */}

            <div className="mt-10 space-y-5">

              {plan.benefit.map((item, i) => (

                <div
                  key={i}
                  className="flex items-center gap-4"
                >

                  <div
                    className={`

                      w-6
                      h-6
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-sm

                      ${plan.featured
                        ? "bg-black text-white"
                        : "bg-white text-black"}

                    `}
                  >

                    ✓

                  </div>

                  <p>

                    {item}

                  </p>

                </div>

              ))}

            </div>





            {/* BUTTON */}

            <button
              className={`

                mt-14
                w-full
                py-5
                rounded-full
                font-bold
                text-lg
                transition

                ${plan.featured
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-white text-black hover:bg-gray-200"}

              `}
            >

              Choose Plan

            </button>

          </div>

        ))}

      </section>

    </main>

  );

}