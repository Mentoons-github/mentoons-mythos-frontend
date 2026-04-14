import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { plans } from "../constants/workshop/JoyfullGurukulPlans";
import {
  CheckCircle2,
  Clock,
  Layers,
  Tag,
  User,
  Wifi,
  MapPin,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import PaymentModal from "../components/modal/paymentModal/paymentModal";
import { useEffect, useState } from "react";

interface PaymentState {
  workshop: string;
  planTitle: string;
  mode: string;
  age: string;
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

/* ── Inline SVG payment icons ── */
// const GPay = () => (
//   <svg
//     viewBox="0 0 54 24"
//     width="54"
//     height="24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <text
//       y="18"
//       fontFamily="'Product Sans',Arial,sans-serif"
//       fontWeight="700"
//       fontSize="17"
//     >
//       <tspan fill="#4285F4">G</tspan>
//       <tspan fill="#EA4335">P</tspan>
//       <tspan fill="#FBBC05">a</tspan>
//       <tspan fill="#34A853">y</tspan>
//     </text>
//   </svg>
// );

// const PhonePe = () => (
//   <svg
//     viewBox="0 0 60 24"
//     width="60"
//     height="24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect width="60" height="24" rx="4" fill="#5F259F" />
//     <text
//       x="7"
//       y="17"
//       fontFamily="Arial,sans-serif"
//       fontWeight="700"
//       fontSize="11"
//       fill="#fff"
//     >
//       Phone
//     </text>
//     <text
//       x="38"
//       y="17"
//       fontFamily="Arial,sans-serif"
//       fontWeight="700"
//       fontSize="11"
//       fill="#CBB4F5"
//     >
//       Pe
//     </text>
//   </svg>
// );

// const Paytm = () => (
//   <svg
//     viewBox="0 0 56 24"
//     width="56"
//     height="24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect width="56" height="24" rx="4" fill="#00BAF2" />
//     <text
//       x="6"
//       y="17"
//       fontFamily="Arial,sans-serif"
//       fontWeight="800"
//       fontSize="12"
//       fill="#fff"
//     >
//       Paytm
//     </text>
//   </svg>
// );

// const BHIM = () => (
//   <svg
//     viewBox="0 0 52 24"
//     width="52"
//     height="24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       width="52"
//       height="24"
//       rx="4"
//       fill="#fff"
//       stroke="#e5e7eb"
//       strokeWidth="1"
//     />
//     <text
//       x="4"
//       y="17"
//       fontFamily="Arial,sans-serif"
//       fontWeight="800"
//       fontSize="13"
//     >
//       <tspan fill="#097939">BH</tspan>
//       <tspan fill="#ED752E">IM</tspan>
//     </text>
//     <text
//       x="31"
//       y="16"
//       fontFamily="Arial,sans-serif"
//       fontWeight="700"
//       fontSize="9"
//       fill="#666"
//     >
//       UPI
//     </text>
//   </svg>
// );

// const Visa = () => (
//   <svg
//     viewBox="0 0 52 24"
//     width="52"
//     height="24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect width="52" height="24" rx="4" fill="#1A1F71" />
//     <text
//       x="5"
//       y="19"
//       fontFamily="'Times New Roman',Georgia,serif"
//       fontWeight="700"
//       fontSize="17"
//       fill="#fff"
//       fontStyle="italic"
//     >
//       VISA
//     </text>
//   </svg>
// );

// const Mastercard = () => (
//   <svg
//     viewBox="0 0 52 24"
//     width="52"
//     height="24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect width="52" height="24" rx="4" fill="#252525" />
//     <circle cx="20" cy="12" r="8" fill="#EB001B" />
//     <circle cx="32" cy="12" r="8" fill="#F79E1B" />
//     <path d="M26 6.27a8 8 0 0 1 0 11.46A8 8 0 0 1 26 6.27z" fill="#FF5F00" />
//   </svg>
// );

// const RuPay = () => (
//   <svg
//     viewBox="0 0 56 24"
//     width="56"
//     height="24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       width="56"
//       height="24"
//       rx="4"
//       fill="#fff"
//       stroke="#e5e7eb"
//       strokeWidth="1"
//     />
//     <text
//       x="5"
//       y="17"
//       fontFamily="Arial,sans-serif"
//       fontWeight="800"
//       fontSize="12"
//     >
//       <tspan fill="#1A6DB5">Ru</tspan>
//       <tspan fill="#E7232A">Pay</tspan>
//     </text>
//   </svg>
// );

const paymentMethods = [
  { label: "Google Pay", src: "/assets/workshops/payments/gpay.png" },
  { label: "PhonePe", src: "/assets/workshops/payments/phonepe.png" },
  { label: "Paytm", src: "/assets/workshops/payments/paytm.png" },
  { label: "BHIM UPI", src: "/assets/workshops/payments/bhim.png" },
  { label: "Visa", src: "/assets/workshops/payments/visa.png" },
  { label: "Mastercard", src: "/assets/workshops/payments/mastercard.jpg" },
  { label: "RuPay", src: "/assets/workshops/payments/rupay.png" },
];

// const paymentMethods = [
//   { label: "Google Pay", Icon: GPay },
//   { label: "PhonePe", Icon: PhonePe },
//   { label: "Paytm", Icon: Paytm },
//   { label: "BHIM UPI", Icon: BHIM },
//   { label: "Visa", Icon: Visa },
//   { label: "Mastercard", Icon: Mastercard },
//   { label: "RuPay", Icon: RuPay },
// ];

/* ─────────────────────────────────────────── */

const WorkshopPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as PaymentState | null;
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [searchParams] = useSearchParams();
  const paid = searchParams.get("paid") === "true";

  useEffect(() => {
    if (paid) {
      setPaymentDone(true);
      setPaymentRequired(false);
    }
  }, [paid]);
  if (!state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-sm">
            Invalid access. Please go back and select a plan.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm border border-foreground/30 px-4 py-2 rounded-lg hover:bg-foreground/10 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { workshop, planTitle, mode, age } = state;
  const plan = plans.find((p) => p.title === planTitle);
  const selected = options.find((ele) =>
    workshop.toLowerCase().includes(ele.name.toLowerCase()),
  );

  const rows = [
    {
      icon: <Layers className="w-4 h-4" />,
      label: "Workshop",
      value: selected?.title || workshop,
    },
    { icon: <Tag className="w-4 h-4" />, label: "Plan", value: plan?.title },
    {
      icon: <Clock className="w-4 h-4" />,
      label: "Duration",
      value: plan?.duration,
    },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      label: "Sessions",
      value: plan?.totalSessions,
    },
    { icon: <User className="w-4 h-4" />, label: "Age Group", value: age },
    {
      icon:
        mode === "Online" ? (
          <Wifi className="w-4 h-4" />
        ) : (
          <MapPin className="w-4 h-4" />
        ),
      label: "Mode",
      value: mode,
    },
  ];

  return (
    <div className="min-h-screen bg-background px-4 md:px-8 py-10 flex flex-col items-center">
      {/* Back */}
      <div className="w-full max-w-lg mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="w-full max-w-lg flex flex-col gap-5">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Complete your booking
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Review your selections before proceeding to payment.
          </p>
        </div>

        {/* Summary Card */}
        <div className="border border-muted-foreground/30 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-muted-foreground/20">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Booking summary
            </p>
          </div>
          <div className="divide-y divide-muted-foreground/10">
            {rows.map(({ icon, label, value }, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3.5 gap-4"
              >
                <div className="flex items-center gap-2.5 text-muted-foreground min-w-0">
                  {icon}
                  <span className="text-sm">{label}</span>
                </div>
                <span className="text-sm font-medium text-foreground text-right truncate max-w-[55%]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Card */}
        <div className="border border-muted-foreground/30 rounded-2xl px-5 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
              Total amount
            </p>
            <p className="text-4xl font-extrabold text-foreground tracking-tight">
              ₹{plan?.price}
            </p>
          </div>
          <div className="text-right text-xs text-muted-foreground space-y-0.5">
            <p>One-time payment</p>
            <p>No hidden charges</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border border-muted-foreground/30 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-muted-foreground/20">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Accepted payment methods
            </p>
          </div>
          <div className="px-4 py-4 flex flex-wrap items-center gap-3">
            {/* {paymentMethods.map(({ label, Icon }) => (
              <div
                key={label}
                title={label}
                className="flex items-center justify-center bg-background border border-muted-foreground/20 rounded-lg px-2.5 py-2 hover:border-muted-foreground/50 transition cursor-default"
              >
                <Icon />
              </div>
            ))} */}

            {paymentMethods.map(({ label, src }) => (
              <div
                key={label}
                title={label}
                className="flex items-center justify-center bg-background border border-muted-foreground/20 rounded-lg px-3 py-2 hover:border-muted-foreground/50 transition"
              >
                <img src={src} alt={label} className="h-8 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setPaymentRequired(true)}
          className="w-full py-4 rounded-2xl bg-foreground text-background font-bold text-base tracking-wide hover:bg-foreground/85 active:scale-[0.98] transition-all duration-200"
        >
          Proceed to Pay
        </button>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secured by 256-bit encryption</span>
        </div>
      </div>

      {paymentRequired && (
        <PaymentModal
          closeModal={() => {
            setPaymentRequired(false);
          }}
          paymentDone={paymentDone}
          itemType={"workshop"!}
          itemName={name!}
          heading="Workshop"
          price={plan?.price ? Number(plan.price.replace(/[^\d.]/g, "")) : 0}
          description={`To purchase the workshop, a one-time payment of ${plan?.price} is required. `}
        />
      )}
    </div>
  );
};

export default WorkshopPayment;
