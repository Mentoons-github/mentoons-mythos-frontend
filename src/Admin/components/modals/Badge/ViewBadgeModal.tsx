import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../../../../types/redux/blogInterface";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { fetchBadgeAnimationThunk } from "../../../../features/badge/badgeThunk";

interface BadgeRewardModalProps {
  open: boolean;
  onClose: () => void;
  badge: Badge | null;
}

/* ── Confetti ── */
const CONFETTI_COLORS = [
  "#FFD700",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98FB98",
  "#DDA0DD",
  "#FF69B4",
  "#00CED1",
];
const SHAPES = ["circle", "rect", "triangle"] as const;

type Particle = {
  id: number;
  delay: number;
  x: number;
  color: string;
  shape: (typeof SHAPES)[number];
  drift: number;
  spin: number;
  dur: number;
};

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: (i / count) * 0.6,
    x: 5 + Math.random() * 90,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    drift: (Math.random() - 0.5) * 120,
    spin: Math.random() > 0.5 ? 540 : -360,
    dur: 2 + Math.random() * 1.2,
  }));

const ConfettiParticle = ({
  x,
  color,
  shape,
  delay,
  drift,
  spin,
  dur,
}: Particle) => {
  const base =
    shape === "circle"
      ? { borderRadius: "50%", width: 8, height: 8, background: color }
      : shape === "rect"
        ? { borderRadius: 2, width: 12, height: 6, background: color }
        : {
            width: 0,
            height: 0,
            background: "transparent",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: `9px solid ${color}`,
          };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: -12, left: `${x}%` }}
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: 500,
        x: [0, drift * 0.4, drift],
        opacity: [1, 1, 1, 0],
        rotate: spin,
        scale: [1, 1.2, 0.8],
      }}
      transition={{ duration: dur, delay, ease: "easeIn" }}
    >
      <div style={base} />
    </motion.div>
  );
};

/* ── Orbiting dots ── */
const OrbitRing = ({
  radius,
  count,
  duration,
  color,
}: {
  radius: number;
  count: number;
  duration: number;
  color: string;
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: radius * 2,
          height: radius * 2,
          top: "50%",
          left: "50%",
          marginTop: -radius,
          marginLeft: -radius,
          rotate: `${(i / count) * 360}deg`,
        }}
        animate={{ rotate: `${(i / count) * 360 + 360}deg` }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div
          style={{
            position: "absolute",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            top: 0,
            left: "50%",
            marginLeft: -3.5,
            boxShadow: `0 0 8px 3px ${color}88`,
          }}
        />
      </motion.div>
    ))}
  </>
);

/* ── Shine sweep ── */
const ShineSweep = () => (
  <div className="absolute inset-0 rounded-[28px] pointer-events-none overflow-hidden z-30">
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{ delay: 0.7, duration: 0.9, ease: "easeInOut" }}
    />
  </div>
);

const ViewBadgeModal = ({ open, onClose, badge }: BadgeRewardModalProps) => {
  // const animationData = badge?.animation
  //   ? structuredClone(badge.animation)
  //   : null;
  const [particles] = useState(() => generateParticles(40));
  const [showRays, setShowRays] = useState(false);
  const [closing, setClosing] = useState(false);
  const dispatch = useAppDispatch();
  const { animation } = useAppSelector((state) => state.badge);

  useEffect(() => {
    dispatch(fetchBadgeAnimationThunk(badge?._id as string));
  }, [badge?._id, dispatch]);

  const clonedAnimation = animation
    ? JSON.parse(JSON.stringify(animation))
    : null;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setClosing(false);
      setShowRays(false);
      const t = setTimeout(() => setShowRays(true), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleClose = async () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={handleClose}
          />

          <div
            className="absolute top-10 right-10 text-white hover:text-gray-200"
            onClick={handleClose}
          >
            <X />
          </div>

          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((p) => (
              <ConfettiParticle key={p.id} {...p} />
            ))}
          </div>

          {/* Card */}
          <motion.div
            className="relative z-20 w-[92%] max-w-md"
            initial={{ scale: 0.5, opacity: 0, y: 60 }}
            animate={
              closing
                ? { scale: 0.85, opacity: 0, y: 20 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={
              closing
                ? { duration: 0.3, ease: "easeIn" }
                : { type: "spring", stiffness: 130, damping: 14 }
            }
          >
            <div
              className="relative rounded-[28px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
                boxShadow:
                  "0 0 0 1px rgba(255,215,0,0.18), 0 32px 80px rgba(0,0,0,0.75), 0 0 60px rgba(255,180,0,0.14)",
              }}
            >
              <ShineSweep />

              {/* Rainbow top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] z-10"
                style={{
                  background:
                    "linear-gradient(90deg, #FF6B6B, #FFD700, #4ECDC4, #45B7D1, #FFD700, #FF6B6B)",
                  backgroundSize: "300% 100%",
                  animation: "shimmer 3s linear infinite",
                }}
              />

              <div className="relative flex flex-col items-center pt-10 pb-8 px-6">
                {/* Badge area */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: 300, height: 300 }}
                >
                  {/* Sun rays */}
                  {showRays && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full pointer-events-none">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            width: 2,
                            height: 90,
                            background:
                              "linear-gradient(to top, rgba(255,215,0,0.45), transparent)",
                            transformOrigin: "bottom center",
                            bottom: "50%",
                            left: "calc(50% - 1px)",
                            rotate: `${i * 30}deg`,
                          }}
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: [0, 0.8, 0.5] }}
                          transition={{
                            delay: 0.1 + i * 0.04,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Orbit rings */}
                  <OrbitRing
                    radius={150}
                    count={6}
                    duration={5}
                    color="#FFD700"
                  />

                  <OrbitRing
                    radius={125}
                    count={4}
                    duration={8}
                    color="#FF6B6B"
                  />

                  {/* Pulsing glow disk */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 300,
                      height: 300,
                      background:
                        "radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,140,0,0.08) 60%, transparent 80%)",
                      boxShadow: "0 0 40px 14px rgba(255,200,0,0.18)",
                    }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Lottie badge */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center overflow-visible scale-[2] pointer-events-none"
                    style={{ width: 240, height: 240 }}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 13,
                      delay: 0.15,
                    }}
                  >
                    {clonedAnimation?.layers && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lottie
                          animationData={clonedAnimation}
                          loop={false}
                          style={{
                            width: 380,
                            height: 380,
                          }}
                        />
                      </div>
                    )}
                  </motion.div>
                </div>
                <motion.h2
                  className="mt-4 text-center font-extrabold text-white"
                  style={{
                    fontSize: "1.65rem",
                    lineHeight: 1.15,
                    textShadow: "0 2px 24px rgba(255,215,0,0.5)",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {badge?.name}
                </motion.h2>
                <motion.p
                  className="mt-2 text-center text-sm leading-relaxed max-w-[280px]"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.58 }}
                >
                  {badge?.description}
                </motion.p>

                {/* Divider */}
                <motion.div
                  className="mt-4 h-px w-3/4"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,215,0,0.35), transparent)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.62, duration: 0.55 }}
                />
              </div>
            </div>
          </motion.div>

          <style>{`
            @keyframes shimmer {
              0%   { background-position: 0%   50%; }
              100% { background-position: 300% 50%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewBadgeModal;
