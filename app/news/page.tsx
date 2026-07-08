import type { Metadata } from 'next';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'News & Updates — Amaya',
  description:
    'Stay up to date with the latest news, milestones, and announcements from Amaya — Hyderabad\'s landmark senior living community.',
};

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        <p className="text-charcoal/40 text-[10px] uppercase tracking-[0.38em] mb-6">
          Latest
        </p>

        <h1
          className="text-navy font-light uppercase leading-[1.05] tracking-[0.04em] mb-8 max-w-175"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
        >
          News &amp;<br />Updates
        </h1>

        <p className="text-charcoal/55 font-light text-[16px] md:text-[21px] leading-[1.9] max-w-115 mb-16">
          Follow the progress of Amaya — construction milestones, design
          reveals, community updates, and exclusive events from Hyderabad&apos;s
          most anticipated senior living community.
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
              title: 'Club Amaya Concept Unveiled',
              excerpt:
                'The design team releases the official interior concept for Club Amaya — the 34,000 sq ft community and wellness hub at the heart of the development.',
            },
            {
              tag: 'Events',
              date: 'March 2026',
              title: 'Private Preview Event — Hyderabad',
              excerpt:
                'Qualified residents and families were invited to an exclusive private preview of Amaya at the Medchal experience centre.',
            },
          ].map(({ tag, date, title, excerpt }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-7 border border-stone/50 rounded-sm text-left hover:border-navy/30 transition-colors duration-300 bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-charcoal/40 text-[9px] uppercase tracking-[0.28em]">{tag}</span>
                <span className="text-charcoal/30 text-[9px] tracking-[0.15em]">{date}</span>
              </div>
              <h2 className="text-navy font-light text-[28px] md:text-[53px] leading-[1.35]">{title}</h2>
              <p className="text-charcoal/50 font-light text-[16px] md:text-[21px] leading-[1.8]">{excerpt}</p>
              <span className="text-charcoal/35 text-[11px] uppercase tracking-[0.2em] mt-auto hover:text-brass transition-colors duration-200 cursor-pointer w-fit">
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
