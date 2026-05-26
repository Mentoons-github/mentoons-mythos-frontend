import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  collectBadgeThunk,
  fetchBadgeAnimationThunk,
} from "../../../features/badge/badgeThunk";
import { Badge } from "../../../types/redux/blogInterface";
import { X } from "lucide-react";

interface BadgeRewardModalProps {
  open: boolean;
  onClose: () => void;
  badge: Badge | null;
  from?: string;
  isDeleted?: boolean;
  handleDeleteClick?: () => void;
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

const BadgeRewardModal = ({
  open,
  onClose,
  badge,
  from,
  isDeleted,
  handleDeleteClick,
}: BadgeRewardModalProps) => {
  const [particles] = useState(() => generateParticles(40));
  const [showRays, setShowRays] = useState(false);
  const [closing, setClosing] = useState(false);
  const dispatch = useAppDispatch();

  const { animation } = useAppSelector((state) => state.badge);

  useEffect(() => {
    if (!open || !badge?._id || animation) return;

    dispatch(fetchBadgeAnimationThunk(badge._id));
  }, [open, badge?._id]);

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

  const handleClose = async (clickFrom: string) => {
    if (!from && badge?._id) {
      setClosing(true);
      try {
        await dispatch(collectBadgeThunk(badge._id)).unwrap();
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        onClose();
      }, 300);
    }

    if (from && badge?._id) {
      // Claim back removed badge
      // if (isDeleted) {
      //   try {
      //     await dispatch(collectBadgeThunk(badge._id)).unwrap();
      //   } catch (err) {
      //     console.log(err);
      //   }
      //   setTimeout(() => {
      //     onClose();
      //   }, 300);

      //   return;
      // }

      // Delete badge
      if (handleDeleteClick) {
        if (clickFrom !== "outsidClick") {
          handleDeleteClick();
        } else {
          setTimeout(() => {
            onClose();
          }, 300);
        }
      }
    }
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
            onClick={() => handleClose("outsidClick")}
          />

          {from && (
            <div
              className="absolute top-10 right-10 text-white hover:text-gray-200"
              onClick={() => handleClose("outsidClick")}
            >
              <X />
            </div>
          )}

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
                          key={badge?._id}
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

                {/* Pill label */}
                <motion.div
                  className="mt-3 px-4 py-1 rounded-full text-xs font-black uppercase"
                  style={{
                    background: "linear-gradient(90deg, #FFD700, #FFA500)",
                    color: "#1a1a2e",
                    boxShadow: "0 2px 14px rgba(255,180,0,0.4)",
                    letterSpacing: "0.16em",
                  }}
                  initial={{ opacity: 0, y: 12, scale: 0.75 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 220 }}
                >
                  🏆 Badge Unlocked
                </motion.div>

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

                <motion.div
                  className="mt-3 px-3 py-1 rounded-full text-[11px] font-semibold"
                  style={{
                    background: "rgba(255,215,0,0.12)",
                    color: "#FFD700",
                    border: "1px solid rgba(255,215,0,0.22)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65 }}
                >
                  ✨ Collect badges to unlock rewards & profile prestige
                </motion.div>

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

                <motion.p
                  className="mt-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.72 }}
                >
                  Added to your collection
                </motion.p>

                {/* CTA */}
                <motion.button
                  onClick={() => handleClose("buttonClick")}
                  className={`mt-6 w-full rounded-2xl py-3 font-bold text-sm relative overflow-hidden transition-all ${
                    from
                      ? isDeleted
                        ? "border border-green-500/30"
                        : "border border-red-500/30"
                      : ""
                  }`}
                  style={{
                    background: from
                      ? isDeleted
                        ? "linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
                        : "linear-gradient(135deg, #ff4d4d 0%, #b91c1c 100%)"
                      : "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",

                    color: from ? "#fff" : "#1a1a2e",

                    letterSpacing: "0.06em",

                    boxShadow: from
                      ? isDeleted
                        ? "0 4px 20px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
                        : "0 4px 20px rgba(255,77,77,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
                      : "0 4px 20px rgba(255,180,0,0.45), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: from
                      ? "0 6px 30px rgba(255,77,77,0.5)"
                      : "0 6px 30px rgba(255,180,0,0.6)",
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  {!from && (
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)",
                      }}
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.45 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {from ? <>🗑 Delete Badge</> : <>Claim It! 🚀</>}
                  </span>
                </motion.button>
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

export default BadgeRewardModal;
