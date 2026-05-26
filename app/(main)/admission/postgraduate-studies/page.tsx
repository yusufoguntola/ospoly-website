import ApplyCard from "@/app/components/sections/admission/ApplyCard";
import ProgrammeContent from "@/app/components/sections/admission/ProgrammeContent";
import ProgrammeLayout from "@/app/components/sections/admission/ProgrammeLayout";


const BREADCRUMBS = [
  { label: "Home",         href: "/" },
  { label: "Academics",    href: "/academics" },
  { label: "Programmes",   href: "/academics/programmes" },
  { label: "Postgraduate Studies" },
];

const APPLY_STEPS = [
  "Visit https://ospolyportal.com/.",
  "Complete the application form.",
  "Upload required documents.",
  "Pay the application fee.",
  "Attend interview/screening.",
];

const SECTIONS = [
  {
    heading: "Available Programs:",
    bullets: [
      "Postgraduate Diploma (PGD) in Management Studies.",
      "PGD in Engineering Technology.",
      "Professional Certification in ICT, Entrepreneurship, and Education.",
    ],
  },
  {
    heading: "Entry Requirements:",
    bullets: [
      "A minimum of a Bachelor's degree or HND with Upper Credit in a relevant field.",
      "NYSC discharge/exemption certificate.",
      "References from academic/professional mentors.",
    ],
  },
];

export default function PostgraduateStudiesPage() {
  return (
    <ProgrammeLayout
      heroTitle="Find Your Path. Shape Your Future."
      heroDescription="Welcome to the Admissions hub of Osun State Polytechnic, Iree. Whether you are starting your higher education journey, seeking to advance your career, or balancing education with work, OSPOLY offers a pathway designed for you. Explore our programs and find the right fit for your ambitions."
      breadcrumbs={BREADCRUMBS}
      applyCard={
        <ApplyCard
          heading="How to Apply For Post-Graduate programme"
          steps={APPLY_STEPS}
          ctaLabel="Contact Postgraduate Office"
          ctaHref="/contact"
          accent="navy"
        />
      }
    >
      <ProgrammeContent
        title="Undergraduate Studies (Full-Time ND-HND)"
        intro={[
          "OSPOLY's postgraduate programmes provide opportunities for advanced academic and professional development in technical and management disciplines.",
          "Designed for graduates, professionals, and educators seeking to deepen expertise or transition into higher-level roles.",
        ]}
        sections={SECTIONS}
        buttons={[
          { label: "Download Prospectus", href: "/prospectus.pdf",                   variant: "outline" },
          { label: "Explore Programs",    href: "/academics/programmes",              variant: "outline" },
          { label: "Apply for PG Programs", href: "https://ospolyportal.com",        variant: "filled"  },
        ]}
      />
    </ProgrammeLayout>
  );
}
