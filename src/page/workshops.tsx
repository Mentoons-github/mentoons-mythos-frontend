import WorkshopCard from "../components/workshops/WorkshopCard";
import WorkshopRegister from "../components/workshops/WorkshopRegister";

const Workshops = () => {
  return (
    <div className="min-h-screen bg-white md:px-16 lg:px-28 md:py-12">
      <div className="lg:flex justify-between p-4 md:p-0 ">
        <div className="  mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            🌿 Workshop:
            <span className="block text-4xl md:text-5xl  mt-2">
              Early Introduction to Spirituality
            </span>
          </h1>
          <div className="lg:max-w-lg md:mb-16 space-y-10">
            <p className=" md:text-xl text-black leading-relaxed lg:max-w-lg">
              At{" "}
              <span className="font-bold text-black">
                Mentoons Mythos
              </span>
              , we conduct informative and interactive workshops that provide an
              effective and transformative experience for our participants.
            </p>
            <p className=" md:text-xl text-black leading-relaxed">
              Discover the essence of spirituality at an early stage in life
              through this immersive workshop designed to nurture
              <span className="font-bold text-black">
                {" "}
                self-awareness
              </span>
              ,<span className="font-bold text-black"> mindfulness</span>
              , and{" "}
              <span className="font-bold text-black">inner growth</span>.
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-center">
          <img src="assets/workshops/Workshop illustration.png" alt="" className="w-96"/>
        </div>
      </div>

        <WorkshopCard />
      <WorkshopRegister/>
    </div>
  );
};

export default Workshops;
