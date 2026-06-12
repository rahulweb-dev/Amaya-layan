'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const mapRef    = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      });
      gsap.from(mapRef.current, {
        x: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#23384A] overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[520px]">

        {/* ── LEFT — Contact & Legal ── */}
        <div
          ref={leftRef}
          className="w-full md:w-[38%] shrink-0 flex flex-col gap-7 px-10 md:px-14 lg:px-16 xl:px-24 py-14 md:py-16 xl:py-24"
        >
          {/* Phone */}
          <div className="flex flex-col gap-[6px]">
            <a
              href="tel:+919800098000"
              className="text-limestone font-light text-[clamp(1.6rem,2.5vw,2.2rem)] tracking-tight leading-none hover:text-limestone/80 transition-colors duration-300"
            >
              +91 98000 98000
            </a>
            <a
              href="#"
              className="text-limestone/55 text-[11px] uppercase tracking-[0.22em] underline underline-offset-4 decoration-limestone/20 hover:text-limestone hover:decoration-limestone/50 transition-colors duration-300 w-fit"
            >
              Schedule a call
            </a>
          </div>

          {/* Experience centre */}
          <div className="flex flex-col gap-[6px]">
            <h4 className="text-limestone text-[13px] uppercase tracking-[0.2em] mb-1">
              Experience Centre
            </h4>
            <p className="text-limestone/50 text-[13px] font-light leading-[1.85]">
              Monday to Saturday, 10:00 to 18:00
              <br />Medchal, Hyderabad
              <br />Online — 24 hours a day
            </p>
          </div>

          {/* Address */}
          <a
            href="https://maps.google.com/?q=Medchal,+Nehru+Outer+Ring+Road,+Hyderabad,+Telangana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-limestone/55 text-[13px] font-light leading-[1.75] underline underline-offset-4 decoration-limestone/20 hover:text-limestone hover:decoration-limestone/45 transition-colors duration-300 w-fit"
          >
            Medchal, Nehru Outer Ring Road,
            <br />Hyderabad, Telangana 500 055
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-limestone/20 flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-limestone/20 flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="w-8 h-8 rounded-full border border-limestone/20 flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a href="#" aria-label="Location" className="w-8 h-8 rounded-full border border-limestone/20 flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300">
              <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </a>
          </div>

          {/* Email */}
          <a
            href="mailto:hello@amaya.veravita.com"
            className="text-limestone/55 text-[13px] font-light underline underline-offset-4 decoration-limestone/20 hover:text-limestone hover:decoration-limestone/45 transition-colors duration-300 w-fit"
          >
            hello@amaya.veravita.com
          </a>

          {/* Legal links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="text-limestone/30 text-[11px] underline underline-offset-4 decoration-limestone/15 hover:text-limestone/55 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-limestone/30 text-[11px] underline underline-offset-4 decoration-limestone/15 hover:text-limestone/55 transition-colors duration-300">
              Terms of Personal Data Processing
            </a>
          </div>

          {/* Disclaimer */}
          <div className="flex flex-col gap-3">
            <p className="text-limestone/22 text-[11px] font-light leading-[1.75] max-w-95">
              Project developer: Vera Vita Developments Pvt. Ltd. RERA Registration
              No. to be confirmed. Medchal, Nehru Outer Ring Road, Hyderabad,
              Telangana 500 055.
            </p>
            <p className="text-limestone/22 text-[11px] font-light leading-[1.75] max-w-95">
              This is not a public offer. Visualisations and floor plans are
              indicative. The developer reserves the right to make changes to the
              project in accordance with applicable legislation.
            </p>
          </div>

          <p className="text-limestone/28 text-[12px] font-light mt-auto">
            Amaya &copy; 2026 — All rights reserved.
          </p>
        </div>

        {/* ── RIGHT — Map image ── */}
        <a
          ref={mapRef}
          href="https://maps.app.goo.gl/2J562977FS84a2gw5"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open location in Google Maps"
          className="relative flex-1 min-h-95 md:min-h-0 block group overflow-hidden"
        >
          <Image
            src="/location.png"
            alt="Hyderabad map — Amaya, Medchal location"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            draggable={false}
          />

          <div className="absolute inset-0 bg-charcoal/35 group-hover:bg-charcoal/15 transition-colors duration-500" />
          <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-charcoal to-transparent pointer-events-none" />

          {/* Location marker */}
          {/* <div
            className="absolute pointer-events-none"
            style={{ top: '35%', left: '28%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="absolute w-16 h-16 rounded-full border border-brass/25 animate-ping"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            />
            <div className="absolute w-10 h-10 rounded-full border border-brass/40"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            />
            <div className="relative z-10 w-9 h-9 rounded-full bg-limestone shadow-[0_0_24px_rgba(231,216,198,0.45)] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-navy" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-5 bg-limestone/40" />
          </div> */}

          <div className="absolute bottom-5 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-limestone/70 text-[11px] uppercase tracking-[0.2em]">Open in Maps</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-limestone/60">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>
      </div>
    </footer>
  );
}
