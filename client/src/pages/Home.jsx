import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import UpcomingEvents from "../components/home/UpcomingEvents";
import DonationCTA from "../components/home/DonationCTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutPreview />
      <UpcomingEvents />
      <DonationCTA />
      {/* More sections can go below */}
    </div>
  );
};

export default Home;