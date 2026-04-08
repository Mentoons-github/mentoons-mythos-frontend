import { useLocation } from "react-router-dom";

interface PaymentState {
  workshop: string;
  plan: {
    title: string;
    price: string;
    duration: string;
    totalSessions: string;
  };
}

const WorkshopPayment = () => {
  const location = useLocation();
  const state = location.state as PaymentState | null;

  if (!state) {
    return <div className="p-10">Invalid access</div>;
  }

  const { workshop, plan } = state;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white/5 border rounded-2xl p-6 md:p-10 shadow-xl">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>

        {/* Workshop Info */}
        <div className="space-y-4 border-b pb-6 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Workshop</span>
            <span className="font-semibold">{workshop}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-semibold">{plan.title}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span>{plan.duration}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Sessions</span>
            <span>{plan.totalSessions}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-medium">Total Amount</span>
          <span className="text-3xl font-extrabold">{plan.price}</span>
        </div>

        {/* CTA */}
        <button className="w-full py-3 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/80 transition">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default WorkshopPayment;
