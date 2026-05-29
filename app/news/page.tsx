import type { Metadata } from 'next';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'News & Updates — Layan Verde',
  description:
    'Stay up to date with the latest news, milestones, and announcements from Layan Verde — Phuket\'s landmark luxury development.',
};

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#021A13] min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.38em] mb-6">
          Latest
        </p>

        <h1
          className="text-white font-light uppercase leading-[1.05] tracking-[0.04em] mb-8 max-w-[700px]"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
        >
          News &amp;<br />Updates
        </h1>

        <p className="text-white/55 font-light text-[14px] md:text-[15px] leading-[1.9] max-w-[460px] mb-16">
          Follow the progress of Layan Verde — construction milestones, design
          reveals, investment highlights, and exclusive events from one of
          Phuket&apos;s most anticipated developments.
        </p>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1100px]">
          {[
            {
              tag: 'Construction',
              date: 'May 2026',
              title: 'Foundation Works Complete on Tower A',
              excerpt:
                'Structural works for the first residential tower have been completed ahead of schedule, marking a key milestone for the project.',
            },
            {
              tag: 'Design',
              date: 'April 2026',
              title: 'Interior Concept Unveiled by Studio Dewan',
              excerpt:
                'Award-winning Dewan Architects release the official interior concept for Layan Verde\'s signature residences and common areas.',
            },
            {
              tag: 'Events',
              date: 'March 2026',
              title: 'Private Preview Event — Bangkok',
              excerpt:
                'Qualified investors were invited to an exclusive private preview of Layan Verde at our Bangkok sales gallery.',
            },
          ].map(({ tag, date, title, excerpt }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-7 border border-white/[0.08] rounded-[4px] text-left hover:border-white/20 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-white/35 text-[9px] uppercase tracking-[0.28em]">{tag}</span>
                <span className="text-white/25 text-[9px] tracking-[0.15em]">{date}</span>
              </div>
              <h2 className="text-white font-light text-[1.1rem] leading-[1.35]">{title}</h2>
              <p className="text-white/45 font-light text-[13px] leading-[1.8]">{excerpt}</p>
              <span className="text-white/30 text-[11px] uppercase tracking-[0.2em] mt-auto hover:text-white/60 transition-colors duration-200 cursor-pointer w-fit">
                Read more →
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
