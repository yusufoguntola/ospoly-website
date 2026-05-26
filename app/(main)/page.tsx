import CtaBanner from "../components/sections/home/CtaBanner";
import FindYourWaySection from "../components/sections/home/FindYourWaySection";
import HeroSection from "../components/sections/home/heroSection";
import MissionSection from "../components/sections/home/missionSection";
import NewsUpdateSection from "../components/sections/NewsUpdateSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <FindYourWaySection />
      <NewsUpdateSection />
      <CtaBanner
        headline={
          "READY TO\nLEARN, CREATE, AND\nCONTRIBUTE TO A\nSKILLED FUTURE."
        }
      />
    </>
  );
}
