import { Music, BookOpen, Leaf, Heart } from "lucide-react";

const values = [
  {
    name: "Satyam",
    meaning: "Truth",
    idea: "Song about honesty",
  },
  {
    name: "Ahimsa",
    meaning: "Non-violence",
    idea: "Peaceful bhajan",
  },
  {
    name: "Seva",
    meaning: "Helping others",
    idea: "Group song",
  },
  {
    name: "Guru Bhakti",
    meaning: "Respect for teachers",
    idea: "Guru Vandana",
  },
  {
    name: "Nature Respect",
    meaning: "Love for nature",
    idea: "Folk nature songs",
  },
];

const JoyfulGurukalCard = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-stone-200 p-6 md:p-10">
      {/* TITLE */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-800">
          🎶 Music & Values Workshop
        </h2>
        <p className="text-stone-500 mt-2 md:text-lg max-w-2xl">
          Introduce children (ages 5–14) to Indian culture, ethics, and
          spirituality through music, rhythm, and storytelling.
        </p>
      </div>

      {/* CORE ELEMENTS */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-stone-400 mb-3 font-semibold">
          Core Elements
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg">
            <Music size={16} className="text-amber-600" />
            <span className="text-sm text-stone-700">Indian Music</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg">
            <BookOpen size={16} className="text-amber-600" />
            <span className="text-sm text-stone-700">
              Epic Stories (Ramayana, Mahabharata)
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg">
            <Heart size={16} className="text-amber-600" />
            <span className="text-sm text-stone-700">Values & Ethics</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg">
            <Leaf size={16} className="text-amber-600" />
            <span className="text-sm text-stone-700">
              Nature & Spirituality
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg">
            <Music size={16} className="text-amber-600" />
            <span className="text-sm text-stone-700">
              Interactive Activities
            </span>
          </div>
        </div>
      </div>

      {/* VALUES TABLE */}
      <div>


        <div className="overflow-x-auto">
          <div>
            <p className="text-sm uppercase tracking-widest text-stone-400 mb-4 font-semibold">
              Learn Values Through Music 
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-amber-50 to-white border rounded-xl p-4 hover:shadow-md transition group"
                >
                  <h4 className="text-lg font-bold text-amber-700 group-hover:scale-105 transition">
                    {v.name}
                  </h4>

                  {/* MEANING */}
                  <p className="text-sm text-stone-500 mt-1">{v.meaning}</p>

                  <div className="mt-3 text-xs text-stone-600 bg-white border rounded-lg px-3 py-2">
                    🎵 {v.idea}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoyfulGurukalCard;
