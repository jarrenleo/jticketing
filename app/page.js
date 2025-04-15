import Navigation from "./_components/navigation/Navigation";
import MainContent from "./_components/main/MainContent";
import Footer from "./_components/footer/Footer";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <MainContent />
      <Footer />
    </div>
  );
}
