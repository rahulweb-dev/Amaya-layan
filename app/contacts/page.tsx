'use client';

import Footer from '../components/Footer';

export default function ContactsPage() {
  return (
    <>
      <section className="bg-[#021A13] min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20">

        <p className="text-white/40 text-[10px] uppercase tracking-[0.38em] mb-6 text-center">
          Get In Touch
        </p>

        <h1
          className="text-white font-light uppercase leading-[1.05] tracking-[0.04em] mb-4 text-center"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)' }}
        >
          Contacts
        </h1>

        <p className="text-white/55 font-light text-[14px] leading-[1.9] max-w-[420px] mb-14 text-center">
          Our sales team is available 7 days a week from 9:00 to 18:00 Phuket time,
          and online around the clock. We&apos;d love to hear from you.
        </p>

        {/* Contact form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-[540px] flex flex-col gap-5"
        >
          <div className="flex flex-col gap-[6px]">
            <label className="text-white/35 text-[9px] uppercase tracking-[0.3em]">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full bg-white/[0.04] border border-white/[0.12] rounded-full px-6 h-[52px] text-white text-[13px] font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-white/35 text-[9px] uppercase tracking-[0.3em]">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-white/[0.04] border border-white/[0.12] rounded-full px-6 h-[52px] text-white text-[13px] font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-white/35 text-[9px] uppercase tracking-[0.3em]">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="How can we help you?"
              className="w-full bg-white/[0.04] border border-white/[0.12] rounded-2xl px-6 py-4 text-white text-[13px] font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center gap-4 w-full h-[52px] rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] tracking-[0.22em] hover:bg-[#c89585] transition-colors duration-300 mt-2"
          >
            Send Message
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </form>

        {/* Direct contact details */}
        <div className="mt-16 flex flex-col sm:flex-row gap-10 sm:gap-16 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-white/25 text-[9px] uppercase tracking-[0.25em]">Phone</span>
            <a
              href="tel:+6625660587"
              className="text-white/65 text-[13px] font-light hover:text-white transition-colors duration-300"
            >
              +66 (2) 566-0587
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/25 text-[9px] uppercase tracking-[0.25em]">Email</span>
            <a
              href="mailto:info@villacartegroup.com"
              className="text-white/65 text-[13px] font-light hover:text-white transition-colors duration-300"
            >
              info@villacartegroup.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/25 text-[9px] uppercase tracking-[0.25em]">Office</span>
            <span className="text-white/65 text-[13px] font-light">
              Mon – Sun, 9:00 – 18:00 ICT
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
