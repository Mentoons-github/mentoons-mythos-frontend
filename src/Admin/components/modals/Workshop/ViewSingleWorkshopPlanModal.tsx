import { X, Clock3, Users, Monitor, Star, BookOpen } from "lucide-react";
import { WorkshopPlan } from "../../../../types/workshop/workshopPlan";

interface Props {
  onClose: () => void;
  plan: WorkshopPlan;
}

const ViewSingleWorkshopPlanModal = ({ onClose, plan }: Props) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-secondary rounded-2xl shadow-2xl p-5 md:p-8 hide-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{plan.title}</h2>
          <p className="text-muted-foreground mt-2">{plan.highlight}</p>
        </div>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-background rounded-xl p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <Clock3 size={18} />
              <span className="font-medium">Duration</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {plan.duration} Weeks
            </p>
          </div>

          <div className="bg-background rounded-xl p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} />
              <span className="font-medium">Age Groups</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {plan.ageGroups.map((age, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {age} yrs
                </span>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <Monitor size={18} />
              <span className="font-medium">Mode</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {plan.mode.map((mode, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600"
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <Star size={18} />
              <span className="font-medium">Price</span>
            </div>
            <p className="text-lg font-semibold">₹{plan.price}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Sessions */}
          <div className="bg-background border rounded-2xl p-5">
            <h3 className="text-lg font-semibold mb-3">
              Workshop Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Months</p>
                <p className="font-medium">{plan.months} {plan.months === "1"?"Month":"Months"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Sessions
                </p>
                <p className="font-medium">{plan.totalSessions} Sessions</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-background border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} />
              <h3 className="text-lg font-semibold">Features</h3>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} />
              <h3 className="text-lg font-semibold">
                Materials Included
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {plan.materials.map((material, index) => (
                <span
                  key={index}
                  className="px-3 py-2 rounded-lg bg-primary/10 text-sm text-primary"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleWorkshopPlanModal;