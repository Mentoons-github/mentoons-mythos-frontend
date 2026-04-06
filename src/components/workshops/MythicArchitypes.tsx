import {
  BookOpen,
  Brain,
  Sparkles,
  Music,
  Sword,
  Crown,
  Search,
  Leaf,
  Moon,
} from "lucide-react";

const archetypes = [
  {
    title: "The Storyteller",
    desc: "The keeper of knowledge",
    icon: <BookOpen size={22} />,
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
  {
    title: "The Strategist",
    desc: "The thinker and problem solver",
    icon: <Brain size={22} />,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    title: "The Creator",
    desc: "The visionary and builder",
    icon: <Sparkles size={22} />,
    color: "text-purple-500",
    bg: "bg-purple-100",
  },
  {
    title: "The Musician",
    desc: "The artist of harmony",
    icon: <Music size={22} />,
    color: "text-pink-500",
    bg: "bg-pink-100",
  },
  {
    title: "The Warrior",
    desc: "Courage and action",
    icon: <Sword size={22} />,
    color: "text-red-500",
    bg: "bg-red-100",
  },
  {
    title: "The Leader",
    desc: "Empathy and social wisdom",
    icon: <Crown size={22} />,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    title: "The Seeker",
    desc: "Self-reflection and awareness",
    icon: <Search size={22} />,
    color: "text-indigo-500",
    bg: "bg-indigo-100",
  },
  {
    title: "The Nature Guardian",
    desc: "Connection to the natural world",
    icon: <Leaf size={22} />,
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    title: "The Mystic",
    desc: "Exploration of life’s deeper meaning",
    icon: <Moon size={22} />,
    color: "text-violet-500",
    bg: "bg-violet-100",
  },
];

const MythicArchitypes = () => {
  return (
    <div className=" md:px-6 space-y-8">
      <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl">
        Every myth contains characters that reflect different forms of human
        intelligence.
      </p>

      {/* TITLE */}
      <h4 className="text-xl md:text-2xl font-semibold text-foreground/80">
        Our workshops explore archetypes such as:
      </h4>

      {/* GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {archetypes.map((item, index) => (
          <div
            key={index}
            className="group p-4 md:p-6 rounded-2xl border bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* ICON */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 bg-muted text-foreground/80 group-hover:scale-110 transition`}
            >
              {item.icon}
            </div>

            {/* TITLE */}
            <h5 className="text-xl font-semibold text-foreground/90 mb-1">
              {item.title}
            </h5>

            {/* DESC */}
            <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* OUTRO */}
      <p className="text-muted-foreground text-lg leading-relaxed ">
        By identifying these archetypes within myths, participants begin to
        recognize them{" "}
        <span className="font-semibold text-foreground/80">within themselves</span>.
      </p>
    </div>
  );
};

export default MythicArchitypes;
