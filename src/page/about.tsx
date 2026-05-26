import HelperList from "../components/helperList/helperList";
// import FAQ from "../components/about/FAQ";
import HeroSection from "../components/about/HeroSection";
import KnowMoreAboutUs from "../components/about/KnowMoreAboutUs";
// import ProductDisplay from "../components/about/ProductDisplay";
const MythosAbout = () => {
  const helps = [
    {
      title: "Workshops",
      description:
        "Interactive workshops designed to help students understand their strengths, career paths, and personal growth through guided sessions.",
    },
    {
      title: "Psychology Assessment",
      description:
        "Detailed intelligence and personality analysis based on Howard Gardner’s theory, helping you discover your true potential.",
    },
    {
      title: "1-on-1 Career Guidance",
      description:
        "Personal video call sessions with expert mentors to guide your academic and career decisions.",
    },
    {
      title: "Astro Insights",
      description:
        "Understand planetary influences on your academics and career with actionable guidance.",
    },
  ];
  return (
    <div>
      <HeroSection />
      {/* <Problems /> */}
      <HelperList data={helps} label="HOW MENTOONS MYTHOS HELP YOU" />
      {/* <ProductDisplay /> */}
      <KnowMoreAboutUs />
      {/* <FAQ /> */}
    </div>
  );
};

export default MythosAbout;
