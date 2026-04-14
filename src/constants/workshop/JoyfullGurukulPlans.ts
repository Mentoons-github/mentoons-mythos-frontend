import { WorkshopPlan } from "../../types/workshop/workshopPlan";

export const plans: WorkshopPlan[] = [
  {
    title: "1 Month Workshop",
    months: "1 Month",
    duration: "4 Weeks",
    price: "2,999",
    highlight: false,
    totalSessions: "10 Sessions",
    ageGroups: ["6–12 yrs", "13–19 yrs"],
    features: [
      "Introduction to ancient myths across cultures (India, Greece, Egypt)",
      "Storytelling sessions: Ramayana, Greek & world myths",
      "Understanding the 9 human intelligences through myth characters",
      "Basic archetypes: Hero, Warrior, Leader, Storyteller",
      "Interactive activities: storytelling, drawing, discussions",
      "Build emotional & creative thinking skills",
      "Certificate of completion",
    ],
  },
  {
    title: "3 Months Workshop",
    months: "6 Months",
    duration: "12 Weeks",
    price: "7,129",
    highlight: true,
    totalSessions: "26 Sessions",
    ageGroups: ["6–12 yrs", "13–19 yrs"],
    features: [
      "Deep exploration of global mythologies (Indian, Greek, Norse, Egyptian)",
      "Complete 9 Mythic Archetypes & Human Intelligence framework",
      "Hero’s Journey (Joseph Campbell) + personal growth mapping",
      "Myth & Psychology: emotions, identity, purpose",
      "Advanced storytelling & character creation",
      "Create your own myth / story project",
      "Group discussions & role-playing mythic characters",
      "Portfolio + presentation of final myth project",
    //   "Certificate + mentorship guidance",
    ],
  },
];
