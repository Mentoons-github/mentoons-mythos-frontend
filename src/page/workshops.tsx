import { useEffect, useRef, useState } from "react";
import ChooseWorkshop from "../components/workshops/ChooseWorkshop";
import JoyfulGurukul from "../components/workshops/JoyfulGurukul";
import WorkshopRegister from "../components/workshops/WorkshopRegister";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchUserData } from "../features/user/userThunk";
import { IUser } from "../types";
import WorkshopDurationCard from "../components/workshops/WorkshopDurationCard";
import WorkshopLearningExperience from "../components/workshops/WorkshopLearningExperience";
import WhoAreTheWorskhopsFor from "../components/workshops/WhoAreTheWorskhopsFor";
import WorkshopTakeaways from "../components/workshops/WorkshopTakeways";
import { FaChevronDown } from "react-icons/fa";
import MythicArchitypes from "../components/workshops/MythicArchitypes";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Workshops = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [openSection, setOpenSection] = useState<number | null>(null);
  const durationRef = useRef<HTMLDivElement | null>(null);
  const ChooseWorkshopRef = useRef<HTMLDivElement | null>(null);
  const joyfullGurukulRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user && user.takeInitialAssessment) {
      setSelectedWorkshop(user.intelligenceTypes[0]);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const workshops = [
    {
      title: "The Mythos Learning Experience",
      component: <WorkshopLearningExperience />,
    },
    {
      title: "The 9 Mythic Archetypes of Human Intelligence",
      component: <MythicArchitypes />,
    },
    {
      title: "Who Are These Workshops For?",
      component: <WhoAreTheWorskhopsFor />,
    },
    {
      title: "What Participants Take Away",
      component: <WorkshopTakeaways />,
    },
  ];

  const clickViewMore = () => {
    durationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (from === "knowmore") {
      joyfullGurukulRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [from]);

  const handleBook = (plan: string) => {
    if (selectedWorkshop) {
      navigate("/workshops-payment", {
        state: { workshop: selectedWorkshop, planTitle:plan },
      });
    } else {
      handleNoteSelected();
    }
  };

  const handleNoteSelected = () => {
    toast.warning("Select a mythology-based workshop for Booking");
    ChooseWorkshopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[url('/assets/background/section/stars_background.png')] bg-center md:px-10 lg:px-28 md:py-12">
      {/* HERO */}
      <div className="lg:flex justify-between p-4 md:p-0 ">
        <div className=" mb-12 ">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-muted-foreground mb-4">
            🌿 Workshop:
            <span className="block text-2xl md:text-4xl lg:text-5xl md:mb-6 mt-2">
              Early Introduction to Spirituality
            </span>
          </h1>
          <div className="lg:max-w-xl md:mb-16 space-y-10 ">
            <p className=" md:text-xl leading-relaxed ">
              At <span className="font-bold ">Mentoons Mythos</span>, we conduct
              informative and interactive workshops that provide an effective
              and transformative experience for our participants.
            </p>
            <p className=" md:text-xl leading-relaxed">
              Discover the essence of spirituality at an early stage in life
              through this immersive workshop designed to nurture
              <span className="font-bold"> self-awareness</span>,
              <span className="font-bold "> mindfulness</span>, and{" "}
              <span className="font-bold ">inner growth</span>.
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-center ">
          <img
            src="assets/workshops/Workshop illustration.png"
            alt=""
            className="w-[650px]"
          />
        </div>
      </div>

      <div ref={joyfullGurukulRef}>
        <JoyfulGurukul clickViewMore={clickViewMore} />
      </div>

      <div className="space-y-4 p-3">
        {workshops.map((item, index) => {
          const isOpen = openSection === index;

          return (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden
        ${
          isOpen
            ? "bg-background shadow-xl "
            : "bg-background/80 border-gray-200 hover:shadow-lg hover:-translate-y-1"
        }`}
            >
              {/* HEADER */}
              <div
                onClick={() => setOpenSection(isOpen ? null : index)}
                className="flex justify-between items-center p-4 md:p-6 cursor-pointer"
              >
                <h2
                  className={`text-xl md:text-2xl font-bold transition ${
                    isOpen
                      ? "text-foreground/70"
                      : "text-foreground/80 group-hover:text-foreground/60"
                  }`}
                >
                  {item.title}
                </h2>

                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
            ${
              isOpen
                ? "bg-muted-foreground text-background"
                : "bg-gray-100 text-gray-500 group-hover:bg-muted-foreground group-hover:text-background"
            }`}
                >
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 md:px-6 pb-6 pt-0 ">{item.component}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OTHER COMPONENTS */}
      <div className="border rounded-3xl md:p-3 mt-10 mx-3">
        <div className="mt-" ref={ChooseWorkshopRef}>
          <ChooseWorkshop
            handleWorkshopSelect={(item: string) => setSelectedWorkshop(item)}
            user={user as IUser}
            selectedWorkshop={selectedWorkshop}
            handleContinue={clickViewMore}
          />
        </div>

        <div ref={durationRef}>
          <WorkshopDurationCard
            selectedWorkshop={selectedWorkshop}
            handleBook={handleBook}
          />
        </div>
      </div>

      <WorkshopRegister />
    </div>
  );
};

export default Workshops;
