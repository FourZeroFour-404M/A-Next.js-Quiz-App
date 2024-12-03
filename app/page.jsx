import Benefits from "@components/Benefits";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Quotes from "@components/Quotes.";
import Reviews from "@components/Reviews";
import TutoringPackages from "@components/TutoringPackages";

const Home = () => {
  return (
    <div>
      <Header />
      <Quotes />
      <Benefits />
      <TutoringPackages />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
