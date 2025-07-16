export const ZODIAC_NAME_MAPPING: Record<string, string> = {
  Mesha: "Aries",
  Vrishabha: "Taurus",
  Mithuna: "Gemini",
  Karka: "Cancer",
  Simha: "Leo",
  Kanya: "Virgo",
  Tula: "Libra",
  Vrishchika: "Scorpio",
  Dhanu: "Sagittarius",
  Makara: "Capricorn",
  Kumbha: "Aquarius",
  Meena: "Pisces",
  Aries: "Aries",
  Taurus: "Taurus",
  Gemini: "Gemini",
  Cancer: "Cancer",
  Leo: "Leo",
  Virgo: "Virgo",
  Libra: "Libra",
  Scorpio: "Scorpio",
  Sagittarius: "Sagittarius",
  Capricorn: "Capricorn",
  Aquarius: "Aquarius",
  Pisces: "Pisces",
};

export const ZODIAC_DATA: Record<
  string,
  {
    english: { name: string; symbol: string; characteristics: string };
    indian: { name: string; symbol: string; characteristics: string };
  }
> = {
  Aries: {
    english: {
      name: "Aries",
      symbol: "♈",
      characteristics: "Bold • Ambitious • Courageous",
    },
    indian: {
      name: "Mesha",
      symbol: "♈",
      characteristics: "Energetic • Pioneering • Assertive",
    },
  },
  Taurus: {
    english: {
      name: "Taurus",
      symbol: "♉",
      characteristics: "Reliable • Practical • Devoted",
    },
    indian: {
      name: "Vrishabha",
      symbol: "♉",
      characteristics: "Stable • Persistent • Sensual",
    },
  },
  Gemini: {
    english: {
      name: "Gemini",
      symbol: "♊",
      characteristics: "Curious • Adaptable • Witty",
    },
    indian: {
      name: "Mithuna",
      symbol: "♊",
      characteristics: "Communicative • Versatile • Intellectual",
    },
  },
  Cancer: {
    english: {
      name: "Cancer",
      symbol: "♋",
      characteristics: "Nurturing • Intuitive • Loyal",
    },
    indian: {
      name: "Karka",
      symbol: "♋",
      characteristics: "Emotional • Protective • Caring",
    },
  },
  Leo: {
    english: {
      name: "Leo",
      symbol: "♌",
      characteristics: "Confident • Charismatic • Leader",
    },
    indian: {
      name: "Simha",
      symbol: "♌",
      characteristics: "Regal • Ambitious • Proud",
    },
  },
  Virgo: {
    english: {
      name: "Virgo",
      symbol: "♍",
      characteristics: "Analytical • Practical • Precise",
    },
    indian: {
      name: "Kanya",
      symbol: "♍",
      characteristics: "Meticulous • Service-oriented • Analytical",
    },
  },
  Libra: {
    english: {
      name: "Libra",
      symbol: "♎",
      characteristics: "Balanced • Charming • Diplomatic",
    },
    indian: {
      name: "Tula",
      symbol: "♎",
      characteristics: "Harmonious • Fair • Sociable",
    },
  },
  Scorpio: {
    english: {
      name: "Scorpio",
      symbol: "♏",
      characteristics: "Passionate • Intense • Resourceful",
    },
    indian: {
      name: "Vrishchika",
      symbol: "♏",
      characteristics: "Determined • Secretive • Transformative",
    },
  },
  Sagittarius: {
    english: {
      name: "Sagittarius",
      symbol: "♐",
      characteristics: "Adventurous • Optimistic • Free",
    },
    indian: {
      name: "Dhanu",
      symbol: "♐",
      characteristics: "Philosophical • Explorative • Optimistic",
    },
  },
  Capricorn: {
    english: {
      name: "Capricorn",
      symbol: "♑",
      characteristics: "Disciplined • Ambitious • Patient",
    },
    indian: {
      name: "Makara",
      symbol: "♑",
      characteristics: "Responsible • Determined • Practical",
    },
  },
  Aquarius: {
    english: {
      name: "Aquarius",
      symbol: "♒",
      characteristics: "Innovative • Independent • Humanitarian",
    },
    indian: {
      name: "Kumbha",
      symbol: "♒",
      characteristics: "Progressive • Altruistic • Visionary",
    },
  },
  Pisces: {
    english: {
      name: "Pisces",
      symbol: "♓",
      characteristics: "Compassionate • Imaginative • Sensitive",
    },
    indian: {
      name: "Meena",
      symbol: "♓",
      characteristics: "Intuitive • Dreamy • Empathetic",
    },
  },
};
