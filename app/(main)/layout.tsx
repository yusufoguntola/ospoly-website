import Footer from "../components/layouts/footer";
import OspolyNavbar from "../components/layouts/navbar";
import BackToTop from "../components/ui/backToTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OspolyNavbar />
      {children}
      <BackToTop />
      <Footer />
    </>
  );
}

export const revalidate = 60;