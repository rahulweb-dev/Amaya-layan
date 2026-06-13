import type { Metadata } from 'next';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Investment — Amaya',
  description:
    'Discover a rare senior living real estate investment opportunity in Hyderabad. Amaya by Vera Vita offers strong appreciation, premium lifestyle, and long-term value in Hyderabad\'s fastest-growing residential corridor.',
};

export default function InvestmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        <p className="text-charcoal/40 text-[10px] uppercase tracking-[0.38em] mb-6">
          Investment
        </p>

        <h1
          className="text-navy font-light uppercase leading-[1.05] tracking-[0.04em] mb-8 max-w-205"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
        >
          A Rare Opportunity<br />in Hyderabad
        </h1>

        <p className="text-charcoal/55 font-light text-[14px] md:text-[15px] leading-[1.9] max-w-130 mb-14">
          Amaya offers investors access to one of India&apos;s fastest-growing senior living
          markets. Located in Medchal — on Nehru Outer Ring Road, Hyderabad — the development
          delivers strong capital appreciation, competitive rental yields, and long-term value
          backed by world-class infrastructure and an expanding resident community.
        </p>

        {/* Key figures */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 mb-16 w-full max-w-175">
          {[
            { num: '256',    label: 'Planned Residences' },
            { num: '34,000', label: 'sq ft Club Amaya' },
            { num: '700ac',  label: 'Reserve Forest Adjacent' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="text-navy font-light leading-none"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                {num}
              </span>
              <span className="text-charcoal/40 text-[10px] uppercase tracking-[0.25em]">
                {label}
              </span>
            </div>
          ))}
        </div>

        <button className="group flex items-center gap-4 px-8 h-13 rounded-full bg-brass text-white uppercase text-[11px] tracking-[0.22em] hover:bg-[#967043] transition-colors duration-300">
          Request Investment Brochure
          <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </section>

      <Footer />
    </>
  );
}
