'use client';

import { useState } from 'react';
import { FadeIn, FadeInStagger, FadeInItem } from './AnimatedSection';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { CONSTANTS } from '@/lib/seo';
import { homeFaqs } from '@/lib/home-faqs';

// FAQ content lives in lib/home-faqs.ts (shared with the FAQPage JSON-LD).
const faqs = homeFaqs;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090B] relative overflow-hidden"
      aria-label={`Frequently Asked Questions about ${CONSTANTS.BRAND_NAME}`}
    >
      {/* Global square-grid background pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#39FF14]/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#008000]/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <FadeIn className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#39FF14]/40 px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-[#39FF14]/10">
          <Sparkles className="w-4 h-4 text-[#39FF14]" />
          <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
            Help Center
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tight leading-none">
          FREQUENTLY ASKED <span className="text-[#39FF14]">QUESTIONS</span>
        </h2>
        <p className="text-[#94A3B8] font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about{' '}
          <strong className="text-[#F8FAFC] font-bold">{CONSTANTS.BRAND_NAME}</strong>{' '}
          — IPTV Subscriptions, the instant email setup process, free trial, and the full channel lineup.
        </p>
      </FadeIn>

      <FadeInStagger className="space-y-4 relative z-10">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <FadeInItem key={i}>
              <div
                className={`relative rounded-2xl transition-all duration-300 overflow-hidden border-2 ${
                  isOpen
                    ? 'bg-[#18181B] border-[#39FF14] shadow-2xl shadow-[#39FF14]/10'
                    : 'bg-[#18181B] border-[#27272A] hover:border-[#39FF14]/60 shadow-lg'
                }`}
              >
                {/* Accent Left Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                    isOpen ? 'bg-[#39FF14]' : 'bg-[#27272A]'
                  }`}
                />

                {/* Heading wraps the toggle button (a heading inside a button is
                    not exposed as a heading to assistive technology). */}
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 transition-all duration-300 rounded-2xl cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="flex items-center gap-4 pr-2">
                      <span
                        aria-hidden="true"
                        className={`p-2.5 rounded-xl shrink-0 transition-colors duration-300 ${
                          isOpen
                            ? 'bg-[#39FF14] text-[#09090B]'
                            : 'bg-[#27272A] text-[#94A3B8]'
                        }`}
                      >
                        <HelpCircle className="w-5 h-5" />
                      </span>

                      <span
                        className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                          isOpen ? 'text-[#39FF14]' : 'text-[#F8FAFC]'
                        }`}
                      >
                        {faq.q}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`p-2 rounded-full shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#39FF14] text-[#09090B] rotate-180'
                          : 'bg-[#27272A] text-[#94A3B8]'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>
                </h3>

                {/* Answer Area (hidden from assistive tech while collapsed) */}
                <div
                  id={`faq-answer-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-6'
                      : 'grid-rows-[0fr] opacity-0 pb-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#94A3B8] font-medium leading-relaxed pl-16 sm:pl-20 pr-6 sm:pr-8 text-sm sm:text-base border-t border-[#27272A] pt-4 mt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInItem>
          );
        })}
      </FadeInStagger>
    </section>
  );
}