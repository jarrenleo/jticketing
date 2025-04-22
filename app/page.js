import Navigation from "./_components/navigation/Navigation";
import Main from "./_components/home/Home";
import Footer from "./_components/footer/Footer";

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <Main />
      <Footer />
    </div>
  );
}
