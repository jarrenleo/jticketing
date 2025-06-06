import Navigation from "./_components/navigation/Navigation";
import Main from "./_components/home/Home";
import Footer from "./_components/footer/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Main />
      </main>
      <Footer />
    </div>
  );
}
