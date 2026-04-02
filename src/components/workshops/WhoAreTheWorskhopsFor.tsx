import { FaUserGraduate, FaChalkboardTeacher, FaUserFriends, FaPaintBrush, FaBriefcase } from "react-icons/fa";

const audience = [
  {
    title: "Students",
    text: "Understand mythology as a tool for creative thinking and emotional intelligence.",
    icon: <FaUserGraduate />,
  },
  {
    title: "Educators",
    text: "Bring mythology into classrooms as an engaging learning framework.",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Parents",
    text: "Use stories to teach children about values, identity, and empathy.",
    icon: <FaUserFriends />,
  },
  {
    title: "Creators",
    text: "Explore timeless narrative structures for storytelling and creativity.",
    icon: <FaPaintBrush />,
  },
  {
    title: "Professionals",
    text: "Gain deeper understanding of human behavior and collaboration.",
    icon: <FaBriefcase />,
  },
];

const WhoAreTheWorskhopsFor = () => {
  return (
    <section className="py-20 px-6 ">
      
      <div className="max-w-2xl mb-12">
        {/* <p className="uppercase text-xs tracking-wide text-gray-400 font-medium mb-2">
          Who Is It For
        </p> */}

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Who Are These Workshops For?
        </h2>

        <p className="text-gray-500 text-lg leading-relaxed">
          Designed for individuals across different walks of life who want to
          explore mythology as a tool for growth, learning, and self-discovery.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {audience.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-gray-700 mb-4">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>

            <p className="text-lg text-gray-500 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default WhoAreTheWorskhopsFor;
