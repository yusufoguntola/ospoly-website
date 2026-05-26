import ApplyCard from "@/app/components/sections/admission/ApplyCard";
import ProgrammeContent from "@/app/components/sections/admission/ProgrammeContent";
import ProgrammeLayout from "@/app/components/sections/admission/ProgrammeLayout";


const BREADCRUMBS = [
  { label: "Home",         href: "/" },
  { label: "Academics",    href: "/academics" },
  { label: "Programmes",   href: "/academics/programmes" },
  { label: "Distance Learning" },
];

const APPLY_STEPS = [
  "Visit https://ospolportal.com/.",
  "Create an account.",
  "Select your preferred mode (PT, Weekend, or Distance Learning).",
  "Complete the form and pay online.",
  "Print acknowledgment slip.",
];

const SECTIONS = [
  {
    heading: "Available Programs:",
    bullets: [
      "Daily Part-Time (DPT): Weekday classes for local learners.",
      "Weekend Programmes: For working professionals.",
      "Distance Learning (Online + On-Campus): For remote learners.",
    ],
  },
  {
    heading: "Entry Requirements:",
    bullets: [
      "5 credit passes at O'Level, including English and Mathematics.",
      "ND certificate (for HND applicants).",
      "Work experience (advantageous but not mandatory).",
    ],
  },
  {
    heading: "Benefits:",
    bullets: [
      "Flexible schedules for working students.",
      "Affordable tuition and pay-as-you-go options.",
      "Same curriculum and certification as full-time students.",
    ],
  },
];

export default function DistanceLearningPage() {
  return (
    <ProgrammeLayout
      heroTitle="Find Your Path. Shape Your Future."
      heroDescription="Welcome to the Admissions hub of Osun State Polytechnic, Iree. Whether you are starting your higher education journey, seeking to advance your career, or balancing education with work, OSPOLY offers a pathway designed for you. Explore our programs and find the right fit for your ambitions."
      breadcrumbs={BREADCRUMBS}
      applyCard={
        <ApplyCard
          heading="How to Apply For Post Graduate /Part-Time Studies"
          steps={APPLY_STEPS}
          ctaLabel="Contact Part-Time Office"
          ctaHref="/contact"
          accent="gold"
        />
      }
    >
      <ProgrammeContent
        title="Distance Learning/ Part-Time Studies"
        intro={[
          "The Distance Learning and Part-Time programmes at OSPOLY provide flexible, work-friendly study options for professionals and individuals who wish to advance their education without leaving their jobs.",
          "Classes are held in the evenings or weekends, with blended online support for selected courses.",
        ]}
        sections={SECTIONS}
        buttons={[
          { label: "Explore programs", href: "/academics/programmes", variant: "outline" },
          { label: "Apply Now",        href: "https://ospolyportal.com", variant: "filled" },
        ]}
      />
    </ProgrammeLayout>
  );
}
