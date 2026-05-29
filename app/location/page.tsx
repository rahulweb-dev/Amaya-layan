import type { Metadata } from 'next';
import Location from '../components/Location';
import LocationSlider from '../components/LocationSlider';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Location — Layan Verde',
  description:
    'Layan Verde sits in Bang Tao, the most desirable address on Phuket — 2 minutes to the sea, 10 minutes to Laguna, surrounded by Michelin-starred restaurants and pristine beaches.',
};

export default function LocationPage() {
  return (
    <>
      <Location />
      <LocationSlider />
      <Footer />
    </>
  );
}
