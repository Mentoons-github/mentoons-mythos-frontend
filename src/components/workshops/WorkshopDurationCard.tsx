import { ArrowRight, CheckIcon } from "lucide-react";
// import { plans } from "../../constants/workshop/JoyfullGurukulPlans";
import { useState } from "react";
import { WorkshopPlan } from "../../types/workshop/workshopPlan";

interface Props {
  selectedWorkshop: string;
  handleBook: (planId: string, mode: string, age: string) => void;
  plans: WorkshopPlan[];
}

const WorkshopDurationCard = ({ handleBook, plans }: Props) => {
  const [selection, setSelection] = useState<
    Record<number, { mode?: string; age?: string }>
  >({});

  const [errors, setErrors] = useState<Record<number, string>>({});

  const selectMode = (index: number, mode: string) => {
    setSelection((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        mode: prev[index]?.mode === mode ? undefined : mode,
      },
    }));
    setErrors((prev) => ({ ...prev, [index]: "" }));
  };

  const selectAge = (index: number, age: string) => {
    setSelection((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        age: prev[index]?.age === age ? undefined : age,
      },
    }));
    setErrors((prev) => ({ ...prev, [index]: "" }));
  };

  const onBook = (index: number, planId?: string) => {
    if (!planId) return;
    const s = selection[index] ?? {};
    if (!s.mode || !s.age) {
      setErrors((prev) => ({
        ...prev,
        [index]: "Please select both mode and age group to continue.",
      }));
      return;
    }
    handleBook(planId, s.mode, s.age);
  };

  return (
    <div className="min-h-screen bg-background rounded-md px-4 py-5  lg:py-10">
      <h1 className="text-4xl md:text-4xl text-foreground/90 md:pl-5 text-left font-extrabold mb-6 lg:mb-16">
        Select your workshop plan
      </h1>
      <div className="flex flex-col  items-center justify-center ">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20  w-full max-w-7xl">
          {plans.map((plan, index) => {
            const sel = selection[index] ?? {};
            const error = errors[index] ?? "";
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-4 md:p-8 border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]
            ${
              plan.highlight
                ? "border-foreground shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                : "border-muted-foreground hover:border-foreground"
            }`}
              >
                <div>
                  {/* {plan.highlight && (
                    <span className="absolute top-1 right-4 text-xs border border-foreground px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )} */}

                  {/* Title */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl md:text-3xl font-bold font-sans mb-">
                      {plan.title}
                    </h2>
                    <div className="flex gap-2">
                      <span className="text-xs border bg-foreground/80 text-background border-muted-foreground px-2 py-1 rounded">
                        {plan.duration} Weeks
                      </span>
                      <span className="text-xs border bg-foreground/80 text-background border-muted-foreground px-2 py-1 rounded">
                        {plan.totalSessions} Sessions
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 mb-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">
                      Mode
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                      {plan.mode.map((mode) => (
                        <button
                          key={mode}
                          onClick={() => selectMode(index, mode)}
                          className={`h-10 w-full rounded-md text-sm font-semibold border transition-all duration-200
                            ${
                              sel.mode === mode
                                ? "bg-foreground text-background border-foreground"
                                : "bg-transparent text-foreground border-muted-foreground hover:border-foreground"
                            }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">
                      Age Group
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                      {plan.ageGroups.map((age, i) => (
                        <button
                          key={i}
                          onClick={() => selectAge(index, age)}
                          className={`h-10 w-full rounded-md text-sm font-semibold border transition-all duration-200
                            ${
                              sel.age === age
                                ? "bg-foreground text-background border-foreground"
                                : "bg-transparent text-foreground border-muted-foreground hover:border-foreground"
                            }`}
                        >
                          {age} yrs
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <h3 className="text-4xl font-extrabold mb-6">
                    ₹{Number(plan.price).toLocaleString("en-IN")}
                  </h3>

                  {/* Divider */}
                  <div className="border-t border-muted-foreground mb-6"></div>

                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full border border-foreground/30 text-foreground/70">
                          <CheckIcon className="w-2.5 h-2.5" />
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-muted-foreground pt-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight  mb-4">
                      Workshop Material Included
                    </h3>

                    <ul className="space-y-2 mb-8">
                      {[
                        "Completion certificate",
                        "Participation certificate",
                        "Coloring books",
                        "Self learning videos",
                        "Worksheets",
                      ].map((material, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full border border-foreground/30 text-foreground/70">
                            <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {material}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 text-center mb-3">
                      {error}
                    </p>
                  )}

                  {/* Selection Summary */}
                  {(sel.mode || sel.age) && (
                    <p className="text-xs text-muted-foreground text-center mb-3">
                      {sel.mode && sel.age
                        ? `${sel.mode} · ${sel.age}`
                        : !sel.mode
                          ? "Select a mode to continue"
                          : "Select an age group to continue"}
                    </p>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => onBook(index, plan._id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
                      ${
                        plan.highlight
                          ? "bg-foreground text-background hover:bg-foreground/80"
                          : "border border-foreground hover:bg-foreground/20 hover:text-foreground"
                      }`}
                  >
                    Get Access
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkshopDurationCard;
