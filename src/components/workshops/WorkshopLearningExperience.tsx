import { FaBookOpen, FaBrain, FaPuzzlePiece } from "react-icons/fa";

const LandingIssues = [
  {
    title: "Story Exploration",
    text: "Participants journey through myths from cultures such as:",
    points: [
      "India",
      "Greece",
      "Norse traditions",
      "Egypt",
      "Indigenous cultures",
    ],
    subText: "Each myth reveals powerful lessons about human nature.",
    icon: <FaBookOpen />,
  },
  {
    title: "Myth & Mind",
    text: "Participants discover how mythological characters represent:",
    text2:
      "We connect myths to modern psychology and the 9 human intelligences.",
    points: ["Wisdom", "Creativity", "Courage", "Empathy", "Self-awareness"],
    icon: <FaBrain />,
  },
  {
    title: "Interactive Activities",
    text: "Workshops include engaging activities such as:",
    points: [
      "Myth storytelling sessions",
      "Character archetype analysis",
      "Group discussions",
      "Creative drawing and writing",
      "Role-playing mythic characters",
    ],
    icon: <FaPuzzlePiece />,
  },
];

const WorkshopLearningExperience = () => {
  return (
    <section className="py-20  bg-white">
      <div className="grid lg:grid-cols-5 gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              The Mythos Learning Experience
            </h2>

            <p className="text-base text-gray-500 leading-relaxed">
              Our workshops combine{" "}
              <span className="font-medium text-gray-700">
                storytelling, reflection, and creativity
              </span>{" "}
              to create meaningful learning experiences.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {LandingIssues.map((issue, ind) => (
              <div
                key={ind}
                className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm transition"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 flex-shrink-0 mt-1">
                    {issue.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {issue.title}
                    </h3>

                    {issue.text2 && (
                      <p className="text-base text-gray-700 leading-relaxed">
                        {issue.subText || issue.text2}
                      </p>
                    )}

                    <p className="text-base text-gray-700 leading-relaxed">
                      {issue.text}
                    </p>

                    {/* Points */}
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {issue.points.map((point, i) => (
                        <li
                          key={i}
                          className="text-base text-gray-600 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {issue.subText && (
                      <p className="text-sm text-gray-600 italic border-l pl-3">
                        {issue.subText || issue.text2}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          {/* Image */}
          <div className="rounded-xl overflow-hidden">
            <img
              src="/assets/logo/interactiveActivities.png"
              alt="Workshop Experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopLearningExperience;
