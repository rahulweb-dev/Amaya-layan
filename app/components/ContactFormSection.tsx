'use client';

import { useState } from 'react';
import Image from 'next/image';

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-[18px] h-[18px] shrink-0 border flex items-center justify-center transition-colors duration-200 ${
        checked ? 'bg-[#d9a898] border-[#d9a898]' : 'border-white/25 bg-transparent'
      }`}
    >
      {checked && (
        <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.8 7L9 1" stroke="#021A13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function ContactFormSection() {
  const [agreed, setAgreed] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <section className="relative bg-[#061A10] overflow-hidden">
      <div className="max-w-425 mx-auto flex flex-col md:flex-row">

        {/* ── LEFT — heading + form ────────────────────────── */}
        <div className="relative z-10 flex-1 flex flex-col justify-between gap-14 px-5 sm:px-10 md:px-16 xl:px-20 py-16 md:py-20 xl:py-28">

          {/* Heading block */}
          <div className="flex flex-col gap-5">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.35em]">
              Layan Verde — A Magical Place For The Real You
            </p>

            <h2
              className="text-white font-light uppercase leading-[1.05] tracking-[0.02em]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            >
              Become Part of<br />the History
            </h2>

            <p className="text-white/45 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-[1.9] max-w-[460px]">
              Share your contact details, and our manager will reach<br className="hidden md:block" />
              out with full project details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-9">

            {/* Three input fields in a row */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10">

              {/* Name */}
              <div className="flex-1 flex flex-col gap-[10px] border-b border-white/15 pb-3">
                <label className="text-white/40 text-[9px] uppercase tracking-[0.32em]">Name *</label>
                <input
                  type="text"
                  required
                  className="bg-transparent text-white text-[13px] font-light outline-none w-full"
                />
              </div>

              {/* Phone with country flag */}
              <div className="flex-1 flex flex-col gap-[10px] border-b border-white/15 pb-3">
                {/* invisible label to align baseline with Name/Email */}
                <span className="text-[9px] invisible select-none">·</span>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 shrink-0 cursor-pointer">
                    <span className="text-[16px] leading-none">🇮🇳</span>
                    <span className="text-white/50 text-[13px] font-light">+91</span>
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="text-white/30">
                      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    className="bg-transparent text-white text-[13px] font-light outline-none flex-1 min-w-0"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex-1 flex flex-col gap-[10px] border-b border-white/15 pb-3">
                <label className="text-white/40 text-[9px] uppercase tracking-[0.32em]">E-Mail</label>
                <input
                  type="email"
                  className="bg-transparent text-white text-[13px] font-light outline-none w-full"
                />
              </div>
            </div>

            {/* Checkboxes + Send button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">

              {/* Checkboxes */}
              <div className="flex flex-col gap-[14px] max-w-[460px]">
                <label className="flex items-start gap-3 cursor-pointer" onClick={() => setAgreed(v => !v)}>
                  <Checkbox checked={agreed} onChange={() => setAgreed(v => !v)} />
                  <span className="text-white/38 text-[10.5px] leading-[1.65]">
                    Please review our{' '}
                    <u className="text-white/55 cursor-pointer">Privacy Policy</u>
                    {' '}and{' '}
                    <u className="text-white/55 cursor-pointer">Personal Data Processing Terms</u>
                    {' '}before submitting the form. By submitting this form, you confirm that you have read these documents and consent to the processing of your personal data in accordance with them.
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer" onClick={() => setNewsletter(v => !v)}>
                  <Checkbox checked={newsletter} onChange={() => setNewsletter(v => !v)} />
                  <span className="text-white/38 text-[10.5px]">
                    I would like to receive news, updates, and special offers
                  </span>
                </label>
              </div>

              {/* Send button */}
              <button
                type="submit"
                className="shrink-0 flex items-center justify-center gap-5 px-12 h-[54px] rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] tracking-[0.3em] hover:bg-[#c89585] active:bg-[#b8806f] transition-colors duration-300 min-w-[220px]"
              >
                Send
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* ── RIGHT — full-bleed image ─────────────────────── */}
        <div className="relative w-full md:w-[42%] min-h-[360px] md:min-h-0 shrink-0 overflow-hidden">
          <Image
            src="/i/homepage/piece-heaven-right.jpg"
            alt="Layan Verde lifestyle"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
          {/* Gradient fade into dark bg on the left edge */}
          <div className="absolute inset-y-0 left-0 w-28 md:w-36 bg-gradient-to-r from-[#061A10] to-transparent" />
        </div>
      </div>
    </section>
  );
}
