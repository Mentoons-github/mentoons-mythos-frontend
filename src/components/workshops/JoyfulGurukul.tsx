// const weeks = [
//   {
//     number: "01",
//     title: "Discover & Imagine",
//     value: "Curiosity",
//     desc: "Spark wonder through stories and open-ended exploration of ideas.",
//   },
//   {
//     number: "02",
//     title: "Kind Hearts",
//     value: "Kindness & Empathy",
//     desc: "Build emotional awareness through role play and group activities.",
//   },
//   {
//     number: "03",
//     title: "Courage & Confidence",
//     value: "Self-belief",
//     desc: "Express, perform, and grow through safe creative challenges.",
//   },
//   {
//     number: "04",
//     title: "Creativity & Celebration",
//     value: "Expression",
//     desc: "Showcase learning through art, music, and a joyful culmination.",
//   },
// ];

import { WorkshopPlan } from "../../types/workshop/workshopPlan";

export default function JoyfulGurukul({
  clickViewMore,
  plans,
}: {
  clickViewMore: () => void;
  plans: WorkshopPlan[];
}) {
  return (
    <div className="lg:min-h-screen  py-12 px-4 ">
      <div className=" mx-auto ">
        <div className="mb-10 flex  md:items-center justify-between">
          <div>
            <h1 className="mt-5 text-2xl md:text-4xl lg:text-5xl font-bold text-foreground/90 leading-tight hidden md:block">
              🌼 The Joyful{" "}
              <span className=" italic text-foreground/60">
                Gurukul{" "}
                <span className="block lg:inline ml-10 lg:ml-0 text-xl md:text-2xl lg:text-3xl">
                  (Age: 6-12, 13-19)
                </span>
              </span>
            </h1>

            <div className=" mt-5 md:0 md:hidden flex">
              <h1 className="mt-5 text-2xl md:text-4xl lg:text-5xl font-bold text-foreground/90 leading-tight">
                🌼The Joyful{" "}
                <span className=" italic text-foreground/60">
                  Gurukul (Age: 6-12, 13-19)
                </span>
              </h1>
              <img
                src="assets/logo/The Joyful gurukul.png"
                alt=""
                className="w-32 md:w-60 lg:w-96 "
              />
            </div>

            <p className="mt-4 text-foreground/80 max-w-xl leading-relaxed font-medium md:text-[19px]">
              A 1-month interactive journey combining storytelling, music, art,
              creativity, and Indian values — bringing the ancient Gurukul to
              life in a joyful modern way.
            </p>
          </div>
          <div className="lg:pr-10 mt-5 md:0 hidden md:block">
            <img
              src="assets/logo/The Joyful gurukul.png"
              alt=""
              className="w-48 md:w-60 lg:w-96 "
            />
          </div>
        </div>

        {/* ── VISION + FEATURES ── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14 border-t pt-5 border-stone-200 ">
          {/* VISION */}
          <div>
            <h3 className="text-base font-semibold text-foreground/60 uppercase tracking-widest mb-3">
              🌟 Vision
            </h3>
            <p className="text-foreground/70 text-[18px] font-medium leading-7 border-l-2 border-amber-500 pl-4">
              Recreates the ancient Gurukul system in a fun modern way where
              kids learn through stories, music, and creativity — nurturing
              curiosity, compassion, and confidence.
            </p>

            {/* <div className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl shadow-sm">
              <span className="text-xl">🚀</span>

              <p className="text-sm md:text-base font-medium">
                First batch starting on{" "}
                <span className="font-semibold text-amber-900">April 16th</span>
              </p>
            </div> */}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, ind) => (
              <div
                className={`relative border  ${ind % 2 == 0 ? "bg-background/80" : "bg-foreground/90 text-background"}  rounded-2xl p-6 shadow-sm  transition-all duration-300`}
                key={ind}
              >
                <span
                  className={`absolute top-3 right-3 text-xs ${ind % 2 == 0 ? "bg-green-100 text-green-600" : "bg-background/20"} px-3 py-1 rounded-full font-semibold`}
                >
                  {ind % 2 == 0 ? "Popular" : "Best Value"}
                </span>
                <h3
                  className={`text-xl font-semibold ${ind % 2 == 0 && "text-foreground/85"} mb-2`}
                >
                  {plan.months} {plan.months==="1"?"Month":"Months"}
                </h3>

                <p
                  className={`text-3xl font-bold ${ind % 2 == 0 && "text-green-500"} mb-4`}
                >
                  ₹{Number(plan.price).toLocaleString("en-IN")}
                </p>

                <div
                  className={`space-y-2 ${ind % 2 == 0 && "text-muted-foreground"} font-semibold text-base`}
                >
                  <p>📅 {plan.duration} Weeks</p>
                  <p>🎯 {plan.totalSessions} Sessions</p>
                </div>

                <button
                  onClick={clickViewMore}
                  className={`mt-6 w-full ${ind % 2 == 0 ? "bg-foreground/90 hover:bg-foreground/80 " : "bg-background/90 text-foreground hover:bg-background/80"}  text-background py-2 rounded-lg font-medium transition`}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── CURRICULUM ── */}
        {/* <div>
          <h3 className="text-base font-semibold text-foreground/60 uppercase tracking-widest mb-6">
            Curriculum
          </h3>

          <div className="flex flex-col lg:flex-row gap-5 overflow-x-auto lg:overflow-visible pb-2">
            {weeks.map((week, i) => (
              <div
                key={i}
                className="min-w-[260px] md:min-w-0 flex-1 bg-background border border-muted-foreground rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 px-5 py-5 border-b border-muted-foreground">
                  <div className="text-xs flex flex-col items-center justify-center">
                    <p className="-mb-2 text-foreground/60">Week</p>
                    <span className="text-2xl font-bold text-foreground/60">
                      {week.number}
                    </span>
                  </div>

                  <div>
                    <p className="font-semibold text-lg text-foreground/80 leading-snug">
                      {week.title}
                    </p>
                    <p className="text-sm text-foreground/60 mt-1">
                      {week.value}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <p className="text-base text-foreground/70 leading-relaxed">
                    {week.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
