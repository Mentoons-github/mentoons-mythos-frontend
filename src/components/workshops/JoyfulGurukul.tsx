import {
  Calendar,
  Clock,
  Timer,
  BookOpen,
  Music,
  Palette,
  Smile,
  Leaf,
} from "lucide-react";

const featureIcons = {
  "Storytelling & Imagination": <BookOpen size={18} />,
  "Music & Rhythm": <Music size={18} />,
  "Art & Crafts": <Palette size={18} />,
  "Laughter & Games": <Smile size={18} />,
  "Values & Life Skills": <Leaf size={18} />,
};

const weeks = [
  {
    number: "01",
    title: "Discover & Imagine",
    value: "Curiosity",
    desc: "Spark wonder through stories and open-ended exploration of ideas.",
  },
  {
    number: "02",
    title: "Kind Hearts",
    value: "Kindness & Empathy",
    desc: "Build emotional awareness through role play and group activities.",
  },
  {
    number: "03",
    title: "Courage & Confidence",
    value: "Self-belief",
    desc: "Express, perform, and grow through safe creative challenges.",
  },
  {
    number: "04",
    title: "Creativity & Celebration",
    value: "Expression",
    desc: "Showcase learning through art, music, and a joyful culmination.",
  },
];

const features = Object.keys(featureIcons) as (keyof typeof featureIcons)[];

const ageGroups = [
  { range: "6–12", label: "Children" },
  { range: "13–19", label: "Teens" },
  { range: "20+", label: "Adults" },
];

const meta = [
  { icon: <Calendar size={14} />, label: "Duration", value: "4 Weeks" },
  { icon: <Clock size={14} />, label: "Frequency", value: "2/week" },
  { icon: <Timer size={14} />, label: "Session", value: "60 min" },
];

export default function JoyfulGurukul() {
  return (
    <div className="min-h-screen  py-12 px-4">
      <div className=" mx-auto">
        <div className="mb-10 flex  md:items-center justify-between">
          <div>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-stone-800 leading-tight">
              🌼 The Joyful{" "}
              <span className=" italic text-stone-500">Gurukul</span>
            </h1>

            <p className="mt-4 text-stone-700 max-w-xl leading-relaxed font-medium md:text-[19px]">
              A 1-month interactive journey combining storytelling, music, art,
              creativity, and Indian values — bringing the ancient Gurukul to
              life in a joyful modern way.
            </p>
          </div>
          <div className="pr-10 mt-5 md:0">
            <img src="assets/logo/The Joyful gurukul.png" alt="" className="w-44 lg:w-96 "/>
          </div>
        </div>

        {/* ── META + AGE ── */}
        <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-6 border-y border-stone-200 py-6 mb-12">
          {/* META */}
          <div className="flex flex-wrap gap-6">
            {meta.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-base">
                <span className="text-stone-400">{m.icon}</span>
                <span className="text-stone-400 text-sm uppercase">
                  {m.label}
                </span>
                <span className="font-semibold text-stone-700">{m.value}</span>
              </div>
            ))}
          </div>

          {/* AGE GROUPS */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-stone-400 text-sm">AGE GROUPS:</p>
            {ageGroups.map((ag, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg border bg-white text-center shadow-sm"
              >
                <p className="text-sm font-bold text-stone-700">{ag.range}</p>
                <p className="text-[12px] text-stone-400">{ag.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── VISION + FEATURES ── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* VISION */}
          <div>
            <h3 className="text-base font-semibold text-stone-400 uppercase tracking-widest mb-3">
              🌟 Vision
            </h3>
            <p className="text-stone-600 text-[18px] font-medium leading-7 border-l-2 border-amber-500 pl-4">
              Recreates the ancient Gurukul system in a fun modern way where
              kids learn through stories, music, and creativity — nurturing
              curiosity, compassion, and confidence.
            </p>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-base font-semibold text-stone-400 uppercase tracking-widest mb-3">
              What You'll Experience
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-white hover:shadow-sm transition"
                >
                  <span className="text-amber-600">{featureIcons[f]}</span>
                  <span className="text-base text-stone-700 font-medium">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CURRICULUM ── */}
        <div>
          <h3 className="text-base font-semibold text-stone-400 uppercase tracking-widest mb-6">
            Curriculum
          </h3>

          <div className="flex flex-col lg:flex-row gap-5 overflow-x-auto lg:overflow-visible pb-2">
            {weeks.map((week, i) => (
              <div
                key={i}
                className="min-w-[260px] md:min-w-0 flex-1 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4 px-5 py-5 border-b">
                  {/* NUMBER */}
                  <div className="text-xs flex flex-col items-center justify-center">
                    <p className="-mb-2 text-stone-500">Week</p>
                    <span className="text-2xl font-bold text-stone-400">
                      {week.number}
                    </span>
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="font-semibold text-lg text-stone-800 leading-snug">
                      {week.title}
                    </p>
                    <p className="text-sm text-stone-400 mt-1">{week.value}</p>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="px-5 py-4">
                  <p className="text-base text-stone-500 leading-relaxed">
                    {week.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
