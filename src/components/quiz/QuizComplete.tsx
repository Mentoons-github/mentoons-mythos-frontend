import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { QuizQuestion } from "../../types/redux/mythosQuizType";

interface Props {
  score: number;
  questions: QuizQuestion[];
  handleRetry: () => void;
}

const TIER_CONFIG: Record<
  string,
  {
    message: string;
    sub: string;
    color: string;
    glow: string;
    emoji: string;
    particles: string[];
  }
> = {
  perfect: {
    message: "Perfect Score",
    sub: "Flawless. You know your myths.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    emoji: "🏆",
    particles: ["✦", "★", "◆", "✦", "★"],
  },
  great: {
    message: "Great Job",
    sub: "Sharp instincts, strong memory.",
    color: "#f97316",
    glow: "rgba(249,115,22,0.3)",
    emoji: "🔥",
    particles: ["◆", "✦", "◇", "✦", "◆"],
  },
  nice: {
    message: "Nice Effort",
    sub: "You're on the right path.",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.28)",
    emoji: "⚡",
    particles: ["◇", "○", "◆", "◇", "○"],
  },
  keep: {
    message: "Keep Practicing",
    sub: "Every myth begins with curiosity.",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.25)",
    emoji: "📖",
    particles: ["○", "◇", "○", "◇", "○"],
  },
};

function getTier(pct: number) {
  if (pct === 100) return "perfect";
  if (pct >= 70) return "great";
  if (pct >= 40) return "nice";
  return "keep";
}

/* Animated counting number */
function CountUp({
  target,
  duration = 1.4,
}: {
  target: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration * 60));
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setDisplay(start);
      if (start >= target) clearInterval(id);
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [target, duration]);
  return <>{display}</>;
}

/* SVG Ring */
function ScoreRing({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
  glow: string;
}) {
  const R = 70;
  const circ = 2 * Math.PI * R;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(percentage), 300);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      className="drop-shadow-lg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="90"
        cy="90"
        r={R}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth="10"
      />
      <circle
        cx="90"
        cy="90"
        r={R}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - (circ * progress) / 100}
        transform="rotate(-90 90 90)"
        filter="url(#glow)"
        style={{
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </svg>
  );
}

/* Floating particle */
function Particle({
  char,
  delay,
  color,
}: {
  char: string;
  delay: number;
  color: string;
}) {
  const x = Math.random() * 340 - 170;
  const y = -(80 + Math.random() * 120);
  return (
    <motion.span
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 0], y, x, scale: [0.5, 1.2, 0.8] }}
      transition={{ delay, duration: 2.2, ease: "easeOut" }}
      style={{
        color,
        position: "absolute",
        fontSize: 14,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {char}
    </motion.span>
  );
}

const QuizComplete = ({ score, questions, handleRetry }: Props) => {
  const percentage = (score / questions.length) * 100;
  const tier = getTier(percentage);
  const cfg = TIER_CONFIG[tier];
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowParticles(true), 400);
    return () => clearTimeout(t);
  }, []);

  const correct = score;
  const wrong = questions.length - score;

  return (
    <div
         className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#d7d3cef1]"
      style={{
        background: "",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
          borderRadius: 28,
          boxShadow: `0 2px 0 0 ${cfg.color}40, 0 24px 60px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.05)`,
          border: "1px solid rgba(255,255,255,0.9)",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: 4,
            background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}80)`,
          }}
        />

        <div className="px-8 pt-8 pb-8 text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#94a3b8",
              fontFamily: "'Georgia', serif",
              marginBottom: 20,
            }}
          >
            Quiz Complete
          </motion.p>

          {/* Ring + Score */}
          <div className="relative flex justify-center mb-5">
            {showParticles &&
              cfg.particles.map((p, i) => (
                <Particle key={i} char={p} delay={i * 0.12} color={cfg.color} />
              ))}

            <div className="relative">
              <ScoreRing
                percentage={percentage}
                color={cfg.color}
                glow={cfg.glow}
              />
              {/* Center content */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ gap: 2 }}
              >
                <span style={{ fontSize: 28, lineHeight: 1 }}>{cfg.emoji}</span>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: cfg.color,
                    lineHeight: 1.1,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  <CountUp target={Math.round(percentage)} />%
                </span>
              </div>
            </div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#1e293b",
                fontFamily: "'Georgia', serif",
                marginBottom: 4,
              }}
            >
              {cfg.message}
            </h2>
            <p
              style={{
                fontSize: 13.5,
                color: "#64748b",
                marginBottom: 24,
                fontStyle: "italic",
              }}
            >
              {cfg.sub}
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex gap-3 mb-7"
          >
            {[
              {
                label: "Correct",
                value: correct,
                accent: "#22c55e",
                bg: "#f0fdf4",
              },
              {
                label: "Score",
                value: `${score}/${questions.length}`,
                accent: cfg.color,
                bg: "#fff7ed",
              },
              {
                label: "Wrong",
                value: wrong,
                accent: "#f43f5e",
                bg: "#fff1f2",
              },
            ].map(({ label, value, accent, bg }) => (
              <div
                key={label}
                className="flex-1 rounded-2xl py-3 px-2 text-center"
                style={{ background: bg, border: `1px solid ${accent}22` }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: accent,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: "#94a3b8",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={handleRetry}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 14,
                background: `linear-gradient(135deg, ${cfg.color}, #ea580c)`,
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                boxShadow: `0 4px 20px ${cfg.glow}`,
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.02em",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  `0 8px 28px ${cfg.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  `0 4px 20px ${cfg.glow}`;
              }}
            >
              Try Again
            </button>

            <button
              onClick={() => (window.location.href = "/quiz")}
              style={{
                width: "100%",
                padding: "13px 0",
                borderRadius: 14,
                background: "transparent",
                color: "#64748b",
                fontWeight: 500,
                fontSize: 14,
                border: "1px solid #e2e8f0",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.02em",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#f8fafc";
                (e.currentTarget as HTMLButtonElement).style.color = "#334155";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
              }}
            >
              ← Back to Home
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizComplete;
