import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Props {
  onClose: () => void;
  viewDetails?: () => void;
}

const AssignmentAlreadyTakenHome = ({ onClose, viewDetails }: Props) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-background p-8 rounded-2xl text-center space-y-6 border border-border shadow-xl max-w-md w-full mx-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-foreground/10 border border-foreground/20">
            <CheckCircle className="text-foreground" size={36} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl leading-tight">
            Assessment Already Completed
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            You've already completed the initial assessment. Your personalized
            workshops are ready for you.
          </p>
        </div>

        <div className="w-full h-px bg-border" />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/80 transition"
          >
            Back
          </button>

          <button
            onClick={viewDetails}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border font-medium hover:bg-foreground/5 transition text-sm"
          >
            View Results
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssignmentAlreadyTakenHome;
