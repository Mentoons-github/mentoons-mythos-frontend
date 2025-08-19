import {
  Star,
  Sun,
  Moon,
  Gem,
  Compass,
  Eye,
  Heart,
  Shield,
} from "lucide-react";

const AstrologyReport = () => {
  const astrologyData = {
    nakshatra: {
      id: 20,
      name: "Uttara Ashadha",
      lord: { id: 0, name: "Sun", vedic_name: "Ravi" },
      pada: 1,
    },
    chandra_rasi: {
      id: 8,
      name: "Dhanu",
      lord: { id: 5, name: "Jupiter", vedic_name: "Guru" },
    },
    soorya_rasi: {
      id: 6,
      name: "Tula",
      lord: { id: 3, name: "Venus", vedic_name: "Shukra" },
    },
    zodiac: { id: 7, name: "Scorpio" },
    additional_info: {
      deity: "Vishwedeva",
      ganam: "Manushya",
      symbol: "Planks Of A Bed, Elephant's tusk",
      animal_sign: "Mongoose",
      nadi: "Kapha",
      color: "Copper",
      best_direction: "South",
      syllables: "Bhe, Bho, Ja, Ji",
      birth_stone: "Ruby",
      gender: "Male",
      planet: "Ravi",
      enemy_yoni: "Snake",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-400 p-8 text-white relative overflow-hidden">
          {/* Logo Space */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMjAgNEwyMS41IDE4SDIwSDE4LjVMMjAgNFoiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjMiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMCAyMEwyOC41IDM0SDMwSDMxLjVMMzAgMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTAgMjBMMTEuNSA2SDEwSDguNUwxMCAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
              alt="Astrology Logo"
              className="w-10 h-10"
            />
          </div>

          <div className="text-center pt-4">
            <h1 className="text-4xl font-bold mb-2 font-serif">
              Vedic Astrology Report
            </h1>
            <p className="text-xl opacity-90">Complete Astrological Analysis</p>
            <div className="mt-4 flex justify-center">
              <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-sm">
                  Generated on{" "}
                  {new Date().toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Decorative stars */}
          <Star className="absolute top-6 right-6 w-6 h-6 opacity-30" />
          <Star className="absolute bottom-6 left-20 w-4 h-4 opacity-40" />
          <Star className="absolute top-12 right-24 w-3 h-3 opacity-50" />
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Core Signs Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Moon Sign (Chandra Rasi) */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-orange-400">
              <div className="flex items-center mb-4">
                <Moon className="w-8 h-8 text-orange-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Chandra Rasi (Moon Sign)
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Sign:</span>
                  <span className="text-xl font-bold text-orange-600">
                    {astrologyData.chandra_rasi.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Lord:</span>
                  <span className="text-lg text-gray-800">
                    {astrologyData.chandra_rasi.lord.name} (
                    {astrologyData.chandra_rasi.lord.vedic_name})
                  </span>
                </div>
              </div>
            </div>

            {/* Sun Sign (Soorya Rasi) */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <div className="flex items-center mb-4">
                <Sun className="w-8 h-8 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Soorya Rasi (Sun Sign)
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Sign:</span>
                  <span className="text-xl font-bold text-yellow-600">
                    {astrologyData.soorya_rasi.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Lord:</span>
                  <span className="text-lg text-gray-800">
                    {astrologyData.soorya_rasi.lord.name} (
                    {astrologyData.soorya_rasi.lord.vedic_name})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nakshatra Section */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-8 rounded-xl mb-8 border border-orange-200">
            <div className="flex items-center mb-6">
              <Star className="w-10 h-10 text-orange-600 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Nakshatra</h2>
                <p className="text-gray-600">Your Birth Star</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-orange-600 mb-2">
                  {astrologyData.nakshatra.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Pada:</span>
                    <span className="text-gray-800">
                      {astrologyData.nakshatra.pada}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Lord:</span>
                    <span className="text-gray-800">
                      {astrologyData.nakshatra.lord.name} (
                      {astrologyData.nakshatra.lord.vedic_name})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Deity:</span>
                    <span className="text-gray-800">
                      {astrologyData.additional_info.deity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">
                  Symbol & Meaning
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Symbol:</strong>{" "}
                  {astrologyData.additional_info.symbol}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Animal Sign:</strong>{" "}
                  {astrologyData.additional_info.animal_sign}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Attributes Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg border border-yellow-200">
              <div className="flex items-center mb-3">
                <Gem className="w-6 h-6 text-amber-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Birth Stone</h3>
              </div>
              <p className="text-2xl font-bold text-amber-600">
                {astrologyData.additional_info.birth_stone}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Eye className="w-6 h-6 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Lucky Color</h3>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {astrologyData.additional_info.color}
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg border border-amber-200">
              <div className="flex items-center mb-3">
                <Compass className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">
                  Best Direction
                </h3>
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                {astrologyData.additional_info.best_direction}
              </p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Astrological Details */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-orange-600 mr-2" />
                Astrological Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span className="font-semibold text-gray-700">Ganam:</span>
                  <span className="text-gray-800">
                    {astrologyData.additional_info.ganam}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span className="font-semibold text-gray-700">Nadi:</span>
                  <span className="text-gray-800">
                    {astrologyData.additional_info.nadi}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span className="font-semibold text-gray-700">Gender:</span>
                  <span className="text-gray-800">
                    {astrologyData.additional_info.gender}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span className="font-semibold text-gray-700">
                    Ruling Planet:
                  </span>
                  <span className="text-gray-800">
                    {astrologyData.additional_info.planet}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-gray-700">
                    Enemy Yoni:
                  </span>
                  <span className="text-gray-800">
                    {astrologyData.additional_info.enemy_yoni}
                  </span>
                </div>
              </div>
            </div>

            {/* Compatibility & Mantras */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Heart className="w-6 h-6 text-yellow-600 mr-2" />
                Compatibility & Sounds
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Lucky Syllables:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {astrologyData.additional_info.syllables
                      .split(", ")
                      .map((syllable, index) => (
                        <span
                          key={index}
                          className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {syllable}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Western Zodiac:
                  </h4>
                  <span className="text-lg font-bold text-amber-600">
                    {astrologyData.zodiac.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg border border-orange-200">
            <p className="text-center text-gray-700 text-sm leading-relaxed">
              This Vedic astrology report is based on ancient Indian
              astrological principles. The positions of celestial bodies at the
              time of birth influence personality traits, life patterns, and
              spiritual journey. Use this guidance for self-reflection and
              personal growth while maintaining free will in your life choices.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:max-w-none {
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AstrologyReport;
