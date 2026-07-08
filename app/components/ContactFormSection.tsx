'use client';

import { useState } from 'react';

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  'use no memo';
  return (
    <button
      type='button'
      onClick={onChange}
      className={`w-[18px] h-[18px] shrink-0 border flex items-center justify-center transition-colors duration-200 ${
        checked ? 'bg-brass border-brass' : 'border-stone bg-transparent'
      }`}
    >
      {checked && (
        <svg width='9' height='7' viewBox='0 0 10 8' fill='none'>
          <path
            d='M1 4L3.8 7L9 1'
            stroke='#FDFCFA'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  );
}

export default function ContactFormSection() {
  'use no memo';
  const [agreed, setAgreed] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <section
      className='relative bg-navy/65 overflow-hidden '
      style={{
        backgroundImage: 'url(/images/courtyard-pool-contact-update.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
       <div className='absolute inset-0 bg-gradient-to-b from-transparent  to-[#23384A] z-0 ' />
      {/* <div className='absolute inset-0 bg-linear-to-b from-[#22384A] via-[#22384A]/80 to-black/85 z-0 ' /> */}
      <div className='max-w-425 mx-auto flex flex-col md:flex-row'>
        {/* ── LEFT — heading + form ── */}
        <div className='relative z-10 flex-1 flex flex-col justify-between gap-14 px-5 sm:px-10 md:px-16 xl:px-20 py-16 md:py-20 xl:py-28 max-w-[1270px] mx-auto'>
          {/* Heading */}
          <div className='flex flex-col gap-5 '>
            {/* <p className='text-limestone/35 text-[14px] md:text[16px] uppercase tracking-[0.35em]'>
              Amaya — A Calm Residential Community
            </p> */}
            <h2
              className='text-limestone uppercase font-light leading-[1.05] tracking-[0.02em] text-[36px] md:text-[53px]'
              // style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            >
              Come and See<br/> It for Yourself
            </h2>
            <p className='text-limestone/55 text-[16px] md:text-[16px] font-light leading-[1.85] max-w-[560px]'>
              We would be happy to show you around the experience centre. Walk
              through the model residence, clubhouse vision, and community plan
              with our team.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className='flex flex-col gap-9 mt-9'
          >
            {/* Inputs row */}
            <div className='flex flex-col sm:flex-row gap-8 sm:gap-10'>
              {/* Name */}
              <div className='flex-1 flex flex-col gap-[10px] border-b border-white pb-3'>
                <input
                  type='text'
                  placeholder='NAME'
                  required
                  className='bg-transparent text-limestone text-[11px] md:text-[12px] font-light outline-none w-full '
                />
              </div>

              {/* Phone */}
              <div className='flex-1 flex flex-col gap-[10px] border-b border-white pb-3'>
                <div className='flex items-center gap-2.5'>
                  <input
                    type='tel'
                    placeholder='Number'
                    className='bg-transparent text-limestone text-[11px] md:text-[12px] font-light outline-none flex-1 min-w-0'
                  />
                </div>
              </div>
              {/* Email */}
              <div className='flex-1 flex flex-col gap-[10px] border-b border-white pb-3'>
                <input
                  type='email'
                  placeholder='E-MAIL'
                  className='bg-transparent text-limestone text-[11px] md:text-[12px] font-light outline-none w-full '
                />
              </div>
            </div>

            {/* Checkboxes + Send */}
            <div className='flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8'>
              <div className='flex flex-col gap-[14px] '>
                <div className='flex items-start gap-3'>
                  <Checkbox
                    checked={agreed}
                    onChange={() => setAgreed((v) => !v)}
                  />
                  <span className='text-limestone text-[11px] md:text-[11px] leading-[1.65]'>
                    Please review our{' '}
                    <u className='text-limestone/60 cursor-pointer'>
                      Privacy Policy
                    </u>
                    {' '}and{' '}
                    <u className='text-limestone/60 cursor-pointer'>
                      Personal Data Processing Terms
                    </u>{' '}
                    before submitting the form. By submitting this form, you
                    confirm that you have read these documents and consent to
                    the processing of your personal data in accordance with
                    them.
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <Checkbox
                    checked={newsletter}
                    onChange={() => setNewsletter((v) => !v)}
                  />
                  <span className='text-limestone text-[11px] md:text-[11px]'>
                    I would like to receive news, updates, and special offers
                  </span>
                </div>
              </div>

              <button
                type='submit'
                className='shrink-0 flex items-center justify-center gap-5 px-12 h-[54px] rounded-full bg-brass text-limestone uppercase text-[11px] tracking-[0.3em] hover:bg-[#F4F4F3] hover:text-brass active:bg-[#7d5c35] transition-colors duration-300 min-w-55'
              >
                Book a Visit
                <svg width='14' height='10' viewBox='0 0 14 10' fill='none'>
                  <path
                    d='M1 5H13M9 1L13 5L9 9'
                    stroke='currentColor'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
