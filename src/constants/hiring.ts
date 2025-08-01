import { Hiring } from "../types/hiringTypes";

const PSYCHOLOGISTS_REQUIREMENTS = {
  Qualification:
    "Bachelor’s degree or higher in Psychology (Clinical, Counseling, or Applied)",
  Experience: "1+ years of counseling, therapy, or assessment experience",
  Approach: "Empathetic, ethical, evidence-based",
  Bonus: "Experience in workshops, youth guidance, or holistic practices",
};

const PSYCHOLOGIST_INTERN_REQUIREMENTS = {
  Qualification:
    "Bachelor’s degree or higher in Psychology (Clinical, Counseling, or Applied)",
  Experience: "0-1 years of counseling, therapy, or assessment experience",
  Approach: "Empathetic, ethical, evidence-based",
  Bonus: "Experience in workshops, youth guidance, or holistic practices",
};

const ASTROLOGER_REQUIREMENTS = {
  Qualification:
    "Formal training in Vedic Astrology / KP Astrology / Western Astrology",
  Experience: " Minimum 2 years in consulting or teaching astrology",
  Approach: "Intuitive, responsible, and client-centered",
  Bonus:
    "Comfort in integrating astrology with personal growth, career guidance, or psychological insights",
};

const ASTROLOGER_INTERN_REQUIREMENT = {
  Qualification:
    "Formal training in Vedic Astrology / KP Astrology / Western Astrology",
  Experience: "Few months in consulting or teaching astrology",
  Approach: "Intuitive, responsible, and client-centered",
  Bonus:
    "Comfort in integrating astrology with personal growth, career guidance, or psychological insights",
};

export const HIRING: Hiring[] = [
  {
    _id: "67e2819c3850a2a118e77ad9",
    job: "Astrologers",
    description:
      "Are you a passionate Astrologer ready to guide others toward self-discovery? We’re looking for talented professionals to be a part of Mentoons Mythos!",
    image: "/assets/hiring/Astrologer.png",
    bg: "#9FE9FF",
  },
  {
    _id: "6808d7fb9488a1497d6e535d",
    job: "Psychologists",
    description:
      "Are you a passionate Psychologist ready to guide others toward self-discovery? We’re looking for talented professionals to be a part of Mentoons Mythos!",
    image: "/assets/hiring/Psychology.png",
    bg: "#4285F4",
  },
];

export {
  ASTROLOGER_INTERN_REQUIREMENT,
  ASTROLOGER_REQUIREMENTS,
  PSYCHOLOGISTS_REQUIREMENTS,
  PSYCHOLOGIST_INTERN_REQUIREMENTS,
};
