import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { resetMentorSlice } from "../features/mentor/mentorSlice";
import { fileUploadThunk } from "../features/upload/fileUploadThunk";
import { submitMentorFormThunk } from "../features/mentor/mentorThunk";
import { useLocation, useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MentorMeta {
  icon: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  qualification: string[];
  experience: string;
  accentClass: string;
}

// ─── Mentor content ───────────────────────────────────────────────────────────

const MENTOR_META: Record<string, MentorMeta> = {
  "Psychology Mentor": {
    icon: "🧠",
    tagline: "Guide minds, heal hearts",
    description:
      "A Psychology Mentor guides individuals through emotional and mental wellness using evidence-based approaches. The role combines active listening, structured counselling techniques, and personalised growth planning to help mentees lead healthier, more balanced lives.",
    responsibilities: [
      "Conduct one-on-one sessions focused on mental wellness and emotional clarity",
      "Develop personalised growth and recovery plans for each mentee",
      "Offer evidence-based coping strategies for stress, anxiety, and relationships",
      "Maintain confidential, supportive, and non-judgmental conversations",
      "Track mentee progress and adjust guidance plans accordingly",
      "Create psychoeducation content and self-help worksheets",
      "Facilitate group sessions or workshops on mental health topics",
    ],
    skills: [
      "Strong knowledge of CBT, DBT, or other therapeutic frameworks",
      "Excellent active listening and empathetic communication skills",
      "Ability to conduct structured yet flexible mentoring sessions",
      "Experience in crisis de-escalation and emotional support",
      "Comfort with online counselling tools and digital platforms",
    ],
    qualification: [
      "3+ years of experience in psychology, counselling, or mental health",
      "Degree or certification in psychology, therapy, or a related field",
      "Prior mentoring or coaching experience is an advantage",
      "Knowledge of goal-setting frameworks and progress tracking",
      "English and/or regional language communication skills",
    ],
    experience: "3+ years in psychology, counselling, or mental health",
    accentClass: "bg-violet-50",
  },
  "Astrology Mentor": {
    icon: "✨",
    tagline: "Illuminate paths through the stars",
    description:
      "An Astrologer Mentor guides students or junior astrologers in understanding and applying astrology principles, especially Vedic astrology, horoscope analysis, remedies, and client consultation techniques. The role combines teaching, mentorship, and practical astrological consultation.",
    responsibilities: [
      "Teach astrology concepts in a structured and practical way",
      "Provide personalised readings aligned to mentee goals",
      "Conduct online or offline training sessions and workshops",
      "Help mentees use astrology for timing and self-awareness",
      "Review horoscope interpretations and suggest remedies",
      "Create astrology-related learning content and study material",
      "Offer follow-up sessions to track predictions and insights",
    ],
    skills: [
      "Strong knowledge of Vedic astrology, KP system, numerology, or related occult sciences",
      "Excellent communication and teaching ability",
      "Practical horoscope-reading experience with real clients",
      "Mentoring and leadership skills to guide junior practitioners",
      "Comfort with online teaching tools and digital platforms",
    ],
    qualification: [
      "4–10+ years of astrology practice preferred",
      "Prior teaching or mentoring experience is an advantage",
      "Knowledge of horoscope analysis and remedial astrology",
      "Hindi and/or English communication skills",
    ],
    experience: "2+ years practising astrology with real clients",
    accentClass: "bg-emerald-50",
  },
  "Spiritual Guide": {
    icon: "🕊️",
    tagline: "Walk alongside souls on their journey",
    description:
      "A Spiritual Guide creates a sacred, non-judgmental space for individuals to explore their inner world, deepen their practice, and find meaning beyond the material. The role blends wisdom traditions, contemplative techniques, and compassionate presence to kindle lasting transformation.",
    responsibilities: [
      "Facilitate guided meditation, breathwork, or contemplative practices",
      "Support mentees through spiritual transitions, dark nights, and awakenings",
      "Share teachings from diverse wisdom traditions with clarity and respect",
      "Help mentees build a sustainable and personal spiritual routine",
      "Hold space for deep listening without imposing any belief system",
      "Create guided audio, journaling prompts, or ritual frameworks",
      "Conduct group circles or one-on-one spiritual mentoring sessions",
    ],
    skills: [
      "Deep personal practice in meditation, yoga, or a recognised spiritual tradition",
      "Ability to teach and hold space without projecting personal beliefs",
      "Experience in energy work, inner child healing, or somatic practices",
      "Strong compassionate presence and non-reactive listening skills",
      "Comfort with online facilitation tools and virtual retreat formats",
    ],
    qualification: [
      "5+ years of dedicated spiritual practice with some teaching experience",
      "Certification or training in meditation, yoga, or spiritual counselling",
      "Prior experience leading group circles or individual spiritual sessions",
      "Familiarity with multiple wisdom traditions is an advantage",
      "Hindi and/or English communication skills",
    ],
    experience:
      "5+ years of dedicated spiritual practice with teaching experience",
    accentClass: "bg-orange-50",
  },
};

const mentorTypes = Object.keys(MENTOR_META);
const genders = ["Male", "Female", "Other", "Prefer not to say"];

// ─── Sub-components ────────────────────────────────────────────────────────────

const CheckIcon = ({ color = "text-emerald-500" }: { color?: string }) => (
  <svg
    className={`w-3.5 h-3.5 ${color} flex-shrink-0 mt-0.5`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-300 text-muted-foreground ${open ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const MentorCard = ({
  type,
  meta,
  selected,
  onSelect,
  initialOpen,
}: {
  type: string;
  meta: MentorMeta;
  selected: boolean;
  onSelect: () => void;
  initialOpen: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden
        ${
          selected
            ? "border-2 border-foreground shadow-sm"
            : "border-border hover:border-foreground/30"
        }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
      >
        <span
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${meta.accentClass}`}
        >
          {meta.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground">{type}</p>
          <p className="text-xs text-muted-foreground">{meta.tagline}</p>
        </div>
        {selected && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
            Selected
          </span>
        )}
        <ChevronDown open={open} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[900px]" : "max-h-0"}`}
      >
        <div className="px-4 pb-5 pt-3 border-t border-border space-y-5">
          {/* Description */}
          <p className="text-sm text-foreground/80 leading-relaxed">
            {meta.description}
          </p>

          <div className="inline-flex items-center gap-2 text-xs bg-muted rounded-md px-2.5 py-1.5 text-muted-foreground">
            <span>🎓</span> {meta.experience}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Responsibilities */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                Responsibilities
              </p>
              <ul className="space-y-2">
                {meta.responsibilities.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <CheckIcon color="text-emerald-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                Key Skills
              </p>
              <ul className="space-y-2">
                {meta.skills.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <CheckIcon color="text-blue-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualification */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                Qualification
              </p>
              <ul className="space-y-2">
                {meta.qualification.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <CheckIcon color="text-amber-400" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Choose button */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onSelect}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150
              ${
                selected
                  ? "bg-foreground text-background cursor-default"
                  : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {selected ? "✓ Path selected" : "Choose this path"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form field wrapper
const Field = ({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-foreground">
      {label}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────

const BecomeMentor = () => {
  const dispatch = useAppDispatch();
  const { error, loading, message, success } = useAppSelector(
    (state) => state.mentor,
  );
  const location = useLocation();
  const mentor = location?.state?.mentorType || "";
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [mentorType, setMentorType] = useState<string>(mentor || "");
  const [socialLinks, setSocialLinks] = useState(["", "", ""]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    gender: "",
    age: "",
    resume: null as File | null,
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetMentorSlice());
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        whatsappNumber: "",
        gender: "",
        age: "",
        resume: null,
      });
      setFileName(null);
      setSocialLinks(["", "", ""]);
      setMentorType("");
      setActiveTab(1);
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(resetMentorSlice());
    }
  }, [dispatch, error, message, navigate, success]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target;
    if (
      target instanceof HTMLInputElement &&
      target.type === "file" &&
      target.files?.[0]
    ) {
      setFileName(target.files[0].name);
      setFormData((prev) => ({ ...prev, resume: target.files![0] }));
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSocialLinkChange = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index] = value;
    setSocialLinks(updated);
  };

  const handleNext = () => {
    if (!mentorType) {
      toast.error("Please select a mentor path to continue.");
      return;
    }
    setActiveTab(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to Apply");
    }
    const filteredLinks = socialLinks.filter((l) => l.trim() !== "");
    if (filteredLinks.length === 0) {
      toast.error("Please provide at least one social link.");
      return;
    }
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      resume,
      gender,
      age,
      whatsappNumber,
    } = formData;
    if (
      !firstName ||
      !email ||
      !mobileNumber ||
      !resume ||
      !gender ||
      !lastName ||
      !age ||
      !whatsappNumber
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    let fileUrl = "";
    try {
      const result = await dispatch(
        fileUploadThunk({ file: resume, category: "career" }),
      ).unwrap();
      if (typeof result === "string") fileUrl = result;
      else if (Array.isArray(result) && result.length > 0)
        fileUrl = result[0].url;
      else throw new Error("Invalid upload response");
    } catch (err) {
      toast.error("File upload failed. Please try again. " + err);
      return;
    }

    dispatch(
      submitMentorFormThunk({
        ...formData,
        resume: fileUrl,
        age: Number(age),
        mobileNumber: formData.mobileNumber.replace(/\s/g, ""),
        whatsappNumber: formData.whatsappNumber.replace(/\s/g, ""),
        mentorType,
        socialLinks: filteredLinks,
      }),
    );
  };

  const inputClass =
    "mt-1 block w-full rounded-lg border bg-background text-foreground h-11 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow placeholder:text-muted-foreground/50";

  const selectedMeta = mentorType ? MENTOR_META[mentorType] : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        {/* Hero */}
        <div className="text-center mb-10 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Mentor Application
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Become a Guiding Light
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Share your wisdom and help others grow, heal, and transform.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-border mb-8">
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`flex-1 flex items-center justify-center gap-2.5 pb-3 text-sm font-medium border-b-2 transition-all duration-200
              ${
                activeTab === 1
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center border-2 transition-all
              ${
                mentorType && activeTab !== 1
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : activeTab === 1
                    ? "border-foreground text-foreground"
                    : "border-muted-foreground/40 text-muted-foreground"
              }`}
            >
              {mentorType && activeTab !== 1 ? "✓" : "1"}
            </span>
            Choose your path
          </button>

          <button
            type="button"
            onClick={() => mentorType && setActiveTab(2)}
            disabled={!mentorType}
            className={`flex-1 flex items-center justify-center gap-2.5 pb-3 text-sm font-medium border-b-2 transition-all duration-200
              ${
                activeTab === 2
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center border-2 transition-all
              ${activeTab === 2 ? "border-foreground text-foreground" : "border-muted-foreground/40 text-muted-foreground"}`}
            >
              2
            </span>
            Your details
          </button>
        </div>

        {/* ── Tab 1: Choose path ── */}
        {activeTab === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Select the category that best matches your expertise. Expand a
              card to read the full details before choosing.
            </p>

            {mentorTypes.map((type) => {
              const isSelected =
                mentorType === type || mentorType === type.split(" ")[0];
              // Auto-open the card that matches the initial mentorType from location state
              const isInitial =
                mentor === type || mentor === type.split(" ")[0];
              return (
                <MentorCard
                  key={type}
                  type={type}
                  meta={MENTOR_META[type]}
                  selected={isSelected}
                  onSelect={() => setMentorType(type)}
                  initialOpen={isInitial}
                />
              );
            })}

            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-muted-foreground">
                {mentorType
                  ? `Path selected: ${mentorType}`
                  : "Select a path to continue"}
              </p>
              <button
                type="button"
                onClick={handleNext}
                disabled={!mentorType}
                className="flex items-center gap-2 bg-foreground text-background font-semibold py-2.5 px-5 rounded-lg text-sm hover:bg-foreground/85 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next — fill your details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 2: Application form ── */}
        {activeTab === 2 && (
          <div>
            {selectedMeta && (
              <div className="flex items-center gap-3 bg-muted/60 rounded-lg px-4 py-3 mb-6 border border-border">
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${selectedMeta.accentClass}`}
                >
                  {selectedMeta.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Selected path: {mentorType}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab(1)}
                    className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    Change path
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First Name" required>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Jane"
                    required
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Doe"
                    required
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Mobile Number" required>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/[^\d+]/g, "");

                      if ((value.match(/\+/g) || []).length > 1) return;

                      if (value.includes("+") && !value.startsWith("+")) return;

                      if (value.length <= 13) {
                        setFormData((p) => ({
                          ...p,
                          mobileNumber: value,
                        }));
                      }
                    }}
                    className={inputClass}
                    placeholder="+91 9876543210"
                    required
                  />
                </Field>
                <Field
                  label="WhatsApp Number"
                  required
                  hint="Can be same as mobile"
                >
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/[^\d+]/g, "");

                      if ((value.match(/\+/g) || []).length > 1) return;

                      if (value.includes("+") && !value.startsWith("+")) return;

                      if (value.length <= 13) {
                        setFormData((p) => ({
                          ...p,
                          whatsappNumber: value,
                        }));
                      }
                    }}
                    className={inputClass}
                    placeholder="+91 9876543210"
                    required
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email Address" required>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="jane@example.com"
                    required
                  />
                </Field>
                <Field label="Gender" required>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="" className="bg-background">
                      Select gender
                    </option>
                    {genders.map((g) => (
                      <option key={g} value={g} className="bg-background">
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Age" required>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. 30"
                    min={18}
                    required
                  />
                </Field>
                <Field label="Resume / CV" required hint="PDF, DOC, or DOCX">
                  <label
                    className={`${inputClass} flex items-center justify-between cursor-pointer hover:bg-muted/30`}
                  >
                    <span
                      className={`text-sm truncate ${fileName ? "text-foreground" : "text-muted-foreground/50"}`}
                    >
                      {fileName ?? "Choose file…"}
                    </span>
                    <span className="text-xs bg-muted px-2.5 py-1 rounded font-medium flex-shrink-0 ml-2 text-muted-foreground">
                      Browse
                    </span>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      className="hidden"
                      required
                    />
                  </label>
                </Field>
              </div>

              <Field
                label="Social / Professional Links"
                required
                hint="At least one link required (LinkedIn, Instagram, website…)"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  {socialLinks.map((link, i) => (
                    <input
                      key={i}
                      type="url"
                      value={link}
                      onChange={(e) =>
                        handleSocialLinkChange(i, e.target.value)
                      }
                      placeholder={
                        i === 0
                          ? "https://linkedin.com/in/you"
                          : i === 1
                            ? "https://instagram.com/you"
                            : "https://yourwebsite.com"
                      }
                      className={inputClass}
                      required={i === 0}
                    />
                  ))}
                </div>
              </Field>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center gap-2 bg-foreground text-background font-semibold py-2.5 px-6 rounded-lg text-sm hover:bg-foreground/85 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:bg-muted-foreground"
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>Submit application →</>
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-right">
                Our team will review and respond within 3–5 business days.
              </p>
            </form>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-12 italic">
          Together, let's guide others toward growth and transformation 🌟
        </p>
      </div>
    </div>
  );
};

export default BecomeMentor;
