'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import PricingSection from '../components/PricingSection';
import ShareButtons from '../components/ShareButtons';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';
import { CONSTANTS } from '@/lib/seo';
import { pricingFaqs } from '@/lib/page-faqs';
import {
  ShieldCheck,
  Zap,
  ChevronDown,
  CreditCard,
  Award,
  Globe,
  Server,
  Trophy,
  Tv,
  Film,
  MonitorPlay,
  Wifi,
  Calendar,
  Lock,
  ThumbsUp,
  Headphones,
  Sparkles,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// FAQ Item — Accordion
// ---------------------------------------------------------------------------
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  // Accessible accordion: the heading contains the toggle button, and the
  // answer sits outside the button (previously the whole card, answer included,
  // was one button, so the answer became part of the button's name and the
  // heading was lost). Padding is split so the card looks exactly as before.
  return (
    <div
      className={`w-full text-left bg-[#18181B] border-2 ${
        isOpen ? 'border-[#39FF14]' : 'border-[#27272A]'
      } rounded-2xl hover:border-[#39FF14]/60 shadow-lg transition-all duration-300 group`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          className={`w-full text-left px-6 pt-6 ${isOpen ? 'pb-4' : 'pb-6'} flex justify-between items-center gap-4 transition-all duration-300 cursor-pointer rounded-2xl`}
        >
          <span
            className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
              isOpen ? 'text-[#39FF14]' : 'text-[#F8FAFC] group-hover:text-[#39FF14]'
            } flex items-center gap-3`}
          >
            <span
              className={`${
                isOpen ? 'text-[#39FF14]' : 'text-[#94A3B8]'
              } font-black text-2xl`}
            >
              Q.
            </span>
            {question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
              isOpen
                ? 'rotate-180 text-[#39FF14]'
                : 'text-[#94A3B8] group-hover:text-[#39FF14]'
            }`}
          />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        aria-hidden={!isOpen}
        className={`overflow-hidden transition-all duration-300 px-6 ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[#94A3B8] font-medium leading-relaxed pl-10 md:pl-12 border-l-4 border-[#39FF14] ml-2 py-2">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PRICING PAGE
// ---------------------------------------------------------------------------
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col">

      {/* ==========================================================
          HERO SECTION — Fully Centered
      ========================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/bg-2.webp"
            alt=""
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-[#09090B]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/0" />
        </div>

        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/10 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          <FadeInStagger className="flex flex-col items-center justify-center text-center">
            <FadeInItem>
              <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
                <Sparkles className="w-4 h-4 text-[#39FF14]" />
                <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
                  Best Value IPTV Subscription Plans 2026
                </span>
              </div>
            </FadeInItem>

            <FadeInItem>
              <h1 className="text-5xl md:text-7xl font-black text-[#F8FAFC] tracking-tighter uppercase mb-6 leading-none text-center">
                IPTV SUBSCRIPTION PLANS & <br />
                <span className="text-[#39FF14]">BEST PRICING</span>
              </h1>
            </FadeInItem>

            <FadeInItem>
              <p className="text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed px-2 text-center mb-6">
                Stream 55,000+ live channels and 150,000+ movies and TV shows in 4K on any device. Try it free first, get instant activation, and pay with zero hassle.
              </p>
            </FadeInItem>

            <FadeInItem>
              <div className="flex flex-wrap justify-center gap-6 text-[#94A3B8] text-xs md:text-sm font-black uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#39FF14]" /> Instant Activation
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#39FF14]" /> Guided Setup
                </span>
                <span className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-[#39FF14]" /> Free Trial First
                </span>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ==========================================================
          MAIN PRICING CARDS
      ========================================================== */}
      <div className="w-full relative z-20 bg-[#09090B] py-12" id="pricing-section">
        <PricingSection />
      </div>

      {/* ==========================================================
          FEATURES GRID — DARK
      ========================================================== */}
      <section className="py-24 bg-[#09090B] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter leading-none">
              Everything Included In <span className="text-[#39FF14]">Every Plan</span>
            </h2>
            <p className="text-[#94A3B8] text-lg font-bold max-w-2xl mx-auto mt-4">
              Every IPTV Subscription comes with these premium features as standard.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Tv,
                title: '55,000+ Live Channels',
                desc: `Sports, news, entertainment, and premium broadcasters from over 50 countries on this IPTV Provider.`,
              },
              {
                icon: Film,
                title: '150,000+ Movies & TV Shows',
                desc: `The latest movies, complete series, and documentaries updated daily on the on-demand library.`,
              },
              {
                icon: MonitorPlay,
                title: '4K & 60FPS Quality',
                desc: `Crystal clear streaming on compatible channels and devices without buffering.`,
              },
              {
                icon: Wifi,
                title: 'Anti Freeze Technology',
                desc: 'Buffer free viewing thanks to advanced stream optimization and dedicated load balancers.',
              },
              {
                icon: Calendar,
                title: 'Full EPG TV Guide',
                desc: '7 day interactive program guide covering all live channels and on-demand titles.',
              },
              {
                icon: Trophy,
                title: 'PPV Events Included',
                desc: 'All major UFC, boxing, NFL, NBA, and Main Event Pay Per View matches at no extra cost.',
              },
              {
                icon: Globe,
                title: 'Global Server Coverage',
                desc: 'Dedicated edge servers across multiple continents for minimal latency on live sports broadcasts.',
              },
              {
                icon: Server,
                title: '99.9% Server Uptime',
                desc: 'Enterprise infrastructure with redundant backup servers for guaranteed streaming stability.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <FadeInItem
                  key={idx}
                  className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 hover:border-[#39FF14] shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4 group-hover:bg-[#39FF14]/25 transition-colors">
                    <Icon className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="font-black text-[#F8FAFC] uppercase tracking-wide text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* ==========================================================
          COMPARISON TABLE — DARK
      ========================================================== */}
      <section className="py-24 bg-[#09090B] border-y border-[#27272A] w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter">
              Compare <span className="text-[#39FF14]">IPTV Subscription Plans</span>
            </h2>
            <p className="text-[#94A3B8] text-base font-bold uppercase tracking-widest mt-2">
              Find the perfect IPTV Provider plan for your streaming needs
            </p>
          </FadeIn>

          <div className="overflow-x-auto bg-[#18181B] border border-[#27272A] rounded-3xl p-4 md:p-6 shadow-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#27272A]">
                  <th className="text-left p-4 text-[#F8FAFC] font-black uppercase tracking-wider text-base md:text-lg">
                    Specification
                  </th>
                  <th className="text-center p-4 text-[#39FF14] font-black uppercase tracking-wider text-base md:text-lg">
                    3 Months
                  </th>
                  <th className="text-center p-4 text-[#39FF14] font-black uppercase tracking-wider text-base md:text-lg bg-[#09090B] rounded-t-xl">
                    12 Months (VIP)
                  </th>
                  <th className="text-center p-4 text-[#39FF14] font-black uppercase tracking-wider text-base md:text-lg">
                    6 Months
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {[
                  { feature: 'Live Channels', basic: '55,000+', pro: '55,000+ VIP', premium: '55,000+' },
                  { feature: 'Movies & TV Shows', basic: '150,000+', pro: '150,000+ (Daily Updates)', premium: '150,000+' },
                  { feature: '4K & 60FPS Streaming', basic: 'Yes', pro: 'Yes (Ultra Bitrate)', premium: 'Yes' },
                  { feature: 'Live Sport & PPV', basic: 'Included', pro: 'All PPV + VIP Feeds', premium: 'Included' },
                  { feature: 'EPG & Catch Up', basic: 'Standard EPG', pro: '7 Day Catch Up + EPG', premium: 'Full EPG' },
                  { feature: 'Anti Freeze Technology', basic: 'Standard', pro: 'VIP Priority Routing', premium: 'Advanced' },
                  { feature: 'VPN Compatible', basic: 'Yes (Not Required)', pro: '100% Compatible', premium: 'Yes' },
                  { feature: 'Number of Screens', basic: '1 or 2 Screens', pro: '1, 2, or 3 Screens', premium: '1 or 2 Screens' },
                  { feature: 'Customer Support', basic: '24/7 Support', pro: '24/7 VIP Priority', premium: 'Priority Support' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#27272A]/30 transition-colors">
                    <td className="p-4 text-[#F8FAFC] font-black uppercase text-sm">{row.feature}</td>
                    <td className="p-4 text-center text-[#94A3B8] font-bold text-sm">{row.basic}</td>
                    <td className="p-4 text-center text-[#39FF14] font-black text-sm bg-[#09090B]/50">{row.pro}</td>
                    <td className="p-4 text-center text-[#94A3B8] font-bold text-sm">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================================
          TRUST BADGES — DARK
      ========================================================== */}
      <section className="py-24 bg-[#09090B] w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter">
              Why Choose <span className="text-[#39FF14]">{CONSTANTS.BRAND_NAME}</span>
            </h2>
            <p className="text-[#94A3B8] text-lg font-bold max-w-2xl mx-auto mt-4">
              Trusted by over 50,000 happy viewers worldwide for premium 4K IPTV streaming.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                Secure Payments
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Encrypted transactions via Credit Card, PayPal, and Crypto with 256 bit SSL protection.
              </p>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                Instant Activation
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Get your IPTV Subscription credentials instantly and start streaming within minutes.
              </p>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                Free Trial First
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Test IPTV services on your own device and internet before you pay a cent.
              </p>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <Headphones className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                24/7 Global Support
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Real people on hand around the clock to help with setup, streaming, or anything else you need.
              </p>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ==========================================================
          FREE TRIAL BANNER — DARK
      ========================================================== */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#09090B] w-full">
        <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8 md:p-10 text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-[#39FF14] px-4 py-2 rounded-full mb-4 shadow-md border border-[#39FF14]/30">
            <Award className="w-4 h-4 text-[#09090B]" />
            <span className="text-[#09090B] font-black text-xs uppercase tracking-widest">
              Try Before You Pay
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
            Free Trial First
          </h3>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-sm md:text-base font-bold leading-relaxed">
            Request a free trial and we will set you up so you can test the 4K picture, check the sports lineup, and make sure everything runs smooth on your device and internet connection. Upgrade to a paid IPTV Subscription only when you are happy.
          </p>
        </div>
      </section>

      {/* ==========================================================
          FAQ — DARK
      ========================================================== */}
      <section className="w-full bg-[#09090B] py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tighter">
              Frequently Asked <span className="text-[#39FF14]">Questions</span>
            </h2>
            <p className="text-[#94A3B8] font-bold text-lg">
              Everything you need to know about our IPTV Subscription plans, pricing, and setup.
            </p>
          </FadeIn>

          <FadeInStagger className="space-y-4 relative z-10">
            {pricingFaqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ==========================================================
          SHARE BUTTONS
      ========================================================== */}
      <div className="w-full flex justify-center items-center py-12 bg-[#09090B]">
        <ShareButtons />
      </div>

      {/* ==========================================================
          BOTTOM CTA — DARK
      ========================================================== */}
      <section className="py-20 bg-[#09090B] border-t border-[#27272A] w-full relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39FF14]/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#39FF14]/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tight">
              Ready To Start Streaming?
            </h2>
            <p className="text-[#94A3B8] font-bold text-lg mb-8 max-w-2xl mx-auto">
              Join over 50,000 happy viewers worldwide. Pick your plan, get instant activation, and test everything on a free trial first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
              <Link
                href="#pricing-section"
                className="w-full sm:w-auto text-center whitespace-nowrap px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,215,0,0.3)] border-2 border-[#09090B]/30 hover:bg-[#E6C200] cursor-pointer"
              >
                Choose Your Plan
              </Link>
              <Link
                href="/setup"
                className="w-full sm:w-auto text-center whitespace-nowrap px-8 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 border-2 border-[#27272A] hover:border-[#39FF14] cursor-pointer"
              >
                Setup Guide
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-[#94A3B8] text-xs font-black uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#39FF14]" /> Instant Activation
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#39FF14]" /> Secure Checkout
              </span>
              <span className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-[#39FF14]" /> Card, PayPal &amp; Crypto
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}