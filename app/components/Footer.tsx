'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

import { HiOutlineLocationMarker } from 'react-icons/hi';
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      });
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className='bg-[#23384A] overflow-hidden'>
      <div className='grid grid-cols-2    '>
        {/* ── LEFT — Contact & Legal ── */}
        <div
          ref={leftRef}
          className='w-full shrink-0 flex flex-col gap-7 px-10 md:px-14 lg:px-16 xl:px-24 py-14 md:py-16 xl:py-24 md:border-r border-limestone/10'
        >
          {/* Phone */}
          <div className='flex flex-col gap-[6px]'>
            <a
              href='#'
              className='text-limestone/55 text-[16px] uppercase underline underline-offset-4 decoration-limestone/20 hover:text-limestone hover:decoration-limestone/50 transition-colors duration-300 w-fit'
            >
              Schedule a call
            </a>{' '}
            <a
              href='tel:+918712425242'
              className='text-limestone font-light text-[34px] md:text-[43px] tracking-tight leading-none hover:text-limestone/80 transition-colors duration-300'
            >
              +91 87124 25242
            </a>
          </div>

          {/* Experience centre */}
          <div className='flex flex-col gap-[6px]'>
            <h4 className='text-limestone text-[28px] uppercase  mb-1'>
              Experience Centre
            </h4>
            <p className='text-limestone/90 text-[19px] font-light leading-[1.85]'>
              Monday to Saturday, 10:00 to 18:00
              <br />
              Medchal, Hyderabad
              <br />
              Online — 24 hours a day
            </p>
          </div>

          {/* Address */}
          <a
            href='https://maps.google.com/?q=Medchal,+Nehru+Outer+Ring+Road,+Hyderabad,+Telangana'
            target='_blank'
            rel='noopener noreferrer'
            className='text-limestone/90 text-[19px] font-light leading-[1.75] underline underline-offset-4 decoration-limestone/20 hover:text-limestone hover:decoration-limestone/45 transition-colors duration-300 w-fit'
          >
            Medchal, Nehru Outer Ring Road,
            <br />
            Hyderabad, Telangana 500 055
          </a>

          {/* Social icons */}
          <div className='flex items-center gap-2.5'>
            <a
              href='#'
              aria-label='Instagram'
              className='w-12 h-12  flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300'
            >
              <FaInstagram size={28} />
            </a>

            <a
              href='#'
              aria-label='Facebook'
              className='w-12 h-12  flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300'
            >
              <FaFacebookF size={28} />
            </a>

            <a
              href='#'
              aria-label='WhatsApp'
              className='w-12 h-12  flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300'
            >
              <FaWhatsapp size={28} />
            </a>

            <a
              href='#'
              aria-label='Location'
              className='w-12 h-12  flex items-center justify-center text-limestone/45 hover:border-brass/60 hover:text-brass transition-all duration-300'
            >
              <HiOutlineLocationMarker size={28} />
            </a>
          </div>

          {/* Email */}
          <a
            href='mailto:hello@amaya.veravita.com'
            className='text-limestone text-[17px] font-light underline underline-offset-4 decoration-limestone/20 hover:text-limestone hover:decoration-limestone/45 transition-colors duration-300 w-fit'
          >
            hello@amaya.veravita.com
          </a>

          <p className='text-limestone/40 text-[12px] font-light leading-[1.75] mt-auto'>
            Project developer: Vera Vita Developments Pvt. Ltd. RERA
            Registration No. to be confirmed. This is not a public offer.
            Visualisations and floor plans are indicative.
          </p>
        </div>
        {/* ── RIGHT — A Note from the Founders (md+ only) ── */}
        <div
          ref={rightRef}
          className='hidden md:flex flex-col flex-1 px-12 lg:px-16 xl:px-20 py-14 md:py-16 xl:py-24 gap-8'
        >
          {/* Label */}
          <div>
            <h4 className='text-limestone text-[28px] uppercase  mb-1'>
              A Note from
              the Founders
            </h4>
            <div className='h-px bg-limestone/15 w-16' />
          </div>

          {/* Body */}
          <div className='flex flex-col gap-5 -mt-6'>
            <p className='text-limestone/55 text-[13px] lg:text-[18px] font-light leading-[1.95]'>
              Thank you for taking the time to learn more about Amaya. We began
              this journey with a simple question: what should life feel like in
              the years when people finally have the time to live more fully?
              Not just safe. Not just comfortable. But independent, dignified,
              active, connected — and quietly joyful.
            </p>
            <p className='text-limestone/55 text-[13px] lg:text-[18px] font-light leading-[1.95]'>
              Amaya has been shaped through conversations with seniors,
              families, doctors, architects and care specialists. What we heard
              again and again was the desire for choice — the choice to live
              independently, to stay socially connected, to be supported without
              being managed, and to have a home that makes everyday life easier
              without making it feel smaller.
            </p>
            <p className='text-limestone/55 text-[13px] lg:text-[18px] font-light leading-[1.95]'>
              Every decision at Amaya reflects that belief. The openness of the
              site, the green edge of the reserve forest, the emphasis on
              healthcare, the senior-friendly homes, the club, the dining, the
              activities and the service ecosystem have all been planned around
              one idea: life after retirement should continue to feel rich,
              capable and self-directed.
            </p>
          </div>

          {/* Closing */}
          {/* <div className='mt-auto pt-4 border-t border-limestone/10'>
            <p className='text-limestone/40 text-[13px] lg:text-[14px] font-light leading-[1.85] italic'>
              We are building Amaya as a long-term commitment, and as a
              community we would be proud for our own families to call home. We
              look forward to welcoming you and continuing the conversation.
            </p>
          </div> */}
        </div>
      </div>

      {/* ── Bottom bar — full width ── */}
      <div className='border-t border-limestone/12 px-10 md:px-14 lg:px-16 xl:px-24 py-4 flex flex-col sm:flex-row items-center justify-between gap-2'>
        <div className='flex items-center gap-4 flex-wrap'>
          <a
            href='#'
            className='text-limestone/35 text-[11px] hover:text-limestone/60 transition-colors duration-200'
          >
            Privacy Policy
          </a>
          <span className='text-limestone/15 text-[11px]'>|</span>
          <a
            href='#'
            className='text-limestone/35 text-[11px] hover:text-limestone/60 transition-colors duration-200'
          >
            Terms &amp; Conditions
          </a>
        </div>
        <p className='text-limestone/30 text-[11px]'>
          Amaya &copy; 2026 — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
