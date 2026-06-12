'use client';

import Footer from '../components/Footer';
import ContactFormSection from '../components/ContactFormSection';

export default function ContactsPage() {
  return (
    <>
      <section className="bg-surface min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20">

        <p className="text-charcoal/40 text-[10px] uppercase tracking-[0.38em] mb-6 text-center">
          Get In Touch
        </p>

        <h1
          className="text-navy font-light uppercase leading-[1.05] tracking-[0.04em] mb-4 text-center"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)' }}
        >
          Contacts
        </h1>

        <p className="text-charcoal/55 font-light text-[14px] leading-[1.9] max-w-105 mb-14 text-center">
          Our sales team is available Monday to Saturday from 10:00 to 18:00 at our Medchal experience centre,
          and online around the clock. We&apos;d love to hear from you.
        </p>

        {/* Contact form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-[540px] flex flex-col gap-5"
        >
          <div className="flex flex-col gap-[6px]">
            <label className="text-charcoal/40 text-[9px] uppercase tracking-[0.3em]">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full bg-navy/4 border border-stone/60 rounded-full px-6 h-13 text-navy text-[13px] font-light placeholder:text-charcoal/25 focus:outline-none focus:border-navy/30 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-charcoal/40 text-[9px] uppercase tracking-[0.3em]">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-navy/4 border border-stone/60 rounded-full px-6 h-13 text-navy text-[13px] font-light placeholder:text-charcoal/25 focus:outline-none focus:border-navy/30 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-charcoal/40 text-[9px] uppercase tracking-[0.3em]">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="How can we help you?"
              className="w-full bg-navy/4 border border-stone/60 rounded-2xl px-6 py-4 text-navy text-[13px] font-light placeholder:text-charcoal/25 focus:outline-none focus:border-navy/30 transition-colors duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center gap-4 w-full h-13 rounded-full bg-brass text-white uppercase text-[11px] tracking-[0.22em] hover:bg-[#967043] transition-colors duration-300 mt-2"
          >
            Send Message
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </form>

        {/* Direct contact details */}
        <div className="mt-16 flex flex-col sm:flex-row gap-10 sm:gap-16 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-charcoal/30 text-[9px] uppercase tracking-[0.25em]">Phone</span>
            <a
              href="tel:+919800098000"
              className="text-charcoal/65 text-[13px] font-light hover:text-navy transition-colors duration-300"
            >
              +91 98000 98000
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-charcoal/30 text-[9px] uppercase tracking-[0.25em]">Email</span>
            <a
              href="mailto:hello@amaya.veravita.com"
              className="text-charcoal/65 text-[13px] font-light hover:text-navy transition-colors duration-300"
            >
              hello@amaya.veravita.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-charcoal/30 text-[9px] uppercase tracking-[0.25em]">Office</span>
            <span className="text-charcoal/65 text-[13px] font-light">
              Mon – Sat, 10:00 – 18:00
            </span>
          </div>
        </div>
      </section>

      <ContactFormSection />
      <Footer />
    </>
  );
}
