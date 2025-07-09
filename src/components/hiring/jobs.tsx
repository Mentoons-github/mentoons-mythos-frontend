import { useState } from "react";
import { Users, Star, Brain, Sparkles } from "lucide-react";
import JobSection from "./jobSection";

// Mock constants - replace with your actual imports
const PSYCHOLOGISTS_REQUIREMENTS = {
  Education: "Master's or PhD in Psychology from accredited institution",
  Experience: "Minimum 3 years clinical practice experience",
  License: "Valid state psychology license required",
  Skills: "Strong communication and analytical abilities",
};

const PSYCHOLOGIST_INTERN_REQUIREMENTS = {
  Education: "Currently pursuing Master's in Psychology",
  GPA: "Minimum 3.5 GPA required",
  Availability: "20+ hours per week commitment",
  Skills: "Excellent interpersonal and research skills",
};

const ASTROLOGER_REQUIREMENTS = {
  Experience: "5+ years professional astrology practice",
  Certification: "Certified by recognized astrology organization",
  Knowledge: "Deep understanding of natal charts and planetary movements",
  Communication: "Excellent client consultation skills",
};

const ASTROLOGER_INTERN_REQUIREMENT = {
  Education: "Studying astrology or related metaphysical studies",
  Interest: "Strong passion for astrological sciences",
  Availability: "15+ hours per week commitment",
  Skills: "Good research and documentation abilities",
};
const Jobs = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (sectionName: string) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const jobSections = [
    {
      title: "Psychologists",
      requirements: PSYCHOLOGISTS_REQUIREMENTS,
      icon: Brain,
      gradient: "bg-gradient-to-br from-blue-600 to-purple-600",
    },
    {
      title: "Psychologist Interns",
      requirements: PSYCHOLOGIST_INTERN_REQUIREMENTS,
      icon: Users,
      gradient: "bg-gradient-to-br from-green-600 to-blue-600",
    },
    {
      title: "Astrologers",
      requirements: ASTROLOGER_REQUIREMENTS,
      icon: Star,
      gradient: "bg-gradient-to-br from-purple-600 to-pink-600",
    },
    {
      title: "Astrologer Interns",
      requirements: ASTROLOGER_INTERN_REQUIREMENT,
      icon: Sparkles,
      gradient: "bg-gradient-to-br from-orange-600 to-red-600",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 relative z-10">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              WHO WE'RE LOOKING FOR
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our team of dedicated professionals making a difference in
              people's lives
            </p>
          </div>
        </div>
      </div>

      {/* Decorative background circles with connections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large circles - scattered */}
        <div className="absolute top-24 left-12 w-64 h-64 bg-gray-400 rounded-full opacity-35"></div>
        <div className="absolute top-80 right-16 w-48 h-48 bg-gray-500 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-1/3 w-56 h-56 bg-gray-300 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-52 h-52 bg-gray-400 rounded-full opacity-25"></div>

        {/* Medium circles - some connected, some scattered */}
        <div className="absolute top-32 left-16 w-32 h-32 bg-gray-500 rounded-full opacity-45"></div>
        <div className="absolute top-52 left-32 w-36 h-36 bg-gray-400 rounded-full opacity-40"></div>
        <div className="absolute top-72 left-44 w-34 h-34 bg-gray-300 rounded-full opacity-50"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gray-500 rounded-full opacity-45"></div>
        <div className="absolute top-60 right-1/4 w-40 h-40 bg-gray-400 rounded-full opacity-35"></div>
        <div className="absolute top-80 right-32 w-28 h-28 bg-gray-300 rounded-full opacity-55"></div>
        <div className="absolute bottom-32 right-12 w-38 h-38 bg-gray-500 rounded-full opacity-40"></div>
        <div className="absolute top-1/4 left-1/3 w-30 h-30 bg-gray-400 rounded-full opacity-45"></div>
        <div className="absolute bottom-1/4 right-1/2 w-32 h-32 bg-gray-300 rounded-full opacity-50"></div>

        {/* Small circles - forming connections */}
        <div className="absolute top-80 left-1/3 w-20 h-20 bg-gray-600 rounded-full opacity-60"></div>
        <div className="absolute bottom-28 left-1/2 w-24 h-24 bg-gray-500 rounded-full opacity-55"></div>
        <div className="absolute bottom-48 left-1/4 w-22 h-22 bg-gray-400 rounded-full opacity-65"></div>
        <div className="absolute top-1/2 right-48 w-18 h-18 bg-gray-600 rounded-full opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/3 w-26 h-26 bg-gray-500 rounded-full opacity-60"></div>
        <div className="absolute top-96 left-8 w-20 h-20 bg-gray-400 rounded-full opacity-65"></div>
        <div className="absolute bottom-80 left-20 w-16 h-16 bg-gray-600 rounded-full opacity-75"></div>
        <div className="absolute top-1/3 right-2/3 w-18 h-18 bg-gray-500 rounded-full opacity-70"></div>
        <div className="absolute bottom-60 left-1/6 w-22 h-22 bg-gray-400 rounded-full opacity-65"></div>

        {/* Extra small accent circles - scattered randomly */}
        <div className="absolute top-16 left-1/2 w-12 h-12 bg-gray-600 rounded-full opacity-80"></div>
        <div className="absolute top-36 left-2/3 w-10 h-10 bg-gray-500 rounded-full opacity-85"></div>
        <div className="absolute bottom-12 left-60 w-14 h-14 bg-gray-400 rounded-full opacity-70"></div>
        <div className="absolute top-2/3 right-40 w-8 h-8 bg-gray-600 rounded-full opacity-90"></div>
        <div className="absolute top-44 left-6 w-10 h-10 bg-gray-500 rounded-full opacity-75"></div>
        <div className="absolute bottom-96 left-1/4 w-12 h-12 bg-gray-400 rounded-full opacity-70"></div>
        <div className="absolute top-1/4 left-3 w-8 h-8 bg-gray-600 rounded-full opacity-85"></div>
        <div className="absolute bottom-2/3 right-8 w-10 h-10 bg-gray-500 rounded-full opacity-80"></div>
        <div className="absolute top-3/4 right-56 w-6 h-6 bg-gray-600 rounded-full opacity-90"></div>
        <div className="absolute bottom-24 right-2/3 w-8 h-8 bg-gray-400 rounded-full opacity-80"></div>
        <div className="absolute top-1/3 left-1/2 w-14 h-14 bg-gray-500 rounded-full opacity-65"></div>
        <div className="absolute bottom-1/4 left-16 w-6 h-6 bg-gray-600 rounded-full opacity-85"></div>
        <div className="absolute top-1/6 right-1/3 w-10 h-10 bg-gray-400 rounded-full opacity-75"></div>
        <div className="absolute bottom-1/6 right-1/4 w-8 h-8 bg-gray-500 rounded-full opacity-80"></div>
        <div className="absolute top-5/6 left-1/3 w-6 h-6 bg-gray-600 rounded-full opacity-85"></div>
      </div>

      {/* Job sections */}
      <div className="relative max-w-4xl mx-auto px-8 py-16 z-10">
        {jobSections.map((section, index) => (
          <JobSection
            index={index}
            key={section.title}
            title={section.title}
            requirements={section.requirements}
            isOpen={openSection === section.title}
            onToggle={() => handleToggle(section.title)}
            icon={section.icon}
            gradient={section.gradient}
          />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
