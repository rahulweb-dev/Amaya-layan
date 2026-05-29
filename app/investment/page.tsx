import type { Metadata } from 'next';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Investment — Layan Verde',
  description:
    'Discover a rare luxury real estate investment opportunity in Phuket. Layan Verde offers strong annual appreciation, premium rental yields, and long-term capital growth in Thailand\'s most sought-after resort destination.',
};

export default function InvestmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#021A13] min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.38em] mb-6">
          Investment
        </p>

        <h1
          className="text-white font-light uppercase leading-[1.05] tracking-[0.04em] mb-8 max-w-[820px]"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
        >
          A Rare Opportunity<br />in Phuket
        </h1>

        <p className="text-white/55 font-light text-[14px] md:text-[15px] leading-[1.9] max-w-[520px] mb-14">
          Layan Verde offers investors access to one of Thailand&apos;s fastest-growing
          luxury markets. Located in Bang Tao — the island&apos;s premier residential
          corridor — the development delivers 10% annual appreciation, competitive
          rental yields, and strong long-term capital growth backed by world-class
          infrastructure and an expanding international audience.
        </p>

        {/* Key figures */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 mb-16 w-full max-w-[700px]">
          {[
            { num: '10%',   label: 'Annual Appreciation' },
            { num: '7–9%',  label: 'Net Rental Yield' },
            { num: '30yr',  label: 'Leasehold Security' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="text-white font-light leading-none"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                {num}
              </span>
              <span className="text-white/35 text-[10px] uppercase tracking-[0.25em]">
                {label}
              </span>
            </div>
          ))}
        </div>

        <button className="group flex items-center gap-4 px-8 h-[52px] rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] tracking-[0.22em] hover:bg-[#c89585] transition-colors duration-300">
          Request Investment Brochure
          <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </section>

      <Footer />
    </>
  );
}
