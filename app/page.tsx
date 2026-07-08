import Hero from './components/Hero';
import HeroSlider from './components/HeroSlider';
import WorldClassProject from './components/WorldClassProject';
import Architecture from './components/Architecture';
import Location from './components/Location';
import LocationSlider from './components/LocationSlider';
import Amenities from './components/Amenities';
import ProjectTeam from './components/ProjectTeam';
import ResidencesShowcase from './components/ResidencesShowcase';
import Footer from './components/Footer';
import ContactFormSection from './components/ContactFormSection';
import SustainabilitySection from './components/SustainabilitySection';
import MediaSection from './components/MediaSection';
export default function Home() {
  return (
    <>
      <Hero />
      <WorldClassProject />
      <Location />
      <LocationSlider />
      {/* <Amenities /> */}
      {/* <Architecture /> */}
      {/* <ProjectTeam /> */}
      {/* <div className='mt-14'>
        <HeroSlider />{' '}
      </div> */}
      <ResidencesShowcase />
      <SustainabilitySection />
      {/* <MediaSection /> */}
      <ContactFormSection />
      <Footer />
    </>
  );
}
