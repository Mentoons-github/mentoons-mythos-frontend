import { useEffect } from "react";
import ChooseWorkshop from "../components/workshops/ChooseWorkshop";
import JoyfulGurukul from "../components/workshops/JoyfulGurukul";
import WorkshopCard from "../components/workshops/WorkshopCard";
import WorkshopRegister from "../components/workshops/WorkshopRegister";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchUserData } from "../features/user/userThunk";
import { IUser } from "../types";
import WorkshopDurationCard from "../components/workshops/WorkshopDurationCard";
import WorkshopLearningExperience from "../components/workshops/WorkshopLearningExperience";
import WhoAreTheWorskhopsFor from "../components/workshops/WhoAreTheWorskhopsFor";
import WorkshopTakeaways from "../components/workshops/WorkshopTakeways";

const Workshops = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <div className="min-h-screen  bg-[url('/assets/background/section/stars_background.png')] bg-center md:px-10 lg:px-28 md:py-12">
      <div className="lg:flex justify-between p-4 md:p-0 ">
        <div className="  mb-12">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-muted-foreground mb-4">
            🌿 Workshop:
            <span className="block text-2xl md:text-4xl lg:text-5xl  mt-2">
              Early Introduction to Spirituality
            </span>
          </h1>
          <div className="lg:max-w-lg md:mb-16 space-y-10">
            <p className=" md:text-xl leading-relaxed lg:max-w-lg">
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

        <div className=" flex items-center justify-center">
          <img
            src="assets/workshops/Workshop illustration.png"
            alt=""
            className="w-96"
          />
        </div>
      </div>

      <JoyfulGurukul />
      {/* <JoyfulGurukalCard/> */}
      <WorkshopLearningExperience />
      <ChooseWorkshop user={user as IUser} />
      <WhoAreTheWorskhopsFor/>
      <WorkshopTakeaways/>
      <WorkshopDurationCard />
      <WorkshopCard />
      <WorkshopRegister />
    </div>
  );
};

export default Workshops;
