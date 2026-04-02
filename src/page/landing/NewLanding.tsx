import { useRef } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const NewLanding = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen relative grid grid-cols-1 lg:grid-cols-3 px-6 md:px-12 lg:px-24 py-10 lg:py-20 ">

        {/* Logo - centered at top */}
        <div className="absolute flex justify-center top-4 md:top-6 inset-x-0">
          <img
            src="/assets/logo/Mentoons Mythos logo.png"
            alt="company logo"
            className="w-48 md:w-64 lg:w-80 h-auto object-contain"
          />
        </div>

        {/* LEFT CONTENT */}
        <div className="col-span-2 flex flex-col justify-center max-w-3xl pt-16 pr-12">
          {/* Tagline */}
          <p className="uppercase text-sm tracking-widest text-gray-500 font-semibold mb-3">
            Learn • Reflect • Grow
          </p>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 mb-5">
            Discover Yourself Through{" "}
            <span className="text-[#1fad95]">Ancient Myths</span>
          </h1>

          {/* Intro */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            For thousands of years, myths have helped humans understand life,
            identity, relationships, and purpose.
          </p>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#5b5d5c] mb-8" />

          {/* Section block */}
          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Introducing The Joyful Gurukul
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              Mentoons Mythos Workshops bring these ancient stories to life
              through interactive experiences that help people explore human
              intelligence, emotions, and personal growth.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Through storytelling, discussion, and creative activities,
              participants uncover deeper meanings behind myths from cultures
              across the world.
            </p>
          </div>

          {/* Highlight quote */}
          <p className="text-base font-semibold text-gray-800 italic border-l-4 border-[#5b5d5c] pl-4">
            Myths are not just stories — they are mirrors of the human mind.
          </p>
          {/* CTA */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => navigate("/workshops")}
              className="bg-[#5b5d5c] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              Join Mythos Workshop →
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-1">
          <div ref={videoRef} className="w-full mt-8 lg:mt-0">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
              <ReactPlayer
                url="assets/about.mp4"
                className="absolute inset-0"
                width="100%"
                height="100%"
                controls
                playing={true}
                muted={true}
                loop={false}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                      disablePictureInPicture: true,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="mt-6 relative">
            {/* FREE Badge */}
            <div className="absolute flex items-center justify-center -top-3 -right-3 h-18 w-18 bg-[#1fad95] text-white rounded-full shadow-lg z-10 px-4 py-1.5">
              <p className="text-xl font-extrabold">FREE</p>
            </div>

            {/* Card */}
            <div className="bg-[#111111] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border border-gray-800">
              <div className="flex flex-col divide-y divide-gray-800">
                <div className="py-4 first:pt-0 rounded-lg transition px-2">
                  <h2 className="text-lg font-semibold text-gray-100">
                    Discover your intelligence type
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Take a quick assessment to understand your strengths.
                  </p>
                  <button className="mt-3 bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    Take a Test
                  </button>
                </div>

                <div className="py-4 rounded-lg transition px-2">
                  <h2 className="text-lg font-semibold text-gray-100">
                    Know your birth sign
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Explore personality insights based on your zodiac.
                  </p>
                  <button className="mt-3 bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    Find My Rashi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLanding;
