import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import AlreadyCheckModal from "../../components/modal/astro/rashiFindermodal.tsx/AlreadyCheckModal";
import MythosLoginModal from "../../components/modals/mythosLogin";
import RashiFinderModal from "../../components/modal/astro/rashiFindermodal.tsx";
import AssignmentAlreadyTakenHome from "../../components/modal/assessment/AssignmentAlreadyTakenHome.tsx";

const NewLanding = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkedModal, setCheckedModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [alreadyTakeModal, setAlreadyTakeModal] = useState(false);

  const handlePathClick = (from: string) => {
    if (!user) {
      setLoginModal(true);
    } else if (from == "astrology") {
      if (user.astrologyDetail?.moonSign || user.astrologyDetail?.sunSign) {
        setCheckedModal(true);
        console.log(user.astrologyDetail, "laksdjfad");
      } else {
        setModalOpen(true);
      }
    } else {
      if (user?.takeInitialAssessment) {
        setAlreadyTakeModal(true);
      } else {
        navigate("/initialassessment");
      }
    }
  };
  return (
    <div>
      <div className="min-h-screen relative grid grid-cols-1 lg:grid-cols-3 px-6 md:px-12 lg:px-24 py-10 lg:py-20 ">
        {/* Logo - centered at top */}
        <div className="absolute flex flex-col items-center top-4 md:top-6 inset-x-0">
          <div>
            {/* {user?.intelligenceTypes.map((ele,ind)=>(
              <div>
                {}
              </div>
            ))} */}
          </div>
          <img
            src="/assets/logo/Mentoons Mythos logo.png"
            alt="company logo"
            className="w-48 md:w-64 lg:w-80 h-auto object-contain"
          />
          <p className="uppercase text-sm tracking-widest text-muted-foreground font-semibold ">
            Learn • Reflect • Grow
          </p>
        </div>

        {/* LEFT CONTENT */}
        <div className="col-span-2 flex flex-col justify-center max-w-3xl pt-24 md:pr-12">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl  lg:text-6xl font-bold leading-tight text-foreground/80 mb-5">
            Discover Yourself Through{" "}
            <span className="text-[#1fad95]">Ancient Myths</span>
          </h1>

          {/* Intro */}
          <p className="text-lg text-foreground/70 leading-relaxed mb-8">
            For thousands of years, myths have helped humans understand life,
            identity, relationships, and purpose.
          </p>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-foreground/80 mb-8" />

          {/* Section block */}
          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-semibold text-foreground/80">
              Introducing The Joyful Gurukul
            </h3>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Mentoons Mythos Workshops bring these ancient stories to life
              through interactive experiences that help people explore human
              intelligence, emotions, and personal growth.
            </p>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Through storytelling, discussion, and creative activities,
              participants uncover deeper meanings behind myths from cultures
              across the world.
            </p>
          </div>

          {/* Highlight quote */}
          <p className="text-base font-semibold text-foreground italic border-l-4 border-foreground/80 pl-4">
            Myths are not just stories — they are mirrors of the human mind.
          </p>
          {/* CTA */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => navigate("/workshops")}
              className="bg-foreground/90 text-background px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              Join Workshop →
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
            <div className=" shadow-lg hover:shadow-2xl transition  ">
              <div className="flex flex-col divide-y divide-gray-800 ">
                <div className="py-7  transition px-4 bg-background rounded-t-2xl border-t border-x">
                  <h2 className="text-lg font-semibold text-foreground/80">
                    Discover your intelligence type
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Take a quick assessment to understand your strengths.
                  </p>
                  <button
                    onClick={() => handlePathClick("psychology")}
                    className="mt-3 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:bg-foreground/80 transition"
                  >
                    Take a Test
                  </button>
                </div>

                <div className="py-7  transition px-4 bg-foreground rounded-b-2xl border-b">
                  <h2 className="text-lg font-semibold text-background/80">
                    Know your birth sign
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    Explore personality insights based on your zodiac.
                  </p>
                  <button
                    onClick={() => handlePathClick("astrology")}
                    className="mt-3 bg-background text-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-background/80 transition"
                  >
                    Find My Rashi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {checkedModal && (
        <AlreadyCheckModal
          onClose={() => setCheckedModal(false)}
          onResults={() => navigate("/rashi-details")}
        />
      )}

      {loginModal && <MythosLoginModal onClose={() => setLoginModal(false)} />}

      {modalOpen && <RashiFinderModal onClose={() => setModalOpen(false)} />}
      {alreadyTakeModal && (
        <AssignmentAlreadyTakenHome
          onClose={() => setAlreadyTakeModal(false)}
          viewDetails={() =>
            navigate("/assessment/psychology", {
              state: { from: "homeAssessment" },
            })
          }
        />
      )}
    </div>
  );
};

export default NewLanding;
