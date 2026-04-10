import { useLocation } from "react-router-dom";
import { useState } from "react";
import { plans } from "../constants/workshop/JoyfullGurukulPlans";

interface PaymentState {
  workshop: string;
  planTitle: string;
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

const WorkshopPayment = () => {
  const location = useLocation();
  const state = location.state as PaymentState | null;

  const [ageGroup, setAgeGroup] = useState("");
  const [mode, setMode] = useState("");

  if (!state) {
    return <div className="p-10">Invalid access</div>;
  }

  const { workshop, planTitle } = state;

  const plan = plans.find((plan) => plan.title === planTitle);

  const selected = options.find((ele) =>
    workshop.toLowerCase().includes(ele.name.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background px-6 md:px-12 lg:px-28 py-10 flex justify-center">
      <div className="w-full max-w-2xl bg-white/5 border rounded-3xl shadow-xl p-6 md:p-10 space-y-8">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">Complete Your Booking</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Review your details and confirm your slot
          </p>
        </div>

        {/* WORKSHOP SUMMARY */}
        <div className="bg-background border rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-lg">Workshop Summary</h3>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Workshop</span>
            <span className="font-medium">{selected?.title || workshop}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span>{plan?.title}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span>{plan?.duration}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sessions</span>
            <span>{plan?.totalSessions}</span>
          </div>
        </div>

        {/* USER SELECTION */}
        <div className="space-y-6">
          {/* AGE */}
          <div>
            <p className="text-sm font-medium mb-2">Select Age Group</p>
            <div className="grid grid-cols-2 gap-3">
              {["6–12", "13–19"].map((age) => (
                <button
                  key={age}
                  onClick={() => setAgeGroup(age)}
                  className={`py-3 rounded-xl border text-sm font-medium transition
                ${
                  ageGroup === age
                    ? "bg-foreground text-background"
                    : "hover:bg-muted"
                }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* MODE */}
          <div>
            <p className="text-sm font-medium mb-2">Select Mode</p>
            <div className="grid grid-cols-2 gap-3">
              {["Online", "Offline"].map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`py-3 rounded-xl border text-sm font-medium transition
                ${
                  mode === item
                    ? "bg-foreground text-background "
                    : "hover:bg-muted"
                }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRICE + CTA */}
        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Amount</span>
            <span className="text-3xl font-extrabold ">
              {plan?.price}
            </span>
          </div>

          <button
            disabled={!ageGroup || !mode}
            className={`w-full py-3 rounded-xl font-semibold transition
          ${
            ageGroup && mode
              ? "bg-foreground text-background hover:bg-foreground/80"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          >
            Proceed to Pay
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payment • No hidden charges
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkshopPayment;
