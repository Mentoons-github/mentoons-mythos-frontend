import { useState, useEffect } from "react";
import { IUser } from "../../types";
import { useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import SignInSignUpModal from "../common/loginModal";
import AlreadyAssessmentTakeModal from "../modal/Workshops/AlreadyAssessmentTakeModal";

interface Props {
  user?: IUser;
}

const options = [
  { title: "The Warrior (Bodily Intelligence)", name: "Sports" },
  { title: "The Musician (Musical Intelligence)", name: "Music" },
  { title: "The Storyteller (Linguistic Intelligence)", name: "Linguistic" },
  { title: "The Strategist (Logical Intelligence)", name: "Logical" },
  { title: "The Creator (Spatial Intelligence)", name: "Spatial" },
  { title: "The Leader (Interpersonal Intelligence)", name: "Interpersonal" },
  { title: "The Seeker (Intrapersonal Intelligence)", name: "Intrapersonal" },
  {
    title: "The Guardian of Nature (Naturalistic Intelligence)",
    name: "Naturalistic",
  },
  { title: "The Mystic (Existential Intelligence)", name: "Existential" },
];

const ChooseWorkshop = ({ user }: Props) => {
  const [workshop, setWorkshop] = useState<string>("");
  const [loginModal, setLoginModal] = useState(false);
  const [alreadyTakeModal, setAlreadyTakeModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.takeInitialAssessment) {
      setWorkshop(user.intelligenceTypes[0]);
    }
  }, [user]);

  const handleTake = () => {
    if (!user) {
      setLoginModal(true);
    } else if (user?.takeInitialAssessment) {
      setAlreadyTakeModal(true);
    } else {
      navigate("/initialassessment", {
        state: { from: "workshops" },
      });
    }
  };

  return (
    <div className=" bg-muted/30 px-6 py-10 font-montserrat ">
      <div className=" grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              Choose Mythology-Based Workshops
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              *Pre-selected workshop based on your assessment
            </p>
          </div>

          {/* Card */}
          <div className="w-full border border-muted bg-background p-6 rounded-2xl shadow-md">
            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {options.map((item) => {
                const selected = workshop.includes(item.name);

                return (
                  <button
                    key={item.name}
                    onClick={() => setWorkshop(item.name)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200
                      ${
                        selected
                          ? "bg-foreground text-background scale-[1.02] shadow"
                          : "hover:border-foreground hover:shadow-sm"
                      }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Continue */}
            <button
              disabled={!workshop}
              className="mt-6 w-full py-3 rounded-xl bg-foreground text-background disabled:bg-foreground/40 disabled:cursor-not-allowed font-medium hover:bg-foreground/80 transition"
            >
              Continue
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center text-center justify-center space-y-8">
          <p className="text-sm text-muted-foreground">
            Haven't taken our initial assessment yet?
          </p>

          <div className="p-5 rounded-full bg-foreground/10 border border-foreground/20">
            <BrainCircuit size={42} />
          </div>

          <div className="flex flex-col items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              Discover Your Intelligence Type
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm">
              Everyone has a unique type of intelligence. Take this quick
              assessment to find out which one defines{" "}
              <span className="text-foreground font-medium">you</span>.
            </p>
          </div>

          <button
            onClick={handleTake}
            className="w-full max-w-xs py-3 rounded-xl border border-foreground font-medium hover:bg-foreground/5 transition"
          >
            Take Assessment
          </button>
        </div>
      </div>
      {loginModal && (
        <SignInSignUpModal
          onClose={() => setLoginModal(false)}
          content="Assessment"
        />
      )}
      {alreadyTakeModal && (
        <AlreadyAssessmentTakeModal
          onClose={() => setAlreadyTakeModal(false)}
          onRetake={() =>
            navigate("/initialassessment", {
              state: { from: "workshops" },
            })
          }
        />
      )}
    </div>
  );
};

export default ChooseWorkshop;
