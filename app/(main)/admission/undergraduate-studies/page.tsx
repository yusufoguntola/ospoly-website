import ApplyCard from "@/app/components/sections/admission/ApplyCard";
import ProgrammeContent from "@/app/components/sections/admission/ProgrammeContent";
import ProgrammeLayout from "@/app/components/sections/admission/ProgrammeLayout";


const BREADCRUMBS = [
  { label: "Home",         href: "/" },
  { label: "Academics",    href: "/academics" },
  { label: "Programmes",   href: "/academics/programmes" },
  { label: "Undergraduate Studies" },
];

const APPLY_STEPS = [
  "Visit https://ospolyportal.com/.",
  "Create an account or log in.",
  "Select ND or HND Application.",
  "Fill out the online form.",
  "Upload documents and make payment via Remita.",
  "Print the acknowledgment slip.",
  "Check your admission status periodically.",
];

const SECTIONS = [
  {
    heading: "National Diploma (ND):",
    bullets: [
      "5 credit passes at O'Level (WAEC/NECO/NABTEB) including English and Mathematics.",
      "JAMB UTME score meeting the departmental cut-off mark.",
      "OSPOLY chosen as first or second choice in JAMB.",
    ],
  },
  {
    heading: "Higher National Diploma (HND):",
    bullets: [
      "ND in a relevant field with at least Lower Credit.",
      "1-year Industrial Attachment (SIWES).",
      "Academic transcript and references.",
    ],
  },
];

export default function UndergraduateStudiesPage() {
  return (
    <ProgrammeLayout
      heroTitle="Find Your Path. Shape Your Future."
      heroDescription="Welcome to the Admissions hub of Osun State Polytechnic, Iree. Whether you are starting your higher education journey, seeking to advance your career, or balancing education with work, OSPOLY offers a pathway designed for you. Explore our programs and find the right fit for your ambitions."
      breadcrumbs={BREADCRUMBS}
      applyCard={
        <ApplyCard
          heading="How to Apply For Undergraduate Programme"
          steps={APPLY_STEPS}
          ctaLabel="Contact Admissions Office"
          ctaHref="/contact"
          accent="navy"
        />
      }
    >
      <ProgrammeContent
        title="Undergraduate Studies (Full-Time ND-HND)"
        intro={[
          "Our undergraduate programmes focus on learning and industry-relevant training that prepares students for employment and entrepreneurship.",
          "OSPOLY offers National Diploma (ND) and Higher National Diploma (HND) programmes across various schools and departments.",
        ]}
        sections={SECTIONS}
        quickInfo={[
          { label: "Duration",      value: "2 Years (4 Semesters)" },
          { label: "Requirements",  value: "5 O'Level Credits (Incl. English & Maths)" },
        ]}
        buttons={[
          { label: "Explore Programs", href: "/academics/programmes",           variant: "outline" },
          { label: "Apply for ND/HND", href: "https://ospolyportal.com",        variant: "filled"  },
        ]}
      />
    </ProgrammeLayout>
  );
}
