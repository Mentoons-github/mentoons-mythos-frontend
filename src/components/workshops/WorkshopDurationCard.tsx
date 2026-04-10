import { CheckIcon } from "lucide-react";
import { plans } from "../../constants/workshop/JoyfullGurukulPlans";



interface Props {
  selectedWorkshop: string;
  handleBook: (plan: string) => void;
}

const WorkshopDurationCard = ({ handleBook }: Props) => {
  return (
    <div className="min-h-screen bg-background rounded-md px-4 py-5  lg:py-10">
      <h1 className="text-4xl md:text-4xl text-foreground/90 md:pl-5 text-left font-extrabold mb-6 lg:mb-16">
        Select your workshop plan
      </h1>
      <div className="flex flex-col  items-center justify-center ">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20  w-full max-w-7xl">
          {plans.map((plan, index) => (
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
                {plan.highlight && (
                  <span className="absolute top-4 right-4 text-xs border border-foreground px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold font-sans mb-">
                  {plan.title}
                </h2>
                <div className="grid grid-cols-2 p-5 gap-1">
                  <div className="h-10 w-full  bg-foreground text-background rounded-md flex items-center justify-center text-lg font-semibold">
                    Online
                  </div>
                  <div className="h-10 w-full  bg-foreground text-background rounded-md flex items-center justify-center text-lg font-semibold">
                    Offline
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap justify-between gap-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-xs border border-muted-foreground px-2 py-1 rounded">
                      {plan.duration}
                    </span>
                    <span className="text-xs border border-muted-foreground px-2 py-1 rounded">
                      {plan.totalSessions}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {plan.ageGroups.map((age, i) => (
                      <span
                        key={i}
                        className="text-xs border border-foreground px-2 py-1 rounded"
                      >
                        {age}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <h3 className="text-4xl font-extrabold mb-6">{plan.price}</h3>

                {/* Divider */}
                <div className="border-t border-muted-foreground mb-6"></div>

                <ul className="space-y-3 mb-8">
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

              {/* CTA */}
              <button
                onClick={() => handleBook(plan.title)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 
              ${
                plan.highlight
                  ? "bg-foreground text-background hover:bg-foreground/80"
                  : "border border-foreground hover:bg-foreground/20 hover:text-foreground"
              }`}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopDurationCard;
