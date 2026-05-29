// import Preloader from "./components/Preloader";
import Hero from './components/Hero';
import WorldClassProject from './components/WorldClassProject';
import Architecture from './components/Architecture';
import Location from './components/Location';
import LocationSlider from './components/LocationSlider';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import ContactFormSection from './components/ContactFormSection';

export default function Home() {
  return (
    <>
      {/* <Preloader /> */}
      <Hero />
      <WorldClassProject />
      <Location />
      <LocationSlider />
      <Amenities />
      <Architecture />
      <ContactFormSection />
      <Footer />
    </>
  );
}
