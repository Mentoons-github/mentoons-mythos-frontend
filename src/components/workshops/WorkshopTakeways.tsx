import { FaCheck } from "react-icons/fa";

const takeaways = [
  "A deeper understanding of ancient myths and cultures",
  "Insight into human intelligence and personality",
  "Tools for self-reflection and creativity",
  "Appreciation of storytelling as a source of wisdom",
  "Inspiration for personal growth",
];

const WorkshopTakeaways = () => {
  return (
    <section className="py-20 px-6 ">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Participants Take Away
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            After attending a Mythos workshop, participants walk away with
            meaningful insights that help them understand themselves and the
            world more deeply.
          </p>

          {/* List */}
          <ul className="space-y-4">
            {takeaways.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-xs flex-shrink-0">
                  <FaCheck />
                </div>

                <p className="text-base text-gray-700 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE (Optional Image / Visual) */}
        <div className="rounded-xl overflow-hidden ">
          <img
            src="/assets/logo/takeaway.png"
            alt="Workshop Takeaways"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WorkshopTakeaways;
