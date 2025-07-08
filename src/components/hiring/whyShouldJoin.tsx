import { FaUsers, FaBookOpen, FaArrowUp, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface BenefitCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}

const BenefitCard = ({ Icon, title, description, index }: BenefitCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-black transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
  >
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10">
      {/* Icon container */}
      <div className="relative mb-8">
        <div className="bg-black p-5 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <Icon className="text-white text-3xl" />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-3 -right-3 w-6 h-6 border-2 border-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-180" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
      </div>

      {/* Content */}
      <div className="space-y-5">
        <h3 className="text-2xl font-black text-gray-900 group-hover:text-black transition-colors duration-300 leading-tight">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-base font-medium">
          {description}
        </p>

        {/* Animated underline */}
        <div className="w-0 h-0.5 bg-black group-hover:w-16 transition-all duration-500" />

        {/* Call to action */}
        <div className="flex items-center text-black font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <span className="tracking-wide">EXPLORE MORE</span>
          <FaChevronRight className="ml-3 text-xs group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  </motion.div>
);

const WhyShouldJoin = () => {
  const benefits = [
    {
      icon: FaUsers,
      title: "Team Work",
      description:
        "Collaborate with talented professionals who share your passion for excellence. Work in a supportive environment where diverse perspectives come together to solve complex challenges and achieve remarkable results through collective effort.",
    },
    {
      icon: FaBookOpen,
      title: "Learning Opportunity",
      description:
        "Access comprehensive training programs, workshops, and educational resources designed to expand your knowledge. Benefit from mentorship opportunities and stay current with industry trends and best practices.",
    },
    {
      icon: FaArrowUp,
      title: "Upgrade Skills",
      description:
        "Enhance your professional capabilities through hands-on experience with cutting-edge technologies and methodologies. Participate in skill development initiatives that keep you competitive in today's evolving marketplace.",
    },
  ];

  return (
    <section className="relative bg-white py-15 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Geometric background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-30" />
      <div className="absolute top-40 right-20 w-24 h-24 border border-gray-300 rotate-45 opacity-20" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gray-100 rounded-full opacity-40" />
      <div className="absolute bottom-20 right-1/3 w-20 h-0.5 bg-gray-200 rotate-45" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-8 leading-none tracking-tight">
            WHY YOU SHOULD
            <br />
            <span className="relative">
              JOIN OUR TEAM
              <div className="absolute bottom-2 left-0 w-full h-4 bg-gray-200 -z-10" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Step into a world where excellence meets opportunity, and your
            ambitions transform into extraordinary achievements.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center mt-12">
            <div className="w-16 h-0.5 bg-black" />
            <div className="w-3 h-3 bg-black rounded-full mx-4" />
            <div className="w-16 h-0.5 bg-black" />
          </div>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              Icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>

        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        ></motion.div>
      </div>
    </section>
  );
};

export default WhyShouldJoin;
