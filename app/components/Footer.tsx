// Server Component: the footer has no interactivity (hover effects are CSS),
// so it renders on the server. This keeps lib/channels-data.ts (used here only
// for category slugs/names) out of the client JavaScript bundle.
import Link from "next/link";
import { useId } from "react";
import { CONSTANTS } from "@/lib/seo";
import { channelsData } from "@/lib/channels-data";
import { Facebook, Instagram, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { href: CONSTANTS.SOCIALS.twitter, label: "Twitter", Icon: Twitter },
  { href: CONSTANTS.SOCIALS.instagram, label: "Instagram", Icon: Instagram },
  { href: CONSTANTS.SOCIALS.facebook, label: "Facebook", Icon: Facebook },
].filter((s) => s.href);

// ---------------------------------------------------------------------------
// Lightweight Circular Flags (US, CA, UK, AU)
// Each flag generates a unique clipPath id per instance via useId() to avoid
// duplicate-id hydration crashes when the footer is rendered more than once.
// ---------------------------------------------------------------------------
const FlagUS = () => {
  const id = useId();
  return (
    <svg className="w-5 h-5 rounded-full shadow-md shrink-0 border border-white/20" viewBox="0 0 32 32">
      <clipPath id={id}><circle cx="16" cy="16" r="16" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <path fill="#FFF" d="M0 0h32v32H0z" />
        {[0, 4.57, 9.14, 13.71, 18.29, 22.86, 27.43].map((y, i) => (
          <path key={i} fill="#B22234" d={`M0 ${y}h32v2.29H0z`} />
        ))}
        <path fill="#3C3B6E" d="M0 0h13.7v14.86H0z" />
      </g>
    </svg>
  );
};

const FlagCA = () => {
  const id = useId();
  return (
    <svg className="w-5 h-5 rounded-full shadow-md shrink-0 border border-white/20" viewBox="0 0 32 32">
      <clipPath id={id}><circle cx="16" cy="16" r="16" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <path fill="#FFF" d="M0 0h32v32H0z" />
        <path fill="#D80621" d="M0 0h8v32H0zM24 0h8v32h-8z" />
        <path fill="#D80621" d="M16 7l1.2 2.4 2.6-.6-.9 2.5 2.3 1.3-2.1 1.5.8 2.5-2.5-.7L16 18l-1.4-2.1-2.5.7.8-2.5-2.1-1.5 2.3-1.3-.9-2.5 2.6.6L16 7z" />
      </g>
    </svg>
  );
};

const FlagUK = () => {
  const id = useId();
  return (
    <svg className="w-5 h-5 rounded-full shadow-md shrink-0 border border-white/20" viewBox="0 0 32 32">
      <clipPath id={id}><circle cx="16" cy="16" r="16" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <path fill="#012169" d="M0 0h32v32H0z" />
        <path stroke="#FFF" strokeWidth="6" d="M0 0l32 32M32 0L0 32" />
        <path stroke="#C8102E" strokeWidth="3" d="M0 0l32 32M32 0L0 32" />
        <path stroke="#FFF" strokeWidth="10" d="M16 0v32M0 16h32" />
        <path stroke="#C8102E" strokeWidth="6" d="M16 0v32M0 16h32" />
      </g>
    </svg>
  );
};

const FlagAU = () => {
  const id = useId();
  return (
    <svg className="w-5 h-5 rounded-full shadow-md shrink-0 border border-white/20" viewBox="0 0 32 32">
      <clipPath id={id}><circle cx="16" cy="16" r="16" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <path fill="#000080" d="M0 0h32v32H0z" />
        <path stroke="#FFF" strokeWidth="2.5" d="M0 0l16 16M16 0L0 16" />
        <path stroke="#CC0000" strokeWidth="1.2" d="M0 0l16 16M16 0L0 16" />
        <path stroke="#FFF" strokeWidth="4" d="M8 0v16M0 8h16" />
        <path stroke="#CC0000" strokeWidth="2" d="M8 0v16M0 8h16" />
        <polygon fill="#FFF" points="8,13 6.5,11.5 8.5,11.5 7,10 9,10.5 8.5,8.5 10,10 10.5,8 11,10 12.5,8.5 12,10.5 14,10 12.5,11.5 14.5,11.5 13,13 13.5,15 12,13.5 11,15.5 10.5,13.5 9,15 9.5,13" transform="scale(0.5) translate(4,10)" />
        <circle cx="24" cy="7" r="1.2" fill="#FFF" />
        <circle cx="26" cy="13" r="1.2" fill="#FFF" />
        <circle cx="22" cy="19" r="1.2" fill="#FFF" />
        <circle cx="26" cy="23" r="1.2" fill="#FFF" />
        <circle cx="20" cy="25" r="1" fill="#FFF" />
      </g>
    </svg>
  );
};

const flags = [
  { name: 'United States', code: 'US', component: FlagUS },
  { name: 'Canada', code: 'CA', component: FlagCA },
  { name: 'United Kingdom', code: 'UK', component: FlagUK },
  { name: 'Australia', code: 'AU', component: FlagAU },
];

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Pricing & Plans', href: '/pricing' },
  { name: 'Setup Guide', href: '/setup' },
  { name: 'Reviews & Feedback', href: '/reviews' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog & Guide', href: '/blog' },
  { name: 'Support', href: '/support' },
  { name: 'Reseller Program', href: '/reseller' },
];

const legalLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Refund & Guarantee Policy', href: '/refund-policy' },
  { name: 'DMCA Policy', href: '/dmca' },
];

export default function Footer() {
  // Rendered on the server; static pages revalidate every 24h (root layout).
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 border-t-4 border-[#39FF14] overflow-hidden">

      {/* 1. Global square-grid background pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* 2. 50% Transparent dark background ON TOP of the pattern */}
      <div className="absolute inset-0 bg-[#09090B]/80 z-0 pointer-events-none" />

      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/60 to-transparent z-10" />

      {/* Main Footer Body */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-12 text-[#F8FAFC]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="flex items-center gap-3 mb-5 group inline-flex cursor-pointer"
                aria-label={`${CONSTANTS.FOCUS_KEYWORD} - Home`}
              >
                <div className="w-auto h-12 flex items-center group-hover:scale-105 transition-transform duration-200">
                  <img
                    src="/img/zyminex-logo.png"
                    alt={`${CONSTANTS.FOCUS_KEYWORD} Logo`}
                    width={180}
                    height={48}
                    className="object-contain h-full w-auto"
                    loading="lazy"
                  />
                </div>
              </Link>

              <p className="text-sm md:text-base font-bold text-[#94A3B8] max-w-sm leading-relaxed mb-5">
                Stream 55,000+ live channels and 150,000+ movies &amp; shows in 4K Ultra HD with{" "}
                <strong className="text-[#39FF14]">{CONSTANTS.FOCUS_KEYWORD}</strong>.
                Premium {CONSTANTS.SECONDARY_FOCUS_KEYWORD} plans, instant setup, and 24/7 support — all with no contract.
              </p>

              {/* Coverage Focus Badge */}
              <div className="inline-flex items-center flex-wrap gap-2 sm:gap-3 py-1.5 px-3 mb-6 rounded-full bg-[#18181B] border border-[#27272A] backdrop-blur-md w-fit shadow-sm">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#94A3B8] shrink-0">
                  Serving:
                </span>
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
                  {flags.map((flag) => {
                    const FlagComp = flag.component;
                    return (
                      <div
                        key={flag.code}
                        className="flex items-center gap-1 group cursor-default"
                        title={flag.name}
                      >
                        <FlagComp />
                        <span className="text-[10px] font-black uppercase text-[#F8FAFC] group-hover:text-[#39FF14] transition-colors">
                          {flag.code}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Icons: rendered only for profiles the owner has set in
                CONSTANTS.SOCIALS (empty = not yet confirmed, so no fake links). */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${CONSTANTS.FOCUS_KEYWORD} on ${label}`}
                    className="group w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center hover:bg-[#39FF14] hover:border-[#39FF14] transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-[#94A3B8] group-hover:text-[#09090B] transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[#F8FAFC] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#39FF14] pb-1 inline-block">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#39FF14] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Channel Packages */}
          <div className="lg:col-span-3">
            <h3 className="text-[#F8FAFC] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#39FF14] pb-1 inline-block">
              Channel Packages
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {channelsData.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/channels/${category.slug}`}
                    className="text-[#94A3B8] hover:text-[#39FF14] transition-colors block cursor-pointer"
                  >
                    {category.name.replace(/\s*\([^)]*\)/g, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[#F8FAFC] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#39FF14] pb-1 inline-block">
              Legal
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#39FF14] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* BOTTOM FOOTER BAR                                                   */}
      {/* ------------------------------------------------------------------- */}
      {/* Extra bottom space (mobile) / right space (md+) keeps the payment icons
          clear of the fixed WhatsApp button, which otherwise covered them. */}
      <div className="relative bg-[#121215] border-t border-[#27272A] pt-6 pb-28 md:pb-6 px-6 lg:px-12 shadow-lg z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:pr-20">
          {/* Copyright text */}
          <p className="text-base md:text-sm font-extrabold text-[#F8FAFC] tracking-wide text-center md:text-left">
            © {year}{" "}
            <span className="text-[#39FF14]">{CONSTANTS.FOCUS_KEYWORD}</span>. All rights reserved.
          </p>

          {/* Payment cards */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {CONSTANTS.PAYMENT_METHODS.map((item) => (
              <div
                key={item.name}
                className="relative h-10 w-16 shrink-0 rounded-lg border border-[#27272A] bg-[#18181B] p-1 shadow-sm hover:scale-105 hover:border-[#39FF14] transition-all duration-200"
                title={item.name}
              >
              <img
                src={item.icon}
                alt={item.name}
                className="object-contain p-1 filter drop-shadow-sm opacity-95"
                loading="lazy"
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}